//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";
//* Styling import
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { Phone } from "@material-ui/icons";
import PersonPinIcon from "@material-ui/icons/PersonPin";
// import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(4),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "-5%",
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
    fontSize: "1.5rem",
  },
  contactInfo: {
    display: "flex",
    margin: theme.spacing(4),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "-4%",
    marginTop: "3%",
  },
}));

export default function UserProfile({ user }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Avatar
          alt="User avatar"
          src={user.avatar}
          className={classes.profile_picture}
        />
      </div>
      <div className={classes.root}>
        <Typography
          variant="h4"
          align="center"
          style={{ fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}
        >
          {user.name}
        </Typography>
      </div>
      <div className={classes.root}>
        <Typography
          variant="h5"
          align="center"
          style={{ textShadow: "1px 1px 1px #000000" }}
        >
          {user.major}
        </Typography>
      </div>

      <div
        className={classes.root}
        style={{
          marginBottom: "2%",
          borderBottom: "2px solid black",
        }}
      >
        <IconButton
          aria-label="Facebook.com"
          onClick={() => window.open("https://www.facebook.com")}
        >
          <FacebookIcon style={{ fill: "#1877F2" }} className={classes.logo} />
        </IconButton>

        <IconButton
          aria-label="Instagram.com"
          onClick={() => window.open("https://www.instagram.com")}
        >
          <InstagramIcon style={{ fill: "#E74159" }} className={classes.logo} />
        </IconButton>

        <IconButton
          aria-label="Linkedin.com"
          onClick={() => window.open("https://www.Linkedin.com")}
        >
          <LinkedInIcon style={{ fill: "#006699" }} className={classes.logo} />
        </IconButton>
      </div>
      <span className={classes.root} style={{ marginBottom: "-7%" }}>
        <Typography
          variant="h5"
          align="center"
          style={{
            textDecoration: "underline orange",
            fontWeight: "bold",
            textShadow: "1px 1px 2px #000000",
          }}
        >
          Contact Information
        </Typography>
      </span>
      <div className={classes.contactInfo}>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <EmailIcon className={classes.logo2} />
          </Grid>
          <Grid item className={classes.info}>
            Email
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Typography
          variant="caption"
          align="center"
          style={{ fontSize: "1.5rem" }}
        >
          {user.email}
        </Typography>
      </div>

      <div className={classes.contactInfo}>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <PhoneIcon className={classes.logo2} />
          </Grid>
          <Grid item className={classes.info}>
            Phone
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Typography
          variant="caption"
          align="center"
          style={{ fontSize: "1.5rem" }}
        >
          +94 903321432
        </Typography>
      </div>

      <div className={classes.contactInfo}>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <PersonPinIcon className={classes.logo2} />
          </Grid>
          <Grid item className={classes.info}>
            Location
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Typography
          variant="caption"
          align="center"
          style={{ fontSize: "1.5rem" }}
        >
          Ho Chi Minh city
        </Typography>
      </div>
    </div>
  );
}
