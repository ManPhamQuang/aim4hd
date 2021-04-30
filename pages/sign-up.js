import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthContext from "../utils/authContext";
import { useRouter } from "next/router";
import { FormHelperText, MenuItem } from "@material-ui/core";
import validator from "../utils/validator";
import axios from "axios";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ImageUpload from "../components/common/ImageUpload";
import { withSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        zIndex: 10,
    },
}));

function SignIn({ courses, skills, enqueueSnackbar }) {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const router = useRouter();
    if (!auth.authData && typeof window !== "undefined") router.push("/");
    if (auth.user && typeof window !== "undefined") router.push("/");
    const [input, setInput] = useState({
        name: auth.authData ? auth.authData.account.name : "",
        school: "",
        major: "",
        description: "",
        skills: [],
        currentCourses: [],
    });
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState({
        school: "",
        major: "",
        skills: "",
        currentCourses: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleOnInputChange = (event) => {
        if (
            event.target.name === "skills" ||
            event.target.name === "currentCourses"
        ) {
            setInput((input) => ({
                ...input,
                [event.target.name]:
                    event.target.type === "checkbox"
                        ? event.target.checked
                        : event.target.value,
            }));
        }
        setInput((input) => ({
            ...input,
            [event.target.name]: event.target.value,
        }));
        let newErrorMsg = { ...errorMsg };
        console.log(newErrorMsg);
        const message = validator(event.target.name, event.target.value);
        if (message) setErrorMsg({ ...errorMsg, [event.target.name]: message });
        else {
            delete newErrorMsg[event.target.name];
            setErrorMsg(newErrorMsg);
        }
    };

    const handleSubmitSignin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let avatar;
        if (image) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "iiyg1094");
            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dybygufkr/image/upload",
                    formData
                );
                avatar = response.data.secure_url;
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    TransitionComponent: Slide,
                    autoHideDuration: 4000,
                });
            }
        }
        const body = {
            ...input,
            email: auth.authData.account.userName,
            studentNumber: auth.authData.account.userName.split("@")[0],
            microsoftUniqueId: auth.authData.uniqueId,
        };
        console.log(avatar);
        if (avatar) body.avatar = avatar;
        try {
            const response = await axios.post(
                "https://aim4hd-backend.herokuapp.com/api/v1/users/signup",
                body
            );
            if (`${response.status}`.startsWith("2")) {
                setIsLoading(false);
                auth.login("signup", {
                    user: response.data.data.user,
                    token: response.data.data.token,
                });
                // router.push("/");
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error.response);
            enqueueSnackbar(error.message, {
                variant: "warning",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                },
                TransitionComponent: Slide,
                autoHideDuration: 4000,
            });
        }
    };

    return (
        auth.authData && (
            <Container component="main" maxWidth="xs">
                {isLoading && <LoadingSpinner isLoading={isLoading} />}
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmitSignin}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="email"
                            label="Email Address"
                            disabled
                            value={auth.authData.account.userName}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Student Number"
                            name="studentNumber"
                            disabled
                            value={auth.authData.account.userName.split("@")[0]}
                        />
                        <TextField
                            color="secondary"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            value={input.name}
                            onChange={handleOnInputChange}
                        />
                        {errorMsg.name && (
                            <FormHelperText error={true}>
                                {errorMsg.name}
                            </FormHelperText>
                        )}
                        <TextField
                            color="secondary"
                            select
                            name="school"
                            name="school"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="School"
                            SelectProps={{
                                value: input.school,
                                onChange: handleOnInputChange,
                            }}
                        >
                            {["SST", "SCD", "SBM"].map((school) => (
                                <MenuItem value={school} key={school}>
                                    {school}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            color="secondary"
                            required
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Major"
                            name="major"
                            value={input.major}
                            onChange={handleOnInputChange}
                        />
                        {errorMsg.major && (
                            <FormHelperText error={true}>
                                {errorMsg.major}
                            </FormHelperText>
                        )}
                        <TextField
                            color="secondary"
                            multiline
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Self Description"
                            name="description"
                            rows={4}
                            value={input.description}
                            onChange={handleOnInputChange}
                        />
                        <TextField
                            color="secondary"
                            select
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Skills"
                            name="skills"
                            SelectProps={{
                                multiple: true,
                                value: input.skills,
                                onChange: handleOnInputChange,
                            }}
                        >
                            {skills.map((skill) => (
                                <MenuItem key={skill.id} value={skill.id}>
                                    {skill.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        {errorMsg.skills && (
                            <FormHelperText error={true}>
                                {errorMsg.skills}
                            </FormHelperText>
                        )}
                        <TextField
                            color="secondary"
                            select
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Current courses"
                            name="currentCourses"
                            SelectProps={{
                                multiple: true,
                                value: input.currentCourses,
                                onChange: handleOnInputChange,
                            }}
                        >
                            {courses.map((course) => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        {errorMsg.currentCourses && (
                            <FormHelperText error={true}>
                                {errorMsg.currentCourses}
                            </FormHelperText>
                        )}
                        <ImageUpload image={image} setImage={setImage} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={Object.keys(errorMsg).length > 0}
                        >
                            {isLoading ? "Processing..." : "Sign In"}
                        </Button>
                    </form>
                </div>
            </Container>
        )
    );
}

export async function getStaticProps(context) {
    const skillsResponse = axios.get(
        "https://aim4hd-backend.herokuapp.com/api/v1/skills"
    );
    const coursesResponse = axios.get(
        "https://aim4hd-backend.herokuapp.com/api/v1/courses?limit=100"
    );
    try {
        const result = await Promise.all([skillsResponse, coursesResponse]);
        return {
            props: {
                skills: result[0].data.skills,
                courses: result[1].data.data.courses,
            },
        };
    } catch (error) {
        enqueueSnackbar(error.message, {
            variant: "warning",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            },
            TransitionComponent: Slide,
            autoHideDuration: 4000,
        });
    }
}
export default withSnackbar(SignIn);
