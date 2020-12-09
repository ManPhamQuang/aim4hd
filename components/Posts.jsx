import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import VisibilitySensor from "react-visibility-sensor";

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
}));
export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [endOfList, setEndOfList] = useState(false);
    const onChange = (isVisible) => {
        console.log("Element is now %s", isVisible ? "visible" : "hidden");
        setVisible(isVisible);
    };
    const fetchPosts = () => {
        console.log("fetching page: " + page);
        // setLoading(true);
        axios
            .get(
                `https://aim4hd.herokuapp.com/api/v1/posts?&limit=3&page=${page}`
            )
            .then((res) => {
                if (res.data.length != 0) {
                    setPosts([...posts, ...res.data.data.posts]);
                    setPage(page + 1);
                    setLoading(false);
                } else {
                    setEndOfList(true);
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        if (visible && !loading) {
            // setLoading(true);
            fetchPosts();
        }
    }, [visible]);
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={4}>
            {/* show spinner when loading */}
            {loading ? (
                <CircularProgress className={classes.loader} />
            ) : (
                posts.map((post) => (
                    <Grid item key={post._id}>
                        <PostCard {...post} />
                    </Grid>
                ))
            )}
            {!endOfList ? (
                <VisibilitySensor onChange={onChange}>
                    <h1>more more more</h1>
                </VisibilitySensor>
            ) : null}
        </Grid>
    );
}
