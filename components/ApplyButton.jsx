import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";
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
const userId = "5fab4912ffd1131f3cace693";

export default function ButtonProgress({ postId, appliedStudents }) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const isApplied = appliedStudents.find((id) => id == userId) ? true : false;
    // const isDisabled =

    const ButtonText = () => {
        if (isApplied) {
            // already applied
            return "Applied";
        }
        if (success) {
            // applied successfuly
            return "Applied";
        } else {
            // not applied
            return "Apply";
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

    const applyToPost = () => {
        axios
            .post(`https://aim4hd.herokuapp.com/api/v1/posts/${postId}`, {
                userId: userId,
            })
            .then((res) => {
                if (res.status == 200) {
                    setSuccess(true);
                    setLoading(false);
                    console.log(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleButtonClick = () => {
        if (!success) {
            // if successfuly applied, button won't click
            if (!loading) {
                // if loading, button won't click
                setSuccess(false);
                setLoading(true);
                applyToPost();
            }
        }
    };
    return (
        <div className={classes.wrapper}>
            <Button
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={isApplied || loading}
                onClick={handleButtonClick}
                endIcon={success ? <DoneIcon /> : <SendIcon />}
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
