import React, { useEffect, useState } from "react";
import axios from "axios";
export default function PostComments({ _id }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        axios
            .get(`https://aim4hd.herokuapp.com/api/v1/posts/${_id}/comments`)
            .then((res) => setComments(res.data.data.comments))
            .catch((err) => console.log(err));
    });
    return (
        <div>
            <h1>comments</h1>
            {comments.map((comment) => (
                <h1>{comment.content}</h1>
            ))}
        </div>
    );
}
