import React, { useState, useEffect } from "react";
import PostCard from "../common/PostCard";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useRouter } from "next/router";
import { withSnackbar } from "notistack";

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
function Posts({ aiming, loading, setLoading, enqueueSnackbar }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [endOfList, setEndOfList] = useState(false);
    const router = useRouter();
    const { type } = router.query;

    const onChange = (isVisible) => {
        // console.log("Element is now %s", isVisible ? "visible" : "hidden");
        setVisible(isVisible);
    };
    const fetchPosts = () => {
        // console.log(router.query.aiming);
        // console.log(router.query?.aiming);
        // setLoading(true);
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/posts?&limit=3&page=${page}${
                    router.query.aiming != "" &&
                    router.query.aiming != undefined
                        ? `&aiming=${router.query.aiming}`
                        : ""
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
            .catch((err) =>
                enqueueSnackbar(err.message, {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },

                    autoHideDuration: 4000,
                })
            );
    };
    useEffect(() => {
        fetchPosts();
    }, [router.query]);
    // useEffect(() => {
    //     if (visible && !loading) {
    //         setLoading(true);
    //         fetchPosts();
    //     }
    // }, [visible]);
    // useEffect(() => {
    //     setPosts([]);
    //     setPage(1);
    // }, [aiming]);
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={2} className={classes.grid}>
            {/* show spinner when loading */}
            {posts.map((post) => (
                <Grid item key={post._id}>
                    <PostCard {...post} />
                </Grid>
            ))}
            {/* {!endOfList ? (
                <VisibilitySensor onChange={onChange}>
                    <CircularProgress className={classes.loader} />
                    <h1>more more more</h1>
                </VisibilitySensor>
            ) : null} */}
        </Grid>
    );
}
export default withSnackbar(Posts);
