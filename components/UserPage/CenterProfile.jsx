//* Components import
import MyPost from "./MyPost";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Hidden } from "@material-ui/core";
import { useRouter } from "next/router";

//*Styling import
import SkillBadge from "../common/SkillBadge";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(2),
        // backgroundColor: "red",
        background:
            "linear-gradient(to right bottom, rgba(225,225,225,0.8),rgba(255,255,255,0.5))",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.2rem",
        borderRadius: "2rem",
        marginBottom: "2rem",
        backdropFilter: "blur(2rem)",
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
        fontSize: "18px",
        fontWeight: "450",
        padding: "0.5rem",
        background: "linear-gradient(to right top, #65DFC9,#6CDBEB)",
    },
    reviewer_avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        flex: "10%",
    },
    feedback: {
        display: "flex",

        marginLeft: "3%",
        marginTop: "3%",
    },
    feedback_content: {
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

export default function CenterProfile({ user, feedback }) {
    const classes = useStyles();
    const router = useRouter();
    const [value, setValue] = React.useState(
        router.query.viewPosts ? parseInt(router.query.viewPosts, 10) : 0
    );
    const [posts, setPosts] = useState([]);
    var numberOfRecommended = feedback.feedbacks.filter(
        (feedback) => feedback.isRecommended == true
    ).length;
    useEffect(() => {
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/users/${user._id}/posts`
            )
            .then((res) => setPosts(res.data.data.posts))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        ABOUT
                    </Typography>
                </div>
                <div
                    className={classes.about}
                    style={{ paddingBottom: "1rem" }}
                >
                    <Typography
                        style={{
                            fontSize: "18px",
                            fontWeight: "400",
                        }}
                        value={value}
                    >
                        {user.description}
                    </Typography>
                </div>
            </div>
            <div className={classes.card}>
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold", fontSize: "22px" }}
                    >
                        SKILLS
                    </Typography>
                </div>
                <div
                    className={classes.about}
                    style={{ paddingBottom: "1rem" }}
                >
                    {user.skills
                        ? user.skills.map((skill, idx) => {
                              if (idx < 4) {
                                  return (
                                      <Chip
                                          className={classes.chipTest}
                                          clickable
                                          label={skill.name}
                                      />
                                  );
                              }
                          })
                        : null}
                </div>
            </div>

            <div className={classes.card}>
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold", fontSize: "22px" }}
                    >
                        CURRENT COURSES
                    </Typography>
                </div>
                <div
                    className={classes.about}
                    style={{ paddingBottom: "1rem" }}
                >
                    {user.currentCourses
                        ? user.currentCourses.map((course, idx) => {
                              if (idx < 4) {
                                  return (
                                      <Chip
                                          className={classes.chipTest}
                                          icon={<MenuBookIcon />}
                                          label={course.name}
                                          clickable
                                      />
                                  );
                              }
                          })
                        : null}
                </div>
            </div>

            <div className={classes.card}>
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold", fontSize: "22px" }}
                    >
                        MY POST
                    </Typography>
                </div>
                <div
                    className={classes.about}
                    style={{ paddingBottom: "1rem" }}
                >
                    <MyPost userId={user._id} />
                </div>
            </div>
            <div>
                <div style={{ marginBottom: "3px" }}>
                    {/* <UserFeedback id={user.id} /> */}
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
                                        color: "cornflowerblue",
                                    }}
                                />
                            </Typography>
                        </div>
                    </div>
                </div>
                <div>
                    <List style={{ marginLeft: "2%" }}>
                        {feedback.reviewers
                            ? feedback.reviewers.map((reviewer) => {
                                  return (
                                      <div>
                                          {reviewer.isAnonymous == false ? (
                                              <React.Fragment>
                                                  <ListItem>
                                                      <ListItemAvatar>
                                                          <Avatar
                                                              alt="avatar"
                                                              src={
                                                                  reviewer.image
                                                              }
                                                          />
                                                      </ListItemAvatar>
                                                      <ListItemText
                                                          primary={
                                                              <React.Fragment>
                                                                  <Typography
                                                                      variant="body1"
                                                                      style={{
                                                                          fontWeight:
                                                                              "bold",
                                                                      }}
                                                                  >
                                                                      {
                                                                          reviewer.name
                                                                      }
                                                                      {reviewer.isRecommended ==
                                                                      true ? (
                                                                          <ThumbUpIcon
                                                                              fontSize="inherit"
                                                                              style={{
                                                                                  marginLeft:
                                                                                      "10px",
                                                                                  color:
                                                                                      "cornflowerblue",
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
                                                              </React.Fragment>
                                                          }
                                                          secondary={
                                                              <React.Fragment>
                                                                  <Typography
                                                                      style={{
                                                                          fontWeight:
                                                                              "500",
                                                                      }}
                                                                  >
                                                                      {
                                                                          reviewer.comment
                                                                      }
                                                                  </Typography>
                                                              </React.Fragment>
                                                          }
                                                      />
                                                  </ListItem>
                                                  <Divider variant="middle" />
                                              </React.Fragment>
                                          ) : (
                                              <React.Fragment>
                                                  <ListItem>
                                                      <ListItemAvatar>
                                                          <Avatar
                                                              alt="avatar"
                                                              src="https://i.stack.imgur.com/QBuke.gif"
                                                          />
                                                      </ListItemAvatar>
                                                      <ListItemText
                                                          primary={
                                                              <React.Fragment>
                                                                  <Typography
                                                                      variant="body1"
                                                                      style={{
                                                                          fontWeight:
                                                                              "bold",
                                                                      }}
                                                                  >
                                                                      Anonymous
                                                                      User
                                                                      {reviewer.isRecommended ==
                                                                      true ? (
                                                                          <ThumbUpIcon
                                                                              fontSize="inherit"
                                                                              style={{
                                                                                  marginLeft:
                                                                                      "10px",
                                                                                  color:
                                                                                      "deepskyblue",
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
                                                              </React.Fragment>
                                                          }
                                                          secondary={
                                                              <React.Fragment>
                                                                  <Typography
                                                                      style={{
                                                                          fontWeight:
                                                                              "500",
                                                                      }}
                                                                  >
                                                                      {
                                                                          reviewer.comment
                                                                      }
                                                                  </Typography>
                                                              </React.Fragment>
                                                          }
                                                      />
                                                  </ListItem>
                                                  <Divider variant="middle" />
                                              </React.Fragment>
                                          )}
                                      </div>
                                  );
                              })
                            : null}
                    </List>
                </div>
            </div>
        </div>
    );
}
