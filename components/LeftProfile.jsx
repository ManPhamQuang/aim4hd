//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";
//* Styling import
import Avatar from "@material-ui/core/Avatar";
import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
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

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        margin: theme.spacing(2),
        justifyContent: "center",
    },
    container: {
        [theme.breakpoints.down("sm")]: {
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            marginBottom: "1.5rem",
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: "1rem",
            marginRight: "1rem",
        },
    },
    profile_picture: {
        width: theme.spacing(23),
        height: theme.spacing(23),
    },
    logo: {
        fontSize: "3rem",
    },
    logo2: {
        fontSize: "2rem",
    },
    info: {
        fontSize: "1rem",
    },
    contactInfo: {
        display: "flex",
        marginLeft: "15%",
        marginBottom: "2%",
        marginTop: "2%",
    },
}));
const ColorLine = ({ color }) => (
    <hr
        style={{
            borderStyle: "none",
            backgroundColor: color,
            height: 2.5,
            width: "100%",
        }}
    />
);

export default function LeftProfile({ user }) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <Avatar
                    alt="User avatar"
                    src={user.avatar}
                    className={classes.profile_picture}
                />
            </div>
            <div className={classes.root}>
                <Typography
                    variant="h5"
                    align="center"
                    style={{ fontWeight: "bold" }}
                >
                    {user.name}
                </Typography>
            </div>
            <div className={classes.root}>
                <Typography variant="h6" align="center">
                    {user.major} - {user.school}
                </Typography>
            </div>

            <div className={classes.root}>
                <IconButton
                    aria-label="Facebook.com"
                    onClick={() => window.open("https://www.facebook.com")}
                >
                    <FacebookIcon
                        style={{ fill: "#1877F2" }}
                        className={classes.logo}
                    />
                </IconButton>

                <IconButton
                    aria-label="Instagram.com"
                    onClick={() => window.open("https://www.instagram.com")}
                >
                    <InstagramIcon
                        style={{ fill: "#E74159" }}
                        className={classes.logo}
                    />
                </IconButton>

                <IconButton
                    aria-label="Linkedin.com"
                    onClick={() => window.open("https://www.Linkedin.com")}
                >
                    <LinkedInIcon
                        style={{ fill: "#006699" }}
                        className={classes.logo}
                    />
                </IconButton>
            </div>
            <Hidden mdUp>
                <ColorLine color="#f2f2f2" />
            </Hidden>
            <Hidden smDown>
                <ColorLine color="#e5e5e5" />
            </Hidden>

            <div className={classes.contactInfo}>
                <Typography
                    variant="h6"
                    style={{
                        fontWeight: "bold",
                    }}
                >
                    Contact Information
                </Typography>
            </div>
            <ColorLine color="#d6072b" />
            <div>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Emails"
                            secondary={
                                <Typography style={{ fontWeight: "500" }}>
                                    {user.email}
                                </Typography>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PhoneIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Phone"
                            secondary={
                                <Typography style={{ fontWeight: "500" }}>
                                    +84 903321123
                                </Typography>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonPinIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Location"
                            secondary={
                                <Typography style={{ fontWeight: "500" }}>
                                    Viet Nam
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </div>
        </div>
    );
}
