import React from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Avatar, Container, Grid, CardHeader } from "@material-ui/core";
import Link from "next/link";
import { withSnackbar } from "notistack";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#FFFFFF",
        // minHeight: 90,
        // maxHeight: 90,
        marginTop: "1rem",
        boxShadow: "none",
        "&:hover": {
            boxShadow: "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
        },
        borderRadius: "1rem",
        width: "100%",
    },
    cardHeaderRoot: {
        [theme.breakpoints.down("md")]: {
            padding: "8px !important",
        },
    },

    cover: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        [theme.breakpoints.down("md")]: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
        borderRadius: "7px",
        // width: "100%",
        // height: "100%",
        objectFit: "cover",
    },
    hover: {
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    // icon: {
    //     marginLeft: "1rem",
    //     color: "gray",
    // },

    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    action: {
        alignSelf: "center",
    },
    outsideDiv: {
        border: "1px solid black",
        borderRadius: "1rem",
        padding: "1rem",
    },
    chipTest: {
        marginRight: "0.5rem",
        overflow: "hidden",
        marginBottom: "1rem",
    },
}));

export default function UserCard({ user }) {
    const { avatar, major, school, name, description } = user;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    classes={{
                        root: classes.cardHeaderRoot,
                        action: classes.action,
                    }}
                    avatar={<Avatar src={avatar} className={classes.cover} />}
                    title={
                        <Link href={`/users/${user._id}`}>
                            <a className={classes.hover}>{name}</a>
                        </Link>
                    }
                    titleTypographyProps={{
                        variant: "h6",
                        align: "left",
                    }}
                    subheader={`${school} - ${major}`}
                    subheaderTypographyProps={{
                        align: "left",
                        variant: "body1",
                    }}
                />
                <CardContent>
                    <Typography
                        variant="body1"
                        style={{
                            marginBottom: "0.5rem",
                            fontWeight: "500",
                        }}
                    >
                        {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <div className={classes.outsideDiv}>
                            <div>
                                <Typography
                                    variant="body1"
                                    style={{
                                        marginBottom: "0.5rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Skills
                                </Typography>
                            </div>
                            <div>
                                {user.skills
                                    ? user.skills.map((skill, idx) => {
                                          return (
                                              <Chip
                                                  key={idx}
                                                  className={classes.chipTest}
                                                  clickable
                                                  label={skill.name}
                                              />
                                          );
                                      })
                                    : null}
                            </div>
                            <Divider variant="middle" />
                            <div>
                                <Typography
                                    variant="body1"
                                    style={{
                                        marginBottom: "0.5rem",
                                        fontWeight: "500",
                                        marginTop: "0.5rem",
                                    }}
                                >
                                    Current Courses
                                </Typography>
                            </div>
                            <div>
                                {user.currentCourses
                                    ? user.currentCourses.map((course, idx) => {
                                          return (
                                              <Chip
                                                  key={idx}
                                                  className={classes.chipTest}
                                                  label={course.name}
                                                  clickable
                                              />
                                          );
                                      })
                                    : null}
                            </div>
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
