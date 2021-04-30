import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    Avatar,
    CircularProgress,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SendIcon from "@material-ui/icons/Send";
import authContext from "../../utils/authContext";
import { green } from "@material-ui/core/colors";
import Router from "next/router";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import { withSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    comment: {
        padding: "20px 20px",
        marginTop: theme.spacing(2),
    },
    titleContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        minWidth: "70px",
        width: "100px",
    },
    textField: {
        "& > *": {
            // width: "25ch",
            width: "100%",
            marginBottom: theme.spacing(1),
        },
    },
    wrapper: {
        position: "relative",
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
    deleteButton: {
        height: "48px",
    },
}));

function PostComments({ _id, enqueueSnackbar }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const classes = useStyles();
    const [postingComment, setPostingComment] = useState(false);
    const context = useContext(authContext);
    useEffect(() => {
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/posts/${_id}/comments?limit=100`
            )
            .then((res) => setComments(res.data.data.comments))
            .catch((err) =>
                enqueueSnackbar(err.message, {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    TransitionComponent: Slide,
                    autoHideDuration: 4000,
                })
            );
    }, []);

    const handleChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleSend = () => {
        setPostingComment(true);
        let body = {
            post: _id,
            user: context.user._id,
            content: commentText,
        };
        axios
            .post(
                `https://aim4hd-backend.herokuapp.com/api/v1/posts/${_id}/comments`,
                body
            )
            .then((res) => {
                setPostingComment(false);
                setCommentText("");
                Router.reload(window.location.pathname);
            })
            .catch((err) =>
                enqueueSnackbar(err.message, {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    TransitionComponent: Slide,
                    autoHideDuration: 4000,
                })
            );
    };

    const DeleteButton = ({ comment }) => {
        if (comment.user._id == context.user._id) {
            return (
                <IconButton
                    aria-label="delete"
                    className={classes.deleteButton}
                    onClick={() => handleDelete(comment._id)}
                >
                    <DeleteIcon />
                </IconButton>
            );
        } else {
            return null;
        }
    };

    const handleDelete = (commentId) => {
        axios
            .delete(
                `https://aim4hd-backend.herokuapp.com/api/v1/posts/${_id}/comments/${commentId}`
            )
            .then((res) => {
                Router.reload(window.location.pathname);
            })
            .catch((err) =>
                enqueueSnackbar(err.message, {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    TransitionComponent: Slide,
                    autoHideDuration: 4000,
                })
            );
    };
    return (
        <div className={classes.root}>
            <form className={classes.textField} noValidate autoComplete="off">
                {context.user ? (
                    <TextField
                        label="Your Comments"
                        multiline
                        variant="outlined"
                        value={commentText}
                        onChange={handleChange}
                    />
                ) : (
                    <TextField
                        label="Sign In To Comment"
                        disabled
                        multiline
                        variant="outlined"
                        value={commentText}
                        onChange={handleChange}
                    />
                )}
            </form>
            <div className={classes.titleContainer}>
                <Typography variant="h4">Comments</Typography>
                {context.user ? (
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={postingComment}
                            className={classes.button}
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                        {postingComment && (
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                        )}
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        disabled
                        className={classes.button}
                        endIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                )}
            </div>
            {comments.map((comment) => (
                <Paper
                    key={comment._id}
                    className={classes.comment}
                    elevation={10}
                >
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar
                                alt={comment.user.name}
                                src={comment.user.avatar}
                            />
                        </Grid>

                        <Grid item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>
                                {comment.user.name}
                            </h4>
                            <p style={{ textAlign: "left" }}>
                                {comment.content}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                {moment(comment.date).fromNow()}
                            </p>
                        </Grid>
                        {context.user ? (
                            <DeleteButton comment={comment} />
                        ) : null}
                    </Grid>
                </Paper>
            ))}
        </div>
    );
}
export default withSnackbar(PostComments);
