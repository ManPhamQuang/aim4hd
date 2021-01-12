import React, { useEffect, useState, useContext } from "react";
import UserProfile from "../components/UserProfile";
import Feedback from "../components/Feedback";
import AuthContext from "../utils/authContext";
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
    const isMainPage = !router.query.page;
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
                                    {isMainPage ? "My Profile" : "My Feedback"}
                                </Typography>
                                <Typography style={{ margin: "8px 0" }}>
                                    {isMainPage
                                        ? "Edit information about yourself"
                                        : "Provide feedback to your teammate"}
                                </Typography>
                            </div>

                            <div>
                                {isMainPage ? (
                                    <UserProfile user={auth.user} />
                                ) : (
                                    <Feedback user={auth.user} />
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
