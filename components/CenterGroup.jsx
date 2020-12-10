//* Components import
import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Hidden } from "@material-ui/core";
import MemberBadge from "./MemberBadge";
import CourseBadge from "./CourseBadge";

//*Styling import
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(2),
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px",
        borderRadius: "0px 0px 8px 8px",
    },
    header: {
        marginLeft: "4%",
        marginTop: "3%",
    },
    content: {
        marginLeft: "4%",
        marginTop: "3%",
        marginBottom: "5%",
    },
}));

export default function CenterGroup({ team }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const memberBadges = () => {
        return (
            <Hidden xsDown>
                {team.members.map((name) => (
                    <MemberBadge key={members.name} label={members.name} />
                ))}
            </Hidden>
        );
    };
    const courseBadges = () => {
        return (
            <Hidden xsDown>
                {team.courses.map((course) => (
                    <CourseBadges key={courses.name} label={courses.name} />
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

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography
                    variant="h5"
                    component="h2"
                    style={{ fontWeight: "bold" }}
                >
                    Description
                </Typography>
            </div>
            <div className={classes.content}>
                {/* <Typography value={value}>{user.description}</Typography> */}
                <Typography value={value}>{team.description}</Typography>
            </div>
            <ColorLine color="gray[900]" />
            <div className={classes.header}>
                <Typography
                    variant="h5"
                    component="h2"
                    style={{ fontWeight: "bold" }}
                >
                    Member
                </Typography>
            </div>
            <div className={classes.content}>
                {/* desktop */}
                {team.members.names
                    ? team.members.names.map((name, idx) => {
                          if (idx < 4) {
                              return (
                                  <MemberBadge
                                      key={team.members.name}
                                      label={team.members.name}
                                  />
                              );
                          }
                      })
                    : null}
            </div>
            <ColorLine color="gray[900]" />
            <div style={{ marginBottom: "3px" }}>
                <div className={classes.header}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold" }}
                    >
                        Courses
                    </Typography>
                </div>
                <div className={classes.content}>
                    {/* desktop */}
                    {team.courses
                        ? team.courses.map((course, idx) => {
                              if (idx < 4) {
                                  return (
                                      <CourseBadge
                                          key={course}
                                          label={course}
                                      />
                                  );
                              }
                          })
                        : null}
                </div>
            </div>
        </div>
    );
}
