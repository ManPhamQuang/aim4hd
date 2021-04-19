//* Components import
import React, { useState, useEffect } from "react";
//* Styling import
import Avatar from "@material-ui/core/Avatar";
import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import School from "../School";

const useStyles = makeStyles((theme) => ({
    root: {
        background:
            "linear-gradient(to right bottom, rgba(225,225,225,0.8),rgba(255,255,255,0.5))",
        borderRadius: "2rem",
        backdropFilter: "blur(2rem)",
        padding: "1.2rem",
    },
    about: {
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingTop: "1rem",
    },
    card: {
        background:
            "linear-gradient(to left top, rgba(255,255,255,0.8), rgba(255,255,255,0.5))",
        borderRadius: "1rem",
        boxShadow: "6px 6px 20px rgba(122,122,122,0.2)",
        marginBottom: "1rem",
    },
    test: {
        backgroundColor: "red",
    },
}));

export default function LeftProfile({ user }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <div className={classes.about}>
                    <Typography
                        component="h5"
                        style={{
                            fontWeight: "600",
                            fontSize: "22px",
                        }}
                    >
                        REVIEW
                    </Typography>
                </div>
            </div>
        </div>
    );
}
