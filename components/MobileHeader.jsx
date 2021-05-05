import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import NotificationsIcon from "@material-ui/icons/Notifications";
import io, { Socket } from "socket.io-client";
import {
    Grid,
    Avatar,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Popper,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useContext } from "react";
import AuthContext from "../utils/authContext";
import NoteIcon from "@material-ui/icons/Note";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import LoadingSpinner from "./common/LoadingSpinner";
import Image from "next/image";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotiCard from "./Notification/NotiCard";
import CloseIcon from "@material-ui/icons/Close";
import Badge from "@material-ui/core/Badge";

const MicrosoftLogin = dynamic(() => import("react-microsoft-login"), {
    ssr: false,
});
import { withSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    logoButton: {
        "&:hover": {
            cursor: "pointer",
        },
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: "48vw",
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    bar: {
        boxShadow: "none",
    },
    topList: {
        width: "auto",
        height: "55vh",
    },
}));

const endpoint = "https://aim4hd-backend.herokuapp.com/";

const checkIfUserHasAlreadyLoginWithMicrosoft = async (uniqueId) => {
    try {
        const response = await axios.post(
            "https://aim4hd-backend.herokuapp.com/api/v1/users/check",
            { microsoftUniqueId: uniqueId }
        );
        return {
            user: response.data.data.user,
            token: response.data.data.token,
        };
    } catch (error) {
        enqueueSnackbar(error.message, {
            variant: "warning",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            },
            autoHideDuration: 4000,
        });
    }
};

function MobileHeader({ enqueueSnackbar }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const auth = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openNotiDrawer, setOpenNotiDrawer] = React.useState(false);
    const [roomIds, setRoomIds] = useState(null);
    const [notis, setNotis] = useState([]);

    const handleNotiDrawerOpen = () => {
        setOpenNotiDrawer(true);
    };

    const handleNotiDrawerClose = () => {
        setOpenNotiDrawer(false);
    };

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    useEffect(() => {
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/chatroom/${auth.user._id}`
            )
            .then((res) => setRoomIds(res.data.rooms.map((room) => room._id)))
            .catch((err) =>
                enqueueSnackbar(err.message, {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    autoHideDuration: 4000,
                })
            );
    }, []);
    useEffect(() => {
        console.log("useEffect running");
        if (roomIds !== null) {
            console.log("socket running");
            console.log(roomIds);
            const socket = io(endpoint);
            socket.emit("room ids", roomIds);
            socket.emit("getNotification", { id: auth.user._id });
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
                enqueueSnackbar(data.content, {
                    variant: "info",
                });
            });
        }
        // clean up when unmount
        // return () => io.
    }, [roomIds]);

    const handleOnAuth = async (error, authData, msal) => {
        if (authData) {
            if (authData.account.userName.endsWith("@rmit.edu.vn")) {
                setIsLoading(true);
                const data = await checkIfUserHasAlreadyLoginWithMicrosoft(
                    authData.uniqueId
                );
                if (!data.user) {
                    auth.login("microsoftCheck", { authData });
                    setIsLoading(false);
                    return router.push("/sign-up");
                }
                setIsLoading(false);
                console.log(data);
                auth.login("login", data);
            } else {
            }
        }
    };

    const loginWithMicrosoft = (
        <MicrosoftLogin
            clientId="846fecbc-f462-4716-8d6f-1e7f0682b998"
            authCallback={(error, authData, msal) =>
                handleOnAuth(error, authData, msal)
            }
            prompt="select_account"
            redirectUri={
                process.env.NODE_ENV === "production"
                    ? "https://aim4hd.vercel.app/"
                    : "http://localhost:3000/"
            }
            children={
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.login}
                >
                    Login
                </Button>
            }
            buttonTheme="light_short"
        />
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="inherit">
                {isLoading && <LoadingSpinner isLoading={isLoading} />}
                <Toolbar>
                    <Link href="/">
                        <a>
                            <Image
                                className={classes.logoButton}
                                src="/logo.png"
                                alt="aim4hd - RMIT Logo"
                                width={40 * 3.14}
                                height={40}
                            />
                        </a>
                    </Link>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    ></Typography>
                    {!auth.user && loginWithMicrosoft}
                    {auth.user && (
                        <React.Fragment>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleNotiDrawerOpen}
                            >
                                <Badge
                                    badgeContent={notis.length}
                                    color="primary"
                                >
                                    <NotificationsIcon
                                        style={{ color: "#707070" }}
                                    />
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
                                            <IconButton>
                                                <MoreVertIcon />
                                                {/* TODO: add the mark all noti function as read here */}
                                            </IconButton>
                                            <IconButton
                                                onClick={handleNotiDrawerClose}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Toolbar>
                                    </AppBar>
                                    <Divider style={{ marginBottom: "1rem" }} />
                                    {notis.map((noti) => (
                                        <NotiCard noti={noti} key={noti._id} />
                                    ))}
                                </div>
                            </SwipeableDrawer>
                        </React.Fragment>
                    )}
                    {auth.user && (
                        <React.Fragment>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                            <SwipeableDrawer
                                anchor="right"
                                open={openDrawer}
                                onClose={handleDrawerClose}
                                onOpen={handleDrawerOpen}
                            >
                                <div className={classes.list}>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            style={{ paddingTop: "1rem" }}
                                        >
                                            <Button
                                                onClick={() =>
                                                    router.push(
                                                        `/users/${auth.user._id}`
                                                    )
                                                }
                                            >
                                                <Avatar
                                                    src={auth.user.avatar}
                                                    className={classes.avatar}
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid
                                            container
                                            style={{
                                                paddingTop: "0.75rem",
                                                textAlign: "center",
                                                justifyContent: "center",
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            <Typography
                                                style={{ fontSize: "18px" }}
                                                onClick={() =>
                                                    router.push(
                                                        `/users/${auth.user._id}`
                                                    )
                                                }
                                            >
                                                {auth.user.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider style={{ padding: "0.7px" }} />
                                    <List>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <NoteIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="My Post" />
                                        </ListItem>
                                        <ListItem
                                            button
                                            onClick={() => {
                                                router.push("/posting");
                                                setOpenDrawer(false);
                                            }}
                                        >
                                            <ListItemIcon>
                                                <PostAddIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Create Post" />
                                        </ListItem>
                                        <ListItem
                                            button
                                            onClick={() => {
                                                router.push("/profile");
                                                setOpenDrawer(false);
                                            }}
                                        >
                                            <ListItemIcon>
                                                <SettingsIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Edit Profile" />
                                        </ListItem>
                                        <ListItem button onClick={auth.logout}>
                                            <ListItemIcon>
                                                <ExitToAppIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Log Out" />
                                        </ListItem>
                                    </List>
                                </div>
                            </SwipeableDrawer>
                        </React.Fragment>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar style={{ height: "120px" }} />
        </div>
    );
}
export default withSnackbar(MobileHeader);
