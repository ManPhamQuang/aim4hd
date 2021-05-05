import React, { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import AuthContext from "../../utils/authContext";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";
import NotiCard from "./NotiCard";
import { withSnackbar } from "notistack";
import {
    AppBar,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Hidden,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CloseIcon from "@material-ui/icons/Close";
const endpoint = "https://aim4hd-backend.herokuapp.com/";

const useStyles = makeStyles((theme) => ({
    dropdown: {
        padding: "5px",
        position: "absolute",
        width: "360px",
        height: "300px",
        overflowY: "auto",
        top: "100%",
        right: 0,
        zIndex: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)",

        borderRadius: "0.3rem",
        "&::-webkit-scrollbar": {
            width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            borderRadius: "2rem",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: "2rem",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0,0,0,.5)",
        },
    },
    grow: {
        flexGrow: "1",
    },
    bar: {
        boxShadow: "none",
    },
    heading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "black",
    },
    root: {
        maxWidth: 345,
    },
    topList: {
        width: "auto",
        height: "55vh",
    },

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
    avatar: {
        backgroundColor: red[500],
    },
    notiIcon: {
        color: "#4395FF",
    },
    menu: {
        marginTop: "48px",
        marginLeft: "-80px",
    },
}));

function Notification({ user, enqueueSnackbar }) {
    const [notis, setNotis] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const optionsOpen = Boolean(anchorEl);
    const [openNotiDrawer, setOpenNotiDrawer] = React.useState(false);
    const [roomIds, setRoomIds] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/chatroom/${user._id}`
            )
            .then((res) => setRoomIds(res.data.rooms.map((room) => room._id)))
            .catch((err) =>
                enqueueSnackbar(err.message, {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    TransitionComponent: Slide,
                    autoHideDuration: 4000,
                })
            );
    }, []);

    useEffect(() => {
        if (roomIds !== null) {
            console.log("mounting");
            const socket = io(endpoint);
            socket.emit("room ids", roomIds);
            socket.emit("getNotification", { id: user._id });
            socket.on(
                "new message",
                ({ message }) => {
                    enqueueSnackbar(message.message.messageText, {
                        variant: "success",
                    });
                },
                []
            );
            socket.on(
                "notifications",
                ({ notifications }) => {
                    setNotis(notifications);
                },
                []
            );
            socket.on("newNoti", (data) => {
                setNotis((res) => [data, ...res]);
                console.log(data);
                enqueueSnackbar(data.content, {
                    variant: "info",
                });
            });
        }
        // clean up when unmount
        // return () => io.
    }, [roomIds]);

    const iconClass = clsx({
        [classes.notiIcon]: open,
    });

    const onClickAway = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const markAllNotiRead = () => {
        handleClose();
        axios
            .patch(
                "https://aim4hd-backend.herokuapp.com/api/v1/notification/readAll",
                {
                    userId: user._id,
                }
            )
            .then((res) => {
                if (res.data.status) {
                    setNotis(res.data.data.notifications);
                }
                enqueueSnackbar(res.data.message, {
                    variant: res.data.status ? "success" : "info",
                });
            })
            .catch((err) => console.log(err));
    };

    const handleNotiDrawerOpen = () => {
        setOpenNotiDrawer(true);
    };

    const handleNotiDrawerClose = () => {
        setOpenNotiDrawer(false);
    };

    return (
        <>
            <Hidden smDown>
                <ClickAwayListener onClickAway={onClickAway}>
                    <div>
                        <IconButton onClick={() => setOpen(!open)}>
                            <Badge
                                badgeContent={
                                    notis.filter((noti) => noti.read === false)
                                        .length
                                }
                                color="primary"
                            >
                                <NotificationsIcon className={iconClass} />
                            </Badge>
                        </IconButton>
                        {open && (
                            <Paper
                                className={classes.dropdown}
                                variant="outlined"
                            >
                                <AppBar
                                    className={classes.bar}
                                    position="static"
                                    color="transparent"
                                >
                                    <Toolbar disableGutters>
                                        <Typography
                                            variant="h5"
                                            className={classes.title}
                                            style={{ paddingLeft: "10px" }}
                                        >
                                            Notifications
                                        </Typography>
                                        <div className={classes.grow} />
                                        <IconButton onClick={handleClick}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={optionsOpen}
                                            onClose={handleClose}
                                            className={classes.menu}
                                        >
                                            <MenuItem onClick={markAllNotiRead}>
                                                Mark all as read
                                            </MenuItem>
                                        </Menu>
                                    </Toolbar>
                                </AppBar>
                                <Divider style={{ marginBottom: "1rem" }} />
                                {notis.map((noti) => (
                                    <NotiCard noti={noti} key={noti._id} />
                                ))}
                            </Paper>
                        )}
                    </div>
                </ClickAwayListener>
            </Hidden>
            <Hidden mdUp>
                <React.Fragment>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleNotiDrawerOpen}
                    >
                        <Badge
                            badgeContent={
                                notis.filter((noti) => noti.read === false)
                                    .length
                            }
                            color="primary"
                        >
                            <NotificationsIcon style={{ color: "#707070" }} />
                        </Badge>
                    </IconButton>

                    <SwipeableDrawer
                        anchor="top"
                        open={openNotiDrawer}
                        onClose={handleNotiDrawerClose}
                        onOpen={handleNotiDrawerOpen}
                        className={classes.notiDrawer}
                    >
                        <div className={classes.topList}>
                            <AppBar
                                className={classes.bar}
                                position="static"
                                color="transparent"
                            >
                                <Toolbar disableGutters>
                                    <Typography
                                        variant="h5"
                                        className={classes.title}
                                        style={{ paddingLeft: "10px" }}
                                    >
                                        Notifications
                                    </Typography>
                                    <div className={classes.grow} />
                                    <IconButton onClick={handleClick}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={optionsOpen}
                                        onClose={handleClose}
                                        className={classes.menu}
                                    >
                                        <MenuItem onClick={markAllNotiRead}>
                                            Mark all as read
                                        </MenuItem>
                                    </Menu>
                                    <IconButton onClick={handleNotiDrawerClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                            <Divider style={{ marginBottom: "1rem" }} />
                            {notis.map((noti) => (
                                <NotiCard noti={noti} key={noti._id} />
                            ))}
                            {/* <Notification/>
                                    {auth.user && (
                                        <Notification user={auth.user} />
                                    )} */}
                        </div>
                    </SwipeableDrawer>
                </React.Fragment>
            </Hidden>
        </>
    );
}

export default withSnackbar(Notification);
