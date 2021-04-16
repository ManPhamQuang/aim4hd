import React, { useEffect, useState, useContext } from "react";
import UserProfile from "../components/ProfilePage/UserProfile";
import Feedback from "../components/ProfilePage/Feedback";
import MySavedPosts from "../components/ProfilePage/MySavedPosts";
import AuthContext from "../utils/authContext";
import axios from "axios";
import { useRouter } from "next/router";
import {
    Grid,
    Container,
    Avatar,
    makeStyles,
    Typography,
    ListItem,
    List,
    ListItemText,
    CircularProgress,
} from "@material-ui/core";
import Achievement from "../components/ProfilePage/Achievement";

const useStyles = makeStyles((theme) => ({
    container: {
        border: `1px solid #dee2e7`,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        background: "#fff",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        width: "100px",
        height: "100px",
    },
    listItem: {
        color: "#007791",
        textAlign: "center",
    },
    menu: {
        borderBottom: "1px solid #dee2e7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));

const ProfilePage = ({ user }) => {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        let source = axios.CancelToken.source();
        const getAllCoursesAndSkills = async () => {
            const skillsResponse = axios.get(
                "https://aim4hd-backend.herokuapp.com/api/v1/skills"
            );
            const coursesResponse = axios.get(
                "https://aim4hd-backend.herokuapp.com/api/v1/courses?limit=100"
            );
            try {
                const result = await axios.all(
                    [skillsResponse, coursesResponse],
                    { cancelToken: source.token }
                );
                setSkills(result[0].data.skills);
                setCourses(result[1].data.data.courses);
            } catch (error) {
                console.log(error);
            }
        };
        getAllCoursesAndSkills();
        return () => {
            source.cancel();
        };
    }, []);

    useEffect(() => {}, []);

    return (
        auth.user && (
            <Container fixed style={{ marginTop: "1rem" }}>
                <Grid container justify="center" spacing={1}>
                    <Grid item md={3} sm={12} xs={12}>
                        <div className={classes.container}>
                            <div className={classes.box}>
                                <Avatar
                                    src={auth.user.avatar}
                                    className={classes.avatar}
                                />
                                <Typography
                                    variant="h6"
                                    style={{
                                        fontWeight: "bold",
                                        margin: "11px 0",
                                    }}
                                >
                                    {auth.user.name}
                                </Typography>{" "}
                            </div>

                            <List component="ul">
                                <ListItem
                                    button
                                    className={classes.listItem}
                                    onClick={() => router.push("/profile")}
                                >
                                    <ListItemText primary="My Profile" />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.listItem}
                                    onClick={() =>
                                        router.push("/profile?page=feedback")
                                    }
                                >
                                    <ListItemText primary="My feedback" />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.listItem}
                                    onClick={() =>
                                        router.push("/profile?page=saved-post")
                                    }
                                >
                                    <ListItemText primary="My saved post" />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.listItem}
                                    onClick={() =>
                                        router.push("/profile?page=achievement")
                                    }
                                >
                                    <ListItemText primary="My achievement" />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.listItem}
                                    onClick={auth.logout}
                                >
                                    <ListItemText primary="Sign out" />
                                </ListItem>
                            </List>
                        </div>
                    </Grid>
                    <Grid item md={9} sm={12} xs={12}>
                        <div className={classes.container}>
                            <div className={classes.menu}>
                                <Typography variant="h6">
                                    {Object.keys(router.query).length === 0 &&
                                        "My Profile"}
                                    {router.query.page === "feedback" &&
                                        "My Feedback"}
                                    {router.query.page === "saved-post" &&
                                        "My Saved Post"}
                                    {router.query.page === "achievement" &&
                                        "My Achievement"}
                                </Typography>
                                <Typography style={{ margin: "8px 0" }}>
                                    {Object.keys(router.query).length === 0 &&
                                        "Edit information about yourself"}
                                    {router.query.page === "Feedback" &&
                                        "Provide feedback to your teammate"}
                                    {router.query.page === "Saved-post" &&
                                        "Your saved post in one place"}
                                    {router.query.page === "Achievement" &&
                                        "Post all of your achievements here"}
                                </Typography>
                            </div>
                            <div>
                                {Object.keys(router.query).length === 0 && (
                                    <UserProfile
                                        user={auth.user}
                                        courses={courses}
                                        skills={skills}
                                    />
                                )}
                                {router.query.page === "feedback" && (
                                    <Feedback user={auth.user} />
                                )}
                                {router.query.page === "saved-post" && (
                                    <MySavedPosts user={auth.user} />
                                )}
                                {router.query.page === "achievement" && (
                                    <Achievement user={auth.user} />
                                )}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        )
    );
};

export default ProfilePage;
