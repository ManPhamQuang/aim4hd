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
import { Grid, Avatar, ClickAwayListener } from "@material-ui/core";
import MicrosoftLogin from "react-microsoft-login";
import { useContext } from "react";
import AuthContext from "../utils/authContext";
import axios from "axios";
import LoadingSpinner from './LoadingSpinner';


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
    position: "relative",
  },
  login: {
    width: "150px",
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
    boxShadow: "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)"
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
    padding: "8px"
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
    fontSize: "14px",
    transition: "all 0.3s",
    "&:hover": {
      color: "#ca3028",
    },
    "&:last-child": {
      borderBottom: "1px solid #dcdacb",
    }
  }
}));

const checkIfUserHasAlreadyLoginWithMicrosoft = async (uniqueId) => {
  try {
    const response = await axios.post("https://aim4hd.herokuapp.com/api/v1/users/check", { microsoftUniqueId: uniqueId });
    return { user: response.data.data.user }
  } catch (error) {
    return { error: error.response.data.message }
  }
}


export default function DesktopHeader() {
  const classes = useStyles();
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnAuth = async (error, authData, msal, action) => {
    if (authData) {
      console.log(authData);
      setIsLoading(true);
      const data = await checkIfUserHasAlreadyLoginWithMicrosoft(authData.uniqueId);
      if (action === "signup") {
        auth.login("microsoftCheck", { authData });
        setIsLoading(false)
        router.push("/sign-up");
      }
      if (action === "login") {
        setIsLoading(false)
        console.log(data);
        auth.login("login", data)
      }
    }
  };

  const loginWithMicrosoft = (
    <>
      <MicrosoftLogin
        clientId="846fecbc-f462-4716-8d6f-1e7f0682b998"
        authCallback={(error, authData, msal) =>
          handleOnAuth(error, authData, msal, "login")
        }
        prompt="select_account"
        children={
          <Button variant="contained" color="inherit" className={classes.login}>
            Login
          </Button>
        }
        buttonTheme="light_short"
      />
      <MicrosoftLogin
        clientId="846fecbc-f462-4716-8d6f-1e7f0682b998"
        authCallback={(error, authData, msal) =>
          handleOnAuth(error, authData, msal, "signup")
        }
        prompt="select_account"
        children={
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.login}
          >
            Sign Up
          </Button>
        }
        buttonTheme="light_short"
      />
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        {isLoading && <LoadingSpinner isLoading={isLoading} />}
        <Grid container direction="row">
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10} className={classes.content}>
            <Toolbar disableGutters spacing={3}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}></Typography>
              <Button className={classes.button} color="inherit">
                Home
              </Button>
              <Button className={classes.button} color="inherit">
                About
              </Button>
              <Button className={classes.button} color="inherit">
                Profile
              </Button>
              {typeof window !== "undefined" &&
                !auth.user &&
                loginWithMicrosoft}
              {auth.user && (
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <Button
                    className={classes.button}
                    color="inherit"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={() => setOpen(!open)}
                  >
                    <Avatar className={classes.avatar} src={auth.user.avatar} />
                    <span>{auth.user.name}</span>
                    {open && (
                      <div className={classes.dropdown}>
                        <Link href="/my-profile">
                          <a className={classes.card}>
                            <Avatar
                              className={`${classes.avatar} ${classes.avatarLink}`}
                              src={auth.user.avatar}
                            />
                            <div className={classes.cardHead}>
                              <span>{auth.user.name}</span>
                              <span style={{color:"#73726c", fontSize: "13px", textTransform: "none", fontWeight: "400"}}>{auth.user.email}</span>
                            </div>
                          </a>
                        </Link>
                        <div className={classes.cardBody}>
                          <Link href="/team">
                            <a className={classes.cardBodyLink}>My team</a>
                          </Link>
                          <Link href="/profile">
                            <a className={classes.cardBodyLink}>Edit profile</a>
                          </Link>
                          <Link href="/">
                            <a onClick={auth.logout} className={classes.cardBodyLink}>Log out</a>
                          </Link>
                        </div>
                      </div>
                    )}
                  </Button>
                </ClickAwayListener>
              )}
            </Toolbar>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </AppBar>
    </div>
  );
}
