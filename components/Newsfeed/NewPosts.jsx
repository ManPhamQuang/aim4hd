import React, { useState, useEffect } from "react";
import PostCard from "../common/PostCard";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import VisibilitySensor from "react-visibility-sensor";
import { useRouter } from "next/router";

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
export default function Posts({ posts, refVar }) {
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={2} className={classes.grid}>
            {/* show spinner when loading */}
            {posts.map((post, index, posts) => {
                if (posts.length === index + 1) {
                    return (
                        <Grid ref={refVar} item key={post._id}>
                            <PostCard {...post} />
                        </Grid>
                    );
                } else {
                    return (
                        <Grid item key={post._id}>
                            <PostCard {...post} />
                        </Grid>
                    );
                }
            })}
        </Grid>
    );
}
