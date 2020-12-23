import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Grid, Paper } from "@material-ui/core";
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
            <h1>Comments</h1>
            {comments.map((comment) => (
                <Paper style={{ padding: "20px 20px" }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar
                                alt={comment.user.name}
                                src={comment.user.avatar}
                            />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>
                                {comment.user.name}
                            </h4>
                            <p style={{ textAlign: "left" }}>
                                {comment.content}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                posted 1 minute ago
                            </p>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </div>
    );
}
