import React, { useEffect, useState } from "react";
import axios from "axios";
const Feedback = ({ user }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getAllPostsAdmitted = async () => {
            try {
                const response = await axios.get(
                    `https://aim4hd.herokuapp.com/api/v1/users/${user.id}/posts`
                );
                console.log(response);
                setPosts(response.data.data.posts);
            } catch (error) {
                console.log(error);
            }
        };
        getAllPostsAdmitted();
    }, [user]);
    console.log(posts);
    return "HELLO";
};

export default Feedback;
