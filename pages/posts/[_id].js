import React, { useEffect, useState } from "react";
import axios from "axios";

export async function getStaticPaths() {
    // get list of post to populate paths
    let posts = await getPosts();
    let paths = posts.map((post) => `/posts/${post._id}`);
    return {
        paths,
        fallback: false,
    };
}

const getPosts = async () => {
    let posts = await axios.get("https://aim4hd.herokuapp.com/api/v1/posts");
    return posts.data.data.posts;
};

const getPost = async (_id) => {
    let post = await axios.get(
        `https://aim4hd.herokuapp.com/api/v1/posts/${_id}`
    );
    return post.data.data.post;
};

export async function getStaticProps({ params }) {
    let res = await getPost(params._id);
    return {
        props: res,
    };
}

function PostPage({ title }) {
    const [post, setPost] = useState({});
    return <h1>{title}</h1>;
}

export default PostPage;
