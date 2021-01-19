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

export default function ResponsiveDialog({
    user,
    open,
    setOpen,
    content,
    setContent,
    handleSubmitFeedback,
}) {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const { feedback, isAnonymous, isRecommended } = content;
    const handleCloseModal = (e) => {
        setOpen(false);
    };

    const handleOnChange = (e) => {
        if (e.target.name === "isAnonymous")
            setContent({ ...content, isAnonymous: !isAnonymous });
        else setContent({ ...content, [e.target.name]: e.target.value });
    };

    return (
        user && (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCloseModal}
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
                                onClick={() =>
                                    setContent({
                                        ...content,
                                        isRecommended: true,
                                    })
                                }
                            />
                        </div>
                        <div className={classes.iconStyle}>
                            <ThumbDownIcon
                                fontSize="large"
                                color={isRecommended ? "disabled" : "primary"}
                                onClick={() =>
                                    setContent({
                                        ...content,
                                        isRecommended: false,
                                    })
                                }
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
                        onChange={handleOnChange}
                    />
                    <Grid container alignItems="center">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="isAnonymous"
                                    checked={isAnonymous}
                                    onChange={handleOnChange}
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
                    <Button onClick={handleCloseModal} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    );
}
