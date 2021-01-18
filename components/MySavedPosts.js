import React, { useEffect, useState } from "react";
import axios from "axios";
const getInterestedPosts = async (id) => {
    try {
        const response = await axios.get(
            `https://aim4hd.herokuapp.com/api/v1/users/${id}/posts?savedPosts=true`
        );
        if (response.data.status === "success") {
            return response.data.data.posts;
        }
    } catch (error) {
        console.log(error);
    }
};

const MySavedPosts = ({ user }) => {
    const [interestedPosts, setInterestedPosts] = useState([]);

    useEffect(() => {
        if (!user) return;
        const getPostsData = async () => {
            try {
                const data = await getInterestedPosts(user.id);
                setInterestedPosts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPostsData();
    }, [user]);
    console.log(interestedPosts);
    return "123";
};

export default MySavedPosts;
