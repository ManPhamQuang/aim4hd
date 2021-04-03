//* Components import
import MyPost from "./MyPost";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Hidden } from "@material-ui/core";
import { useRouter } from "next/router";

//*Styling import
import SkillBadge from "../common/SkillBadge";
import Chip from "@material-ui/core/Chip";
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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";

// import UserFeedback from "./UserFeedback";

const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(2),
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        borderRadius: "0px 0px 8px 8px",
    },
    about: {
        marginLeft: "4%",
        marginTop: "3%",
        marginRight: "20px",
    },
    content: {
        marginLeft: "4%",
        marginRight: "4%",
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
        flexWrap: "wrap",
    },
}))(MuiAccordionDetails);

export default function CenterProfile({ user, feedback }) {
    const classes = useStyles();
    const router = useRouter();
    const [value, setValue] = React.useState(
        router.query.viewPosts ? parseInt(router.query.viewPosts, 10) : 0
    );
    const [expanded, setExpanded] = React.useState(false);
    const [posts, setPosts] = useState([]);
    var numberOfRecommended = feedback.feedbacks.filter(
        (feedback) => feedback.isRecommended == true
    ).length;
    useEffect(() => {
        axios
            .get(`https://aim4hd-backend.herokuapp.com/api/v1/users/${user._id}/posts`)
            .then((res) => setPosts(res.data.data.posts))
            .catch((err) => console.log(err));
    }, []);

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
                    <Tab label="Posts" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold" }}
                    >
                        ABOUT
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
                        SKILLS
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
                    {/* <UserFeedback id={user.id} /> */}
                    <Divider variant="middle" />
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
                                {numberOfRecommended}
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
                        {feedback.feedbacks
                            ? feedback.feedbacks.map((reviewer) => {
                                  return (
                                      <div>
                                          {reviewer.isAnonymous == false ? (
                                              <React.Fragment>
                                                  <ListItem>
                                                      <ListItemAvatar>
                                                          <Avatar
                                                              alt="avatar"
                                                              src={
                                                                  reviewer
                                                                      .author
                                                                      .avatar
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
                                                                          reviewer
                                                                              .author
                                                                              .name
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
            </TabPanel>

            <TabPanel value={value} index={1}>
                <div>
                    {posts
                        ? posts.map((group) => {
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
                                          <Typography
                                              style={{ fontWeight: "bold" }}
                                          >
                                              {group.course
                                                  ? group.course.name
                                                  : "Unnamed Group"}
                                          </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                          {group.approvedMembers
                                              ? group.approvedMembers.map(
                                                    (member) => {
                                                        return (
                                                            <Chip
                                                                className={
                                                                    classes.chipTest
                                                                }
                                                                label={
                                                                    member.name
                                                                }
                                                                style={{
                                                                    fontSize:
                                                                        "100%",
                                                                }}
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
                                                    }
                                                )
                                              : null}
                                      </AccordionDetails>
                                  </Accordion>
                              );
                          })
                        : null}
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MyPost userId={user._id} />
            </TabPanel>
        </div>
    );
}
