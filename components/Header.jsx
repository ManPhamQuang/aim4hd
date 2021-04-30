import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
    Grid,
    Avatar,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Popper,
} from "@material-ui/core";
import { useContext } from "react";
import AuthContext from "../utils/authContext";
import axios from "axios";
import LoadingSpinner from "./common/LoadingSpinner";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Image from "next/image";
import Notification from "./Notification/Notification";
const MicrosoftLogin = dynamic(() => import("react-microsoft-login"), {
    ssr: false,
});
import { withSnackbar } from "notistack";

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 3 : 0,
        color: trigger ? "#ffffff" : "transparent",
    });
}

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
        // background: "transparent",
        // boxShadow: "none",
        // backgroundColor: "#fff",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    toolbar: {
        height: "80px",
        [theme.breakpoints.down("sm")]: {
            padding: "0px",
        },
    },
    button: {
        minWidth: "100px",
        marginLeft: "10px",
        position: "relative",
        fontSize: "13px",
        fontWeight: "700",
        height: "70%",
        "&:hover": {
            borderRadius: "0px",
            background: "transparent",
            borderBottomColor: theme.palette.primary.main,
            borderWidth: "3px",
            borderBottomStyle: "solid",
        },
    },
    login: {
        width: "150px",
        [theme.breakpoints.down("sm")]: {
            width: "100px",
        },
        marginLeft: "10px",
    },
    avatar: {
        marginRight: "5px",
    },
    dropdown: {
        position: "absolute",
        width: "290px",
        top: "100%",
        right: 0,
        zIndex: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)",
    },
    card: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "#3c3b37",
        padding: "8px",
        paddingLeft: "10px",
        transition: "all 0.3s",
        borderBottom: "1px solid #dcdacb",
        "&:hover": {
            color: "#ca3028",
        },
    },
    cardHead: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "5px",
        alignItems: "start",
    },
    avatarLink: {
        width: "64px",
        height: "64px",
    },
    cardBody: {
        padding: "8px",
    },
    cardBodyLink: {
        textTransform: "none",
        width: "100%",
        display: "inline-block",
        textDecoration: "none",
        textAlign: "left",
        color: "#3c3b37",
        padding: "8px 16px",
        fontWeight: "400",
        fontSize: "13px",
        transition: "all 0.3s",
        "&:hover": {
            color: "#ca3028",
        },
        "&:last-child": {
            borderBottom: "1px solid #dcdacb",
        },
    },
    logoButton: {
        "&:hover": {
            cursor: "pointer",
        },
    },
}));

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
            TransitionComponent: Slide,
            autoHideDuration: 4000,
        });
    }
};

function DesktopHeader(props, enqueueSnackbar) {
    const classes = useStyles();
    const router = useRouter();
    const auth = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const openMenu = Boolean(anchorEl);
    const id = openMenu ? "simple-popper" : undefined;

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

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
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
            {/* <ElevationScroll {...props}> */}
            <AppBar className={classes.appbar} position="fixed" color="inherit">
                {isLoading && <LoadingSpinner isLoading={isLoading} />}

                <Toolbar className={classes.toolbar} spacing={3}>
                    <Link href="/">
                        <a>
                            <Image
                                className={classes.logoButton}
                                src="/logo.png"
                                alt="aim4hd - RMIT Logo"
                                width={50 * 3.14}
                                height={50}
                            />
                        </a>
                    </Link>

                    <Typography
                        variant="h6"
                        className={classes.title}
                    ></Typography>

                    {!auth.user && loginWithMicrosoft}
                    {auth.user && <Notification user={auth.user} />}
                    {auth.user && (
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <Button
                                className={classes.button}
                                color="inherit"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={() => setOpen(!open)}
                            >
                                <Avatar
                                    className={classes.avatar}
                                    src={auth.user.avatar}
                                />
                                <span>{auth.user.name}</span>
                                {open && (
                                    <div className={classes.dropdown}>
                                        <Link href={`/users/${auth.user._id}`}>
                                            <a className={classes.card}>
                                                <Avatar
                                                    className={`${classes.avatar} ${classes.avatarLink}`}
                                                    src={auth.user.avatar}
                                                />
                                                <div
                                                    className={classes.cardHead}
                                                >
                                                    <span>
                                                        {auth.user.name}
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: "#73726c",
                                                            fontSize: "13px",
                                                            textTransform:
                                                                "none",
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        {auth.user.email}
                                                    </span>
                                                </div>
                                            </a>
                                        </Link>
                                        <div className={classes.cardBody}>
                                            <Link
                                                href={`/users/${auth.user._id}?viewPosts=2`}
                                            >
                                                <a
                                                    className={
                                                        classes.cardBodyLink
                                                    }
                                                >
                                                    Your Posts
                                                </a>
                                            </Link>

                                            {/* <Link href="/team">
                                                    <a
                                                        className={
                                                            classes.cardBodyLink
                                                        }
                                                    >
                                                        My team
                                                    </a>
                                                </Link> */}
                                            <Link href={`/posting`}>
                                                <a
                                                    className={
                                                        classes.cardBodyLink
                                                    }
                                                >
                                                    New Post
                                                </a>
                                            </Link>
                                            <Link href={`/profile`}>
                                                <a
                                                    className={
                                                        classes.cardBodyLink
                                                    }
                                                >
                                                    Edit Profile
                                                </a>
                                            </Link>
                                            <Link href="/">
                                                <a
                                                    onClick={auth.logout}
                                                    className={
                                                        classes.cardBodyLink
                                                    }
                                                >
                                                    Log Out
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </Button>
                        </ClickAwayListener>
                    )}
                </Toolbar>
            </AppBar>
            {/* </ElevationScroll> */}

            <Toolbar style={{ height: "120px" }} />
        </div>
    );
}

export default withSnackbar(DesktopHeader);
