import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormHelperText,
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
import { useRouter } from "next/router";
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            marginBottom: theme.spacing(1.5),
        },
    },
    container: {
        padding: theme.spacing(5),
    },
    aiming: {
        width: "80px",
    },
    course: {
        width: "85%",
    },
}));
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
        course: null,
        isOpen: true,
        maximumMember: 4,
        requiredSkills: [],
        approvedMembers: [],
    });
    const [courses, setCourses] = useState([]);
    const [skills, setSkills] = useState([]);
    const [errorMsg, setErrorMsg] = useState({
        title: "",
        content: "",
        aiming: "",
    });

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

    useEffect(() => {
        const getCoursesData = async () => {
            let courses = await fetchCourses();
            setCourses(courses);
        };
        const getSkillsData = async () => {
            let skills = await fetchSkills();
            setSkills(skills);
        };
        getSkillsData();
        getCoursesData();
    }, []);

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
        // if(e.target.name == "aiming"){
        //     setInput((input) => ({
        //         ...input,
        //         [e.target.name]: e.target.value,
        //     }));
        // }else{
        //     setInput((input) => ({
        //         ...input,
        //         [e.target.name]: e.target.value,
        //     }));
        // }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            // ...input,
            author: auth.user._id,
        };
        for (const key in input) {
            if (input[key] !== null && input[key] !== [] && input[key] !== "") {
                Object.assign(formData, { [key]: input[key] });
            }
        }
        console.log(formData);
        axios
            .post("https://aim4hd.herokuapp.com/api/v1/posts", formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

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
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isOpen"
                                id="isOpen"
                                checked={input.isOpen}
                                onChange={handleInputChange}
                            />
                        }
                        label="Opened"
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField
                            required
                            id="aiming"
                            label="Aiming"
                            name="aiming"
                            className={classes.aiming}
                            value={input.aiming}
                            onChange={handleInputChange}
                            select
                        >
                            <MenuItem value="HD">HD</MenuItem>
                            <MenuItem value="DI">DI</MenuItem>
                            <MenuItem value="CR">CR</MenuItem>
                            <MenuItem value="PA">PA</MenuItem>
                            <MenuItem value="NN">NN</MenuItem>
                        </TextField>
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
                            }}
                        >
                            {courses.map((course) => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* <TextField
                            id="course"
                            label="Course"
                            name="course"
                            className={classes.course}
                            value={input.course}
                            onChange={handleInputChange}
                        /> */}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField
                            id="maximumMember"
                            label="Members"
                            name="maximumMember"
                            className={classes.aiming}
                            fullWidth
                            value={input.maximumMember}
                            onChange={handleInputChange}
                        />
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
                            }}
                        >
                            {skills.map((skill) => (
                                <MenuItem key={skill.id} value={skill.id}>
                                    {skill.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    {/* <TextField
                        id="approved-students"
                        label="Skills Required"
                        name="requiredSkills"
                        fullWidth
                        value={input.requiredSkills}
                        onChange={handleInputChange}
                    /> */}
                    <TextField
                        id="approved-students"
                        label="Approved Members"
                        name="approvedMembers"
                        fullWidth
                        value={input.approvedMembers}
                        onChange={handleInputChange}
                    />
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={Object.keys(errorMsg).length > 0}
                    >
                        submit
                    </Button>
                    {console.log(Object.keys(errorMsg))}
                </form>
            </Paper>
        </Container>
    );
}
