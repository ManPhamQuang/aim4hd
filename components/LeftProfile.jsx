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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2),
    justifyContent: "center",
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
    margin: theme.spacing(4),
    marginLeft:"15%",
    marginBottom: "2%",
    marginTop: "2%",
  },
}));
const ColorLine = ({ color }) => (
  <hr
      style={{
          borderStyle: "none",
          backgroundColor: color,
          height: 4,
          width: '80%'
      }}
  />
);

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
          variant="h5"
          align="center"
          style={{ fontWeight: "bold" }}
        >
          {user.name}
        </Typography>
      </div>
      <div className={classes.root}>
        <Typography
          variant="h6"
          align="center"
        >
          {user.major} - {user.school}
        </Typography>
      </div>

      <div
        className={classes.root}
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
      <ColorLine color="#e5e5e5" />
      <div className={classes.contactInfo} style={{ marginBottom: "5%" }}>
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
          }}
        >
          Contact Information
        </Typography>
      </div>
      <ColorLine color="#d6072b" />
    
      <div className={classes.contactInfo}>
        <Grid
          container
          direction="row"
        >
          <Grid item>
            <EmailIcon className={classes.logo2} />
          </Grid>
          <Grid item className={classes.info} style={{marginTop: "2%",}}
          >
            Email
          </Grid>
        </Grid>
      </div>
      <div className={classes.contactInfo}>
        <Typography
          variant="caption"
          style={{ fontSize: "1rem" }}
        >
          {user.email}
        </Typography>
      </div>

      <div className={classes.contactInfo}>
        <Grid
          container
          direction="row"
        >
          <Grid item>
            <PhoneIcon className={classes.logo2} />
          </Grid>
          <Grid item className={classes.info} style={{marginTop: "2%"}}>
            Phone
          </Grid>
        </Grid>
      </div>
      <div className={classes.contactInfo}>
        <Typography
          variant="caption"
          style={{ fontSize: "1rem" }}
        >
          +94 903321432
        </Typography>
      </div>

      <div className={classes.contactInfo}>
        <Grid
          container
          direction="row"
      
        >
          <Grid item>
            <PersonPinIcon className={classes.logo2} />
          </Grid>
          <Grid item className={classes.info} style={{marginTop: "2%"}}>
            Location
          </Grid>
        </Grid>
      </div>
      <div className={classes.contactInfo}>
        <Typography
          variant="caption"
          // align="center"
          style={{ fontSize: "1rem" }}
        >
          Ho Chi Minh city
        </Typography>
      </div>
    </div>
  );
}
