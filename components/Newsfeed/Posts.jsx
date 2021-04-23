import React, { useState, useEffect } from "react";
import PostCard from "../common/PostCard";
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
    grid: {
        marginBottom: "2rem",
    },
}));
export default function Posts({ aiming, loading, setLoading }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [endOfList, setEndOfList] = useState(false);
    const onChange = (isVisible) => {
        // console.log("Element is now %s", isVisible ? "visible" : "hidden");
        setVisible(isVisible);
    };
    const fetchPosts = () => {
        // setLoading(true);
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/posts?&limit=3&page=${page}${
                    aiming != "" ? `&aiming=${aiming}` : ""
                }&sort=-createdAt`
            )
            .then((res) => {
                if (res.data.length != 0) {
                    setPosts([...posts, ...res.data.data.posts]);
                    setPage(page + 1);
                    setLoading(false);
                } else {
                    // no more posts, stop loading more
                    setEndOfList(true);
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        if (visible && !loading) {
            setLoading(true);
            fetchPosts();
        }
    }, [visible]);
    useEffect(() => {
        setPosts([]);
        setPage(1);
    }, [aiming]);
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={2} className={classes.grid}>
            {/* show spinner when loading */}
            {posts.map((post) => (
                <Grid item key={post._id}>
                    <PostCard {...post} />
                </Grid>
            ))}
            {!endOfList ? (
                <VisibilitySensor onChange={onChange}>
                    <CircularProgress className={classes.loader} />
                    {/* <h1>more more more</h1> */}
                </VisibilitySensor>
            ) : null}
        </Grid>
    );
}
