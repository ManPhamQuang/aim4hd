//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Hidden } from "@material-ui/core";
import SkillBadge from "./SkillBadge";
import CourseBadge from "./CourseBadge";
import Chip from "@material-ui/core/Chip";
//*Styling import
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { BiHeart } from 'react-icons/fa';
const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(2),
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px",
        borderRadius: "0px 0px 8px 8px",
    },
    about: {
        marginLeft: "4%",
        marginTop: "3%",
        marginRight: "20px",
    },
    content: {
        marginLeft: "4%",
        marginTop: "3%",
        marginBottom: "5%",
    },
    skill: {
        marginLeft: "4%",
        marginTop: "3%",
    },
    Box: {
        paddingBottom: "4px",
        borderRadius: "0px 0px 30px 30px",
    },
    chipTest: {
        marginRight: "3%",
        marginBottom: "3%",
    },
    reviewer_avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        flex: "10%",
        // marginLeft: "5%",
    },
    feedback: {
        display: "flex",
        // alignItems: "center",
        // marginBottom: "5%",
        marginLeft: "3%",
        marginTop: "3%",
    },
    feedback_content: {
        // justifyContent: "center",
        flex: "50%",
        marginBottom: "15px",
    },
    viewer_name: {
        justifyContent: "center",
        flex: "20%",
        marginLeft: "5%",
    },
    review: {
        display: "flex",
        marginLeft: "4%",
        marginTop: "3%",
    },
}));

