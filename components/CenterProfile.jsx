//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Hidden } from "@material-ui/core";
import SkillBadge from "./SkillBadge";
import CourseBadge from "./CourseBadge";

//*Styling import
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  // overview: {
  //   margin: theme.spacing(4),
  //   alignItems: "left",
  //   marginBottom: "10%",
  //   marginTop: "10%",
  //   marginLeft: "5%",
  // },
  about: {
    margin: theme.spacing(4),
    alignItems: "left",
    marginLeft: "10%",
  },
  content: {
    margin: theme.spacing(4),
    alignItems: "left",
    marginBottom: "10%",
    marginLeft: "10%",
  },
  skill: {
    margin: theme.spacing(4),
    marginBottom: "10%",
    marginTop: "10%",
    marginLeft: "10%",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function CenterProfile({ user }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const skillBadges = () => {
    return (
      <Hidden xsDown>
        {skills.map((skill) => (
          <SkillBadge key={skill.name} label={skill.name} />
        ))}
      </Hidden>
    );
  };
  const courseBadges = () => {
    return (
      <Hidden xsDown>
        {currentCourse.map((course) => (
          <CourseBadges key={course.name} label={course.name} />
        ))}
      </Hidden>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Overview" />
          <Tab label="Teams" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.about}>
          <Typography
            variant="h5" component="h2"
            style={{ fontWeight: "bold" }}
          >
            About
          </Typography>
        </div>
        <div className={classes.content}>
          <Typography value={value}
          >
            {user.description}
          </Typography>
        </div>
        <hr />
        <div className={classes.about}>
          <Typography
            variant="h5" component="h2"
            style={{ fontWeight: "bold" }}
          >
            Skill
          </Typography>
        </div>
        <div className={classes.content}>
          <Hidden xsDown>
            {/* desktop */}
            {user.skills
              ? user.skills.map((skill, idx) => {
                  if (idx < 4) {
                    return <SkillBadge key={skill.name} label={skill.name} />;
                  }
                })
              : null}
          </Hidden>
        </div>
        <hr />
        <div className={classes.about}>
          <Typography
            variant="h5" component="h2"
            style={{ fontWeight: "bold" }}
          >
            Current Courses
          </Typography>
        </div>
        <div className={classes.content}>
          <Hidden xsDown>
            {/* desktop */}
            {user.currentCourse
              ? user.currentCourse.map((course, idx) => {
                  if (idx < 4) {
                    return (
                      <CourseBadge
                        key={course.name}
                        label={course.name}
                      />
                    );
                  }
                })
              : null}
          </Hidden>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
}
