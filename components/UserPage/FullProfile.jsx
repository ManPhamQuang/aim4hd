//* Components import
import Head from "next/head";
import Posts from "../Newsfeed/Posts";
import Filter from "../Newsfeed/Filter";
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
import School from "../School";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        marginBottom: "4rem",
        marginTop: "3rem",
        backgroundColor: "#FFFFFF",
        borderRadius: "2rem",
        boxShadow: "6px 6px 20px rgba(122,122,122,0.4)",
    },
    profile_picture: {
        height: "166px",
        width: "166px",
    },
    logo: {
        fontSize: "2rem",
        fontWeight: "450",
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: "2rem",
        overflow: "hidden",
        boxShadow: "6px 6px 20px rgba(122,122,122,0.2)",
        "&:hover": {
            color: "white",
        },
        [theme.breakpoints.down("md")]: {
            minWidth: "126px",
            maxWidth: "126px",
            minHeight: "45px",
            maxHeight: "45px",
        },
        [theme.breakpoints.up("lg")]: {
            minWidth: "170px",
            maxWidth: "170px",
            minHeight: "45px",
            maxHeight: "45px",
        },
    },
    responseAlign: {
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
        },

        [theme.breakpoints.up("lg")]: {
            textAlign: "left",
        },
    },
    avaAlign: {
        [theme.breakpoints.down("lg")]: {
            justifyContent: "center",
            display: "flex",
            padding: "10px",
        },
        [theme.breakpoints.up("lg")]: {
            justifyContent: "flex-end",
            display: "flex",
            padding: "20px",
        },
    },
}));

export default function FullProfile({ user }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="strech"
                className={classes.container}
                spacing={2}
                // style={{ backgroundColor: "pink" }}
            >
                <Grid
                    item
                    xs={12}
                    lg={6}
                    container
                    justify="center"
                    alignItems="center"
                    // style={{ backgroundColor: "cyan" }}
                >
                    <Grid
                        item
                        xs={12}
                        lg={5}
                        // style={{ backgroundColor: "red" }}
                    >
                        <div className={classes.avaAlign}>
                            <Avatar
                                alt="User avatar"
                                src={user.avatar}
                                className={classes.profile_picture}
                            />
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        // style={{ backgroundColor: "blue" }}
                    >
                        <div className={classes.responseAlign}>
                            <Typography
                                variant="h4"
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                {user.name}
                            </Typography>
                            <Typography
                                variant="h5"
                                style={{
                                    fontWeight: "500",
                                }}
                            >
                                {user.major}
                            </Typography>
                                <School school={user.school} />
                            <Button
                                variant="contained"
                                size="large"
                                style={{
                                    borderRadius: "2rem",
                                    backgroundColor: "#3C9BFD",
                                    margin: "1rem",
                                }}
                            >
                                FOLLOW
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                style={{
                                    borderRadius: "2rem",
                                    backgroundColor: "#55CF7A",
                                }}
                            >
                                MESSAGE
                            </Button>
                        </div>
                    </Grid>
                    <Grid item container lg={1}>
                        <Hidden mdDown>
                            <Divider
                                orientation="vertical"
                                style={{
                                    maxWidth: "3px",
                                    height: "10rem",
                                }}
                            />
                        </Hidden>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                    lg={3}
                    container
                    spacing={1}
                    justify="center"
                    alignItems="center"
                    // style={{ backgroundColor: "purple" }}
                >
                    <Grid item xs={12} lg={11} style={{ overflow: "hidden" }}>
                        <div className={classes.responseAlign}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: "500" }}
                            >
                                Email: {user.email}
                            </Typography>
                        </div>
                        <div
                            style={{ marginTop: "0.5rem" }}
                            className={classes.responseAlign}
                        >
                            <Typography
                                variant="h6"
                                style={{ fontWeight: "500" }}
                            >
                                Nationality: Vietnamese
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item lg={1}>
                        <Hidden mdDown>
                            <Divider
                                orientation="vertical"
                                style={{
                                    maxWidth: "3px",
                                    height: "10rem",
                                }}
                            />
                        </Hidden>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                    lg={3}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                    // style={{ backgroundColor: "orange" }}
                >
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            className={classes.button}
                            style={{
                                background:
                                    "linear-gradient(45deg,#097CEB,#ffffff)",
                            }}
                            startIcon={
                                <FacebookIcon className={classes.logo} />
                            }
                            onClick={(event) => {
                                if (user.socialLinks?.facebook)
                                    window.open(user.socialLinks.facebook);
                            }}
                        >
                            Facebook
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            className={classes.button}
                            style={{
                                color: "white",
                                background:
                                    "linear-gradient(45deg,#4078c0,#6e5494,#bd2c00,#c9510c,#6cc644,#fafafa)",
                            }}
                            startIcon={<GitHubIcon className={classes.logo} />}
                            onClick={(event) => {
                                if (user.socialLinks?.facebook)
                                    window.open(user.socialLinks.github);
                            }}
                        >
                            Github
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            className={classes.button}
                            style={{
                                background:
                                    "radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)",
                            }}
                            startIcon={
                                <InstagramIcon className={classes.logo} />
                            }
                            onClick={(event) => {
                                if (user.socialLinks?.facebook)
                                    window.open(user.socialLinks.instagram);
                            }}
                        >
                            Instagram
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            className={classes.button}
                            style={{
                                color: "white",
                                background:
                                    "linear-gradient(45deg,#0077B5,#000000,#313335,#86888A,#caccce, #00a0dc)",
                            }}
                            startIcon={
                                <LinkedInIcon className={classes.logo} />
                            }
                            onClick={(event) => {
                                if (user.socialLinks?.facebook)
                                    window.open(user.socialLinks.linkedin);
                            }}
                        >
                            Linkedin
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
