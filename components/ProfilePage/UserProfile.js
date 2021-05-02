import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthContext from "../../utils/authContext";
import { useRouter } from "next/router";
import { FormHelperText, MenuItem } from "@material-ui/core";
import validator from "../../utils/validator";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import ImageUpload from "../common/ImageUpload";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
    autoCompleteRoot: {
        width: 500,
        "& > * + *": {
            marginTop: theme.spacing(3),
        },
    },
}));

function UserProfile({ user, courses, skills, enqueueSnackbar }) {
    const classes = useStyles();
    const [input, setInput] = useState({
        name: user.name,
        school: user.school,
        major: user.major,
        description: user.description,
        skills: user.skills,
        currentCourses: user.currentCourses,
        socialLinks: user.socialLinks,
    });
    const auth = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const patterns = {
        github: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim,
        facebook: /(https?:\/\/)?(www\.)?(facebook|fb|m\.facebook)\.(com|me)\/[\W\S_]{1,25}$/gim,
        linkedin: /(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        // instagram: /(?:https?:)?\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/(?P<username>[A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
        instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/[\W\S_]{1,25}\/$/gim,
    };
    function validateUrl(value, expression) {
        if (value == "") {
            return true;
        }
        var regexp = new RegExp(expression);
        return regexp.test(value);
    }

    const handleSocialLinks = (event) => {
        setInput((input) => ({
            ...input,
            socialLinks: {
                github:
                    event.target.name == "github"
                        ? event.target.value
                        : input.socialLinks.github ?? "",
                linkedin:
                    event.target.name == "linkedin"
                        ? event.target.value
                        : input.socialLinks.linkedin ?? "",
                facebook:
                    event.target.name == "facebook"
                        ? event.target.value
                        : input.socialLinks.facebook ?? "",
                instagram:
                    event.target.name == "instagram"
                        ? event.target.value
                        : input.socialLinks.instagram ?? "",
            },
        }));
        let newErrorMsg = { ...errorMsg };
        const message = validator(event.target.name, event.target.value);

        if (message) setErrorMsg({ ...errorMsg, [event.target.name]: message });
        else {
            delete newErrorMsg[event.target.name];
            setErrorMsg(newErrorMsg);
        }
    };
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
        const message = validator(event.target.name, event.target.value);
        if (message) setErrorMsg({ ...errorMsg, [event.target.name]: message });
        else {
            delete newErrorMsg[event.target.name];
            setErrorMsg(newErrorMsg);
        }
    };

    const handleSubmitSignin = async (event) => {
        event.preventDefault();
        console.log(input.currentCourses);
        if (
            validateUrl(input.socialLinks.github, patterns.github) &&
            validateUrl(input.socialLinks.facebook, patterns.facebook) &&
            validateUrl(input.socialLinks.linkedin, patterns.linkedin) &&
            validateUrl(input.socialLinks.instagram, patterns.instagram)
        ) {
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
                    enqueueSnackbar(err.message, {
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
                id: user.id,
            };
            if (avatar) body.avatar = avatar;
            try {
                const response = await axios.patch(
                    "https://aim4hd-backend.herokuapp.com/api/v1/users/update",
                    body
                );
                if (`${response.status}`.startsWith("2")) {
                    console.log("ENTERING");
                    setIsLoading(false);
                    const data = {};
                    data.user = response.data.data.user;
                    auth.login("update", data);
                    setTimeout(() =>
                        enqueueSnackbar("Successfully update your profile", {
                            variant: "success",
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                            },
                            autoHideDuration: 4000,
                        })
                    );
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    autoHideDuration: 4000,
                });
            }
        }
    };
    const defaultValue = courses.filter((course) =>
        input.currentCourses.includes(course.id));

    return (
        <Container component="main" maxWidth="xs">
            <LoadingSpinner isLoading={isLoading} />
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmitSignin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email Address"
                        disabled
                        value={user.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Student Number"
                        name="studentNumber"
                        disabled
                        value={user.email.split("@")[0]}
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
                    {defaultValue.length > 0 && (
                        <Autocomplete
                            multiple
                            limitTags={2}
                            options={courses}
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => {
                                if (value.length > 0) {
                                    const currentCourses = value.map(
                                        (course) => course.id
                                    );
                                    setInput({ ...input, currentCourses });
                                }
                            }}
                            defaultValue={defaultValue}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Current Course"
                                    placeholder="Favorites"
                                />
                            )}
                        />
                    )}

                    {/* <Autocomplete
                        multiple
                        limitTags={2}
                        options={courses}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => {
                            if (value.length > 0) {
                                const currentCourses = value.map(
                                    (course) => course.id
                                );
                                setInput({ ...input, currentCourses });
                            }
                        }}
                        defaultValue={defaultValue}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Current Course"
                            />
                        )}
                    /> */}

                    {/* <TextField
                        color="secondary"
                        select
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        // label="Current courses"
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

                    </TextField> */}
                    {errorMsg.currentCourses && (
                        <FormHelperText error={true}>
                            {errorMsg.currentCourses}
                        </FormHelperText>
                    )}
                    <TextField
                        color="secondary"
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={<GitHubIcon />}
                        placeholder="Put your GitHub link here"
                        name="github"
                        value={input.socialLinks.github}
                        onChange={handleSocialLinks}
                    />
                    {errorMsg.github && (
                        <FormHelperText error={true}>
                            {errorMsg.github}
                        </FormHelperText>
                    )}
                    <TextField
                        color="secondary"
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={<LinkedInIcon style={{ fontSize: 25 }} />}
                        placeholder="Put your LinkedIn link here"
                        name="linkedin"
                        value={input.socialLinks.linkedin}
                        onChange={handleSocialLinks}
                    />
                    {errorMsg.linkedin && (
                        <FormHelperText error={true}>
                            {errorMsg.linkedin}
                        </FormHelperText>
                    )}
                    <TextField
                        color="secondary"
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={<FacebookIcon style={{ fontSize: 25 }} />}
                        placeholder="Put your Facebook link here"
                        name="facebook"
                        value={input.socialLinks.facebook}
                        onChange={handleSocialLinks}
                    />
                    {errorMsg.facebook && (
                        <FormHelperText error={true}>
                            {errorMsg.facebook}
                        </FormHelperText>
                    )}

                    <TextField
                        color="secondary"
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={<InstagramIcon style={{ fontSize: 25 }} />}
                        placeholder="Put your Instagram link here"
                        name="instagram"
                        value={input.socialLinks.instagram}
                        onChange={handleSocialLinks}
                    />
                    {errorMsg.instagram && (
                        <FormHelperText error={true}>
                            {errorMsg.instagram}
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
                        {isLoading ? "Processing..." : "Update"}
                    </Button>
                </form>
            </div>
        </Container>
    );
}
export default withSnackbar(UserProfile);
