import React, { useEffect, useState } from "react";
import PostCard from "../common/PostCard";
import axios from "axios";
import { Container } from "@material-ui/core";

export default function MyPost(props) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/posts?limit=100&author=${props.userId}`
            )
            .then((res) => setPosts(res.data.data.posts))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            {posts.map((post) => (
                <PostCard {...post} />
            ))}
        </div>
    );
}
