import React from "react";
import UserCard from "../common/UserCard";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        margin: "auto",
        marginTop: "3rem",
    },
    grid: {
        marginBottom: "2rem",
    },
}));
export default function Users({ users }) {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.grid}>
            {/* show spinner when loading */}
            {users.map((user, index, posts) => (
                <Grid item xs={12} key={user._id}>
                    <UserCard user={user} />
                </Grid>
            ))}
        </Grid>
    );
}
