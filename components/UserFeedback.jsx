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
import authContext from "../utils/authContext";
import { green } from "@material-ui/core/colors";
import Router from "next/router";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
        justifyContent: "flex-end",
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

export default function UserFeedback(user) {
    const [feedbacks, setFeedbacks] = useState([]);
    const [fbText, setFBtext] = useState("");
    const [isRecommended, setIsRecommended] = useState("");
    const classes = useStyles();
    const [postingFB, setPostingFB] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const context = useContext(authContext);

    const toggleAnonymous = () => {
        setIsAnonymous((prev) => !prev);
    };

    // useEffect(() => {
    // 	axios
    // 		.get(`https://aim4hd-backend.herokuapp.com/api/v1/users/${user}/feedbacks`)
    // 		.then((res) => setFeedbacks(res.data.data.feedbacks))
    // 		.catch((err) => console.log(err));
    // }, []);

    // const handleChange = (e) => {
    // 	setCommentText(e.target.value);
    // };

    // const handleSend = () => {
    // 	setPostingFB(true);
    // 	let body = {
    //         author:
    // 		post: _id,
    // 		user: context.user._id,
    // 		content: commentText,
    // 	};
    // 	axios
    // 		.post(`https://aim4hd-backend.herokuapp.com/api/v1/posts/${_id}/comments`, body)
    // 		.then((res) => {
    // 			console.log(res);
    // 			setPostingComment(false);
    // 			setCommentText("");
    // 			Router.reload(window.location.pathname);
    // 		})
    // 		.catch((err) => console.log(err));
    // };

    // const DeleteButton = ({ comment }) => {
    // 	if (comment.user._id == context.user._id) {
    // 		return (
    // 			<IconButton
    // 				aria-label="delete"
    // 				className={classes.deleteButton}
    // 				onClick={() => handleDelete(comment._id)}
    // 			>
    // 				<DeleteIcon />
    // 			</IconButton>
    // 		);
    // 	} else {
    // 		return null;
    // 	}
    // };

    // const handleDelete = (commentId) => {
    // 	axios
    // 		.delete(
    // 			`https://aim4hd-backend.herokuapp.com/api/v1/posts/${_id}/comments/${commentId}`
    // 		)
    // 		.then((res) => {
    // 			console.log(res);
    // 			Router.reload(window.location.pathname);
    // 		})
    // 		.catch((err) => console.log(err));
    // };
    return (
        <div className={classes.root}>
            <form className={classes.textField} noValidate autoComplete="off">
                {context.user ? (
                    <TextField
                        label="Your Comments"
                        multiline
                        variant="outlined"
                        value={user}
                    />
                ) : (
                    <TextField
                        label="Sign In To Comment"
                        disabled
                        multiline
                        variant="outlined"
                        value={user}
                    />
                )}
            </form>
            <div className={classes.titleContainer}>
                <FormControlLabel
                    style={{ paddingRight: "7px" }}
                    control={
                        <Switch
                            checked={isAnonymous}
                            onChange={toggleAnonymous}
                            name="checkedAno"
                        />
                    }
                    labelPlacement="start"
                    label="Anonymous"
                />
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
        </div>
    );
}
