import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        // backgroundColor: theme.background.main,
        background: "transparent",
        boxShadow: "none",
        color: "black",
    },
    button: {
        minWidth: "100px",
        marginLeft: "10px",
    },
    login: {
        width: "150px",
        marginLeft: "10px",
    },
}));

export default function DesktopHeader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Grid container direction="row">
                    <Grid item xs={0} sm={1} />
                    <Grid item xs={12} sm={10} className={classes.content}>
                        <Toolbar disableGutters spacing={3}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                News
                            </Typography>
                            <Button className={classes.button} color="inherit">
                                Home
                            </Button>
                            <Button className={classes.button} color="inherit">
                                About
                            </Button>
                            <Button className={classes.button} color="inherit">
                                Profile
                            </Button>
                            <Button className={classes.login} color="inherit">
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                className={classes.login}
                            >
                                Sign Up
                            </Button>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={0} sm={1} />
                </Grid>
            </AppBar>
        </div>
    );
}
