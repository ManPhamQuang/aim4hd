import { Button, makeStyles } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import React, { useContext } from "react";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import SendIcon from "@material-ui/icons/Send";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";
import { withSnackbar } from "notistack";
import AuthContext from "../../utils/authContext";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
    },
    wrapper: {
        position: "relative",
    },
    button: {
        width: "100%",
    },
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
}));

function SaveButton({ userId, postId, savedPosts, enqueueSnackbar }) {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const isSaved = savedPosts.find((post) => {
        return post == postId;
    })
        ? true
        : false;

    const ButtonText = () => {
        if (isSaved) {
            // already applied
            return "Unsave";
        }
        if (success) {
            // applied successfuly
            return "Saved";
        } else {
            // not applied
            return "Save Post";
        }
    };

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.button]: true,
    });

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const savePost = () => {
        axios
            .post(
                `https://aim4hd-backend.herokuapp.com/api/v1/posts/${postId}?savedPosts=true`,
                {
                    userId: userId,
                }
            )
            .then((res) => {
                if (res.status == 200) {
                    setSuccess(true);
                    setLoading(false);
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

    const handleButtonClick = () => {
        if (!success) {
            // if successfuly applied, button won't click
            if (!loading) {
                // if loading, button won't click
                setSuccess(false);
                setLoading(true);
                savePost();
            }
        }
    };
    return (
        <div className={classes.wrapper}>
            <Button
                variant="contained"
                className={buttonClassname}
                disabled={loading}
                onClick={handleButtonClick}
                startIcon={success ? <DoneIcon /> : <BookmarkIcon />}
            >
                {ButtonText()}
            </Button>
            {loading && (
                <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                />
            )}
        </div>
    );
}
export default withSnackbar(SaveButton);
