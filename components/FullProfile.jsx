//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";
//* Styling import
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { Phone } from "@material-ui/icons";
import List from "@material-ui/core/List";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import School from "./School";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        marginBottom: "5rem",
        marginTop: "3rem",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        padding: "2rem",
    },
    profile_picture: {
        height: "12rem",
        width: "12rem",
    },
    logo: {
        fontSize: "2rem",
        marginTop: "0.5rem",
    },
}));

export default function FullProfile({ user }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                className={classes.container}
                spacing={3}
            >
                <Grid item>
                    <Avatar
                        alt="User avatar"
                        src={user.avatar}
                        className={classes.profile_picture}
                    />
                </Grid>
                <Grid
                    item
                    style={{
                        height: "100%",
                        paddingLeft: "0.3rem",
                    }}
                >
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        {user.name}
                    </Typography>

                    <Typography variant="h6" style={{ fontWeight: "500" }}>
                        {user.major}
                    </Typography>
                    <School school={user.school} />
                </Grid>
                <Hidden smDown>
                    <Divider
                        orientation="vertical"
                        style={{
                            maxWidth: "3px",
                            height: "10rem",
                            marginLeft: "5rem",
                            marginRight: "5rem",
                        }}
                    />
                </Hidden>
                <Grid item xs>
                    <div style={{ display: "flex" }}>
                        <Typography style={{ fontWeight: "500" }}>
                            Email:
                        </Typography>
                        <Typography style={{ marginLeft: 70 }}>
                            {user.email}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", marginTop: "0.5rem" }}>
                        <Typography style={{ fontWeight: "500" }}>
                            Nationality:
                        </Typography>
                        <Typography style={{ marginLeft: 30 }}>
                            Vietnamese
                        </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                        <FacebookIcon
                            className={classes.logo}
                            style={{ fill: "#3FA2FF" }}
                        />
                        <InstagramIcon
                            className={classes.logo}
                            style={{ marginLeft: "1rem", fill: "#3FA2FF" }}
                        />
                        <LinkedInIcon
                            className={classes.logo}
                            style={{ marginLeft: "1rem", fill: "#3FA2FF" }}
                        />
                        <GitHubIcon
                            className={classes.logo}
                            style={{ marginLeft: "1rem", fill: "#3FA2FF" }}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
