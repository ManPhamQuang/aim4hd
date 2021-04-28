import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import CenterProfile from "./UserPage/CenterProfile";
import RightProfile from "./UserPage/RightProfile";
import MyAchievement from "./UserPage/MyAchievement";

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
                <div p={3}>
                    {children}
                </div>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#F2F2F2",
    },
    appbar: {
        backgroundColor: "#F2F2F2",
        color: "black",
        boxShadow: "none",
        paddingBottom: "1rem",
    },
    tab: {
        borderRadius: "2rem",
    },
}));

export default function MainUser({ user, feedback, history }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    indicatorColor="secondary"
                >
                    <Tab
                        className={classes.tab}
                        label="OVERVIEW"
                        {...a11yProps(0)}
                    />
                    <Tab
                        className={classes.tab}
                        label="MY ACHIEVEMENT"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Grid item xs={12} md={8}>
                        <CenterProfile user={user} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RightProfile user={user} feedback={feedback} />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MyAchievement user={user} />
            </TabPanel>
        </div>
    );
}
