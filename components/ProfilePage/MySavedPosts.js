import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostCard from "../common/PostCard";
import { Typography } from "@material-ui/core";

const getInterestedPosts = async (id) => {
    try {
        const response = await axios.get(
            `https://aim4hd-backend.herokuapp.com/api/v1/users/${id}/posts?savedPosts=true`
        );
        if (response.data.status === "success") {
            return response.data.data.posts;
        }
    } catch (error) {
        console.log(error);
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "12px",
    },
    progress: {
        display: "flex",
        justifyContent: "center",
    },
}));

const MySavedPosts = ({ user }) => {
    const [interestedPosts, setInterestedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (!user) return;
        const getPostsData = async () => {
            setIsLoading(true);
            try {
                const data = await getInterestedPosts(user.id);
                setIsLoading(false);
                setInterestedPosts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPostsData();
    }, [user]);
    console.log(interestedPosts);
    return (
        <div className={classes.root}>
            {isLoading && (
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            )}
            {!isLoading &&
                interestedPosts.length > 0 &&
                interestedPosts.map((post) => (
                    <PostCard key={post.id} {...post} />
                ))}
        </div>
    );
};

export default MySavedPosts;
