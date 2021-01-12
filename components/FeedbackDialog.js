import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    iconStyle: {
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        "&:not(:last-child)": {
            marginRight: "16px",
        },
    },
}));

export default function ResponsiveDialog({ author, user, open, setOpen }) {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [isRecommended, setIsRecommended] = useState(true);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [feedback, setFeedback] = useState("");
    console.log({ author, user });
    const handleSubmitFeedback = async () => {
        const data = {
            comment: feedback,
            isAnonymous,
            isRecommended,
            author: author.id,
            user: user.id,
        };
        try {
            const response = await axios.post(
                `https://aim4hd.herokuapp.com/api/v1/users/${user.id}/feedbacks`,
                data
            );
            const responseData = response.data;
            console.log(responseData);
            if (responseData.status === "success") {
                setIsRecommended(true);
                setIsAnonymous(false);
                setFeedback("");
                setOpen(false);
                setTimeout(
                    () => alert("Successfully provide feedback to user"),
                    0
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        user && (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => setOpen(null)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Grid container alignItems="center">
                        <Avatar src={user.avatar} />
                        <span style={{ marginLeft: "5px" }}>{user.name}</span>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Would your recommend this user for other people to team
                        up with?
                    </DialogContentText>
                    <Grid container justify="center" alignItems="center">
                        <div className={classes.iconStyle}>
                            <ThumbUpIcon
                                fontSize="large"
                                color={isRecommended ? "primary" : "disabled"}
                                onClick={(e) => setIsRecommended(true)}
                            />
                        </div>
                        <div className={classes.iconStyle}>
                            <ThumbDownIcon
                                fontSize="large"
                                color={isRecommended ? "disabled" : "primary"}
                                onClick={(e) => setIsRecommended(false)}
                            />
                        </div>
                        <div>{isRecommended ? "YES" : "NO"}</div>
                    </Grid>
                    <TextField
                        color="secondary"
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Your feedback"
                        name="feedback"
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <Grid container alignItems="center">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isAnonymous}
                                    onChange={() =>
                                        setIsAnonymous(!isAnonymous)
                                    }
                                    color="primary"
                                />
                            }
                            label="Stay Anonymous"
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmitFeedback}
                        color="primary"
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Button onClick={() => setOpen(null)} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    );
}