const Accordion = withStyles({
    root: {
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
        "&$expanded": {
            margin: "auto",
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: "rgba(0, 0, 0, .03)",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56,
        },
    },
    content: {
        "&$expanded": {
            margin: "12px 0",
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme2) => ({
    root: {
        padding: theme2.spacing(2),
    },
}))(MuiAccordionDetails);

export default function CenterProfile({ user, feedback }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange2 = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                    <Box p={false} className={classes.Box}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

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
    const ColorLine = ({ color }) => (
        <hr
            style={{
                borderStyle: "none",
                backgroundColor: "#f2f2f2",
                height: 4,
                width: "100%",
            }}
        />
    );

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xffffff);
        let color = "#" + hex.toString(16);

        return color;
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Overview" />
                    <Tab label="Groups" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold" }}
                    >
                        About
                    </Typography>
                </div>
                <div className={classes.content}>
                    <Typography value={value}>{user.description}</Typography>
                </div>
                <ColorLine color="gray[900]" />
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold" }}
                    >
                        Skill
                    </Typography>
                </div>
                <div className={classes.content}>
                    {/* desktop */}
                    {user.skills
                        ? user.skills.map((skill, idx) => {
                              if (idx < 4) {
                                  return (
                                      <Chip
                                          className={classes.chipTest}
                                          icon={<FavoriteIcon />}
                                          clickable
                                          label={skill.name}
                                          // color="primary"
                                          // style={{ backgroundColor: randomColor() }}
                                      />
                                  );
                              }
                          })
                        : null}
                </div>
                <ColorLine color="gray[900]" />
                <div style={{ marginBottom: "3px" }}>
                    <div className={classes.about}>
                        <Typography
                            variant="h5"
                            component="h2"
                            style={{ fontWeight: "bold" }}
                        >
                            Current Courses
                        </Typography>
                    </div>
                    <div className={classes.content}>
                        {/* desktop */}
                        {user.currentCourses
                            ? user.currentCourses.map((course, idx) => {
                                  if (idx < 4) {
                                      return (
                                          <Chip
                                              className={classes.chipTest}
                                              icon={<MenuBookIcon />}
                                              label={course.name}
                                              // color="primary"
                                              clickable
                                              // style={{ backgroundColor: randomColor() }}
                                          />
                                      );
                                  }
                              })
                            : null}
                    </div>
                </div>
                <ColorLine color="gray[900]" />

                <div style={{ marginBottom: "3px" }}>
                    <div className={classes.review}>
                        <div>
                            <Typography
                                className={classes.about}
                                variant="h5"
                                component="h2"
                                style={{ fontWeight: "bold" }}
                            >
                                Reviews
                            </Typography>
                        </div>

                        <div>
                            <Typography
                                variant="h6"
                                fontWeight="fontWeightLight"
                                style={{ marginTop: "5px" }}
                            >
                                {feedback.numberOfRecommended}
                                <ThumbUpIcon
                                    fontSize="inherit"
                                    style={{
                                        marginLeft: "5px",
                                        fill: "#d6072b",
                                    }}
                                />
                            </Typography>
                        </div>
                    </div>
                </div>
                {/* <div className={classes.feedback}>
                    <div>
                        <Avatar
                            className={classes.reviewer_avatar}
                            alt="avatar"
                            src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"
                        />
                    </div>

                    <div className={classes.viewer_name}>
                        <Typography
                            variant="body1"
                            style={{ fontWeight: "bold" }}
                        >
                            Pham Quang Man
                            <FavoriteIcon
                                fontSize="inherit"
                                style={{ marginLeft: "10px", fill: "#d6072b" }}
                            />
                        </Typography>

                        <div className={classes.feedback_content}>
                            This guy working really hard. Highly recommend.
                        </div>
                    </div>
                </div> */}

                <div className={classes.feedback}>
                    <div>
                        {feedback.reviewers
                            ? feedback.reviewers.map((reviewer) => {
                                  return (
                                      <div>
                                          {reviewer.isAnonymous == false ? (
                                              <Avatar
                                                  className={
                                                      classes.reviewer_avatar
                                                  }
                                                  alt="avatar"
                                                  src={reviewer.image}
                                              />
                                          ) : (
                                              <Avatar
                                                  className={
                                                      classes.reviewer_avatar
                                                  }
                                                  alt="avatar"
                                                  src="https://i.stack.imgur.com/QBuke.gif"
                                              />
                                          )}
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                    <div className={classes.viewer_name}>
                        {feedback.reviewers
                            ? feedback.reviewers.map((reviewer) => {
                                  return (
                                      <div>
                                          <div>
                                              <div>
                                                  {reviewer.isAnonymous ==
                                                  true ? (
                                                      <Typography
                                                          variant="body1"
                                                          style={{
                                                              fontWeight:
                                                                  "bold",
                                                          }}
                                                      >
                                                          Anonymous User
                                                          {reviewer.isRecommended ==
                                                          true ? (
                                                              <ThumbUpIcon
                                                                  fontSize="inherit"
                                                                  style={{
                                                                      marginLeft:
                                                                          "10px",
                                                                      fill:
                                                                          "#d6072b",
                                                                  }}
                                                              />
                                                          ) : (
                                                              <ThumbDownIcon
                                                                  fontSize="inherit"
                                                                  style={{
                                                                      marginLeft:
                                                                          "10px",
                                                                      fill:
                                                                          "#d6072b",
                                                                  }}
                                                              />
                                                          )}
                                                      </Typography>
                                                  ) : (
                                                      <Typography
                                                          variant="body1"
                                                          style={{
                                                              fontWeight:
                                                                  "bold",
                                                          }}
                                                      >
                                                          {reviewer.name}
                                                          {reviewer.isRecommended ==
                                                          true ? (
                                                              <ThumbUpIcon
                                                                  fontSize="inherit"
                                                                  style={{
                                                                      marginLeft:
                                                                          "10px",
                                                                      fill:
                                                                          "#d6072b",
                                                                  }}
                                                              />
                                                          ) : (
                                                              <ThumbDownIcon
                                                                  fontSize="inherit"
                                                                  style={{
                                                                      marginLeft:
                                                                          "10px",
                                                                      fill:
                                                                          "#d6072b",
                                                                  }}
                                                              />
                                                          )}
                                                      </Typography>
                                                  )}
                                                  <div
                                                      className={
                                                          classes.feedback_content
                                                      }
                                                  >
                                                      <Typography>
                                                          {reviewer.comment}
                                                      </Typography>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <div>
                    {user.groups
                        ? user.groups.map((group) => {
                              return (
                                  <Accordion
                                      square
                                      expanded={expanded === group.id}
                                      onChange={handleChange2(group.id)}
                                  >
                                      <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls={group.id + "-content"}
                                          id={group.id + "-header"}
                                      >
                                          <Typography>
                                              {group.course.name}
                                          </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                          {group.members
                                              ? group.members.map((member) => {
                                                    return (
                                                        <Chip
                                                            className={
                                                                classes.chipTest
                                                            }
                                                            label={member.name}
                                                            clickable
                                                            avatar={
                                                                <Avatar
                                                                    src={
                                                                        member.avatar
                                                                    }
                                                                />
                                                            }
                                                        />
                                                    );
                                                })
                                              : null}
                                      </AccordionDetails>
                                  </Accordion>
                              );
                          })
                        : null}
                </div>
            </TabPanel>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Overview" />
                    <Tab label="Groups" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold" }}
                    >
                        About
                    </Typography>
                </div>
                <div className={classes.content}>
                    <Typography value={value}>{user.description}</Typography>
                </div>
                <ColorLine color="gray[900]" />
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold" }}
                    >
                        Skill
                    </Typography>
                </div>
                <div className={classes.content}>
                    {/* desktop */}
                    {user.skills
                        ? user.skills.map((skill, idx) => {
                              if (idx < 4) {
                                  return (
                                      <Chip
                                          className={classes.chipTest}
                                          icon={<FavoriteIcon />}
                                          clickable
                                          label={skill.name}
                                          // color="primary"
                                          // style={{ backgroundColor: randomColor() }}
                                      />
                                  );
                              }
                          })
                        : null}
                </div>
                <ColorLine color="gray[900]" />
                <div style={{ marginBottom: "3px" }}>
                    <div className={classes.about}>
                        <Typography
                            variant="h5"
                            component="h2"
                            style={{ fontWeight: "bold" }}
                        >
                            Current Courses
                        </Typography>
                    </div>
                    <div className={classes.content}>
                        {/* desktop */}
                        {user.currentCourses
                            ? user.currentCourses.map((course, idx) => {
                                  if (idx < 4) {
                                      return (
                                          <Chip
                                              className={classes.chipTest}
                                              icon={<MenuBookIcon />}
                                              label={course.name}
                                              // color="primary"
                                              clickable
                                              // style={{ backgroundColor: randomColor() }}
                                          />
                                      );
                                  }
                              })
                            : null}
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                    {user.groups
                        ? user.groups.map((group) => {
                              return (
                                  <Accordion>
                                      <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls={group.id + "-content"}
                                          id={group.id + "-header"}
                                      >
                                          <Typography variant="h6">
                                              {group.course.name}
                                          </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                          {group.members
                                              ? group.members.map((member) => {
                                                    return (
                                                        <Chip
                                                            className={
                                                                classes.chipTest
                                                            }
                                                            label={member.name}
                                                            clickable
                                                            avatar={
                                                                <Avatar
                                                                    src={
                                                                        member.avatar
                                                                    }
                                                                />
                                                            }
                                                        />
                                                    );
                                                })
                                              : null}
                                      </AccordionDetails>
                                  </Accordion>
                              );
                          })
                        : null}
                </div>
            </TabPanel>
        </div>
    );
}
