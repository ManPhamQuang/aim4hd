import {
    Avatar,
    Button,
    CardHeader,
    Checkbox,
    Chip,
    CircularProgress,
    Container,
    FormControlLabel,
    FormHelperText,
    Grid,
    makeStyles,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import validator from "../utils/postValidator";
import axios from "axios";
import AuthContext from "../utils/authContext";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
import { useRouter } from "next/router";
import SendIcon from "@material-ui/icons/Send";
import DoneIcon from "@material-ui/icons/Done";
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            marginBottom: theme.spacing(1.5),
        },
    },
    container: {
        padding: theme.spacing(5),
    },
    wrapper: {
        position: "relative",
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
    button: {
        width: "100%",
    },
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
    },
    aiming: {
        minWidth: "80px",
    },
    cardHeader: {
        // height: "50px",
        padding: "0px",
    },
    usersList: {},
    course: {},
}));

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
const ITEM_HEIGHT = 52;
export default function PostingPage() {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const router = useRouter();
    // if (!auth.authData && typeof window !== "undefined") router.push("/");
    // if (auth.user && typeof window !== "undefined") router.push("/");
    const [input, setInput] = useState({
        title: "",
        content: "",
        aiming: "",
        course: "",
        // isOpen: true,
        maximumMember: 4,
        requiredSkills: [],
        approvedMembers: [],
    });
    const [courses, setCourses] = useState([]);
    const [skills, setSkills] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [postData, setPostData] = useState({});
    const isEdit = router.query.postId ? true : false;
    const [errorMsg, setErrorMsg] = useState({
        title: "",
        content: "",
        aiming: "",
    });

    const fetchPostData = async (id) => {
        const response = await axios.get(
            `https://aim4hd.herokuapp.com/api/v1/posts/${id}`
        );
        const data = await response.data.data.post;
        return data;
    };

    const fetchCourses = async () => {
        const response = await axios.get(
            "https://aim4hd.herokuapp.com/api/v1/courses?limit=1000"
        );
        const data = await response.data.data.courses;
        return data;
    };

    const fetchSkills = async () => {
        const skillsResponse = axios.get(
            "https://aim4hd.herokuapp.com/api/v1/skills"
        );
        const data = await (await skillsResponse).data.skills;
        return data;
    };

    const fetchUsers = async () => {
        const usersResponse = axios.get(
            "https://aim4hd.herokuapp.com/api/v1/users?limit=10000"
        );
        const data = await (await usersResponse).data.data.user;
        return data;
    };

    useEffect(() => {
        const getCoursesData = async () => {
            let courses = await fetchCourses();
            setCourses(courses);
        };
        const getSkillsData = async () => {
            let skills = await fetchSkills();
            setSkills(skills);
        };
        const getUsersData = async () => {
            let users = await fetchUsers();
            setUsers(users);
        };
        const getPostData = async (id) => {
            let post = await fetchPostData(id);
            setPostData(post);
        };
        if (router.query.postId) {
            getPostData(router.query.postId);
        }
        getSkillsData();
        getCoursesData();
        getUsersData();
    }, []);

    useEffect(() => {
        // for editting
        if (!isEmpty(postData)) {
            setErrorMsg({});
            setInput({
                title: postData.title,
                content: postData.content,
                aiming: postData.aiming,
                course: postData.course ? postData.course._id : "",
                maximumMember: postData.maximumMember,
                currentMember: postData.approvedMembers.length,
                requiredSkills: postData.requiredSkills
                    ? postData.requiredSkills.map((skill) => skill._id)
                    : [],
                approvedMembers: postData.approvedMembers
                    ? postData.approvedMembers.map((member) => member._id)
                    : [],
            });
        }
    }, [postData]);

    const handleInputChange = (event) => {
        if (event.target.name == "isOpen") {
            setInput((input) => ({
                ...input,
                isOpen: event.target.checked,
            }));
        } else {
            setInput((input) => ({
                ...input,
                [event.target.name]: event.target.value,
            }));
        }
        let newErrorMsg = { ...errorMsg };
        // console.log(newErrorMsg);
        const message = validator(event.target.name, event.target.value);
        if (message) setErrorMsg({ ...errorMsg, [event.target.name]: message });
        else {
            delete newErrorMsg[event.target.name];
            setErrorMsg(newErrorMsg);
        }
    };

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.button]: true,
    });

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = {
            // ...input,
            author: auth.user._id,
            currentMember: input.approvedMembers.length,
        };
        for (const key in input) {
            if (input[key] !== null && input[key] !== [] && input[key] !== "") {
                Object.assign(formData, { [key]: input[key] });
            }
        }
        console.log(formData);
        if (isEdit) {
            delete formData.approvedMembers;
            axios
                .patch(
                    `https://aim4hd.herokuapp.com/api/v1/posts/${postData._id}`,
                    formData
                )
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    setSuccess(true);
                })
                .catch((err) => console.log(err));
        } else {
            formData.approvedMembers.push(auth.user._id);
            formData.currentMember += 1;
            axios
                .post("https://aim4hd.herokuapp.com/api/v1/posts", formData)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    setSuccess(true);
                })
                .catch((err) => console.log(err));
        }

        // axios({
        //     method: 'post',
        //     url: "https://aim4hd.herokuapp.com/api/v1/posts",
        //     data: formData
        // })
    };
    return (
        <Container>
            <Paper className={classes.container}>
                <Typography>Posting new post</Typography>
                <form className={classes.root} onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="title"
                        label="Title"
                        fullWidth
                        name="title"
                        value={input.title}
                        onChange={handleInputChange}
                    />
                    {errorMsg.title && (
                        <FormHelperText error={true}>
                            {errorMsg.title}
                        </FormHelperText>
                    )}
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                name="isOpen"
                                id="isOpen"
                                checked={input.isOpen}
                                onChange={handleInputChange}
                            />
                        }
                        label="Opened"
                    /> */}

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={2}>
                            <TextField
                                required
                                id="aiming"
                                label="Aiming"
                                name="aiming"
                                className={classes.aiming}
                                value={input.aiming}
                                fullWidth
                                onChange={handleInputChange}
                                select
                            >
                                <MenuItem value="HD">HD</MenuItem>
                                <MenuItem value="DI">DI</MenuItem>
                                <MenuItem value="CR">CR</MenuItem>
                                <MenuItem value="PA">PA</MenuItem>
                                <MenuItem value="NN">NN</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <TextField
                                color="secondary"
                                select
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Current courses"
                                className={classes.course}
                                name="course"
                                SelectProps={{
                                    multiple: false,
                                    value: input.course,
                                    onChange: handleInputChange,
                                    MenuProps: {
                                        PaperProps: {
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                            },
                                        },
                                    },
                                }}
                            >
                                {courses.map((course) => (
                                    <MenuItem key={course.id} value={course.id}>
                                        {course.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    {/* <TextField
                            id="course"
                            label="Course"
                            name="course"
                            className={classes.course}
                            value={input.course}
                            onChange={handleInputChange}
                        /> */}

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={2}>
                            <TextField
                                id="maximumMember"
                                label="Members"
                                name="maximumMember"
                                type="number"
                                className={classes.aiming}
                                fullWidth
                                value={input.maximumMember}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={10}>
                            <TextField
                                color="secondary"
                                select
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Skills"
                                className={classes.course}
                                name="requiredSkills"
                                SelectProps={{
                                    multiple: true,
                                    value: input.requiredSkills,
                                    onChange: handleInputChange,
                                    MenuProps: {
                                        PaperProps: {
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                            },
                                        },
                                    },
                                }}
                            >
                                {skills.map((skill) => (
                                    <MenuItem key={skill.id} value={skill.id}>
                                        {skill.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <TextField
                        color="secondary"
                        select
                        variant="outlined"
                        margin="normal"
                        disabled={isEdit}
                        fullWidth
                        label="Approved Members"
                        name="approvedMembers"
                        SelectProps={{
                            multiple: true,
                            value: input.approvedMembers,
                            onChange: handleInputChange,
                            renderValue: (selected) => {
                                const result = users.filter((user) =>
                                    selected.includes(user._id)
                                );
                                return (
                                    <div>
                                        {result.map((user) => {
                                            if (user._id !== auth.user._id) {
                                                return (
                                                    <Chip
                                                        style={{
                                                            marginRight: "5px",
                                                        }}
                                                        label={user.name}
                                                        avatar={
                                                            <Avatar
                                                                alt={user.name}
                                                                src={
                                                                    user.avatar
                                                                }
                                                            />
                                                        }
                                                    />
                                                );
                                            }
                                        })}
                                    </div>
                                );
                            },
                            MenuProps: {
                                PaperProps: {
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                    },
                                },
                            },
                        }}
                    >
                        {users.map((user) => {
                            if (user._id !== auth.user._id) {
                                return (
                                    <MenuItem key={user.id} value={user.id}>
                                        <CardHeader
                                            className={classes.cardHeader}
                                            avatar={
                                                <Avatar src={user.avatar} />
                                            }
                                            title={`${user.name} - ${user.school}`}
                                        />
                                    </MenuItem>
                                );
                            }
                        })}
                    </TextField>
                    <TextField
                        required
                        id="content"
                        label="Content"
                        name="content"
                        fullWidth
                        rows={7}
                        multiline
                        value={input.content}
                        onChange={handleInputChange}
                    />
                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={
                                Object.keys(errorMsg).length > 0 ||
                                loading ||
                                success
                            }
                            className={buttonClassname}
                            endIcon={success ? <DoneIcon /> : <SendIcon />}
                        >
                            {success ? "POSTED" : "Post"}
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                        )}
                    </div>
                    {console.log(Object.keys(errorMsg))}
                </form>
            </Paper>
        </Container>
    );
}
