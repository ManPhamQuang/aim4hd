import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid, Avatar } from "@material-ui/core";
import MicrosoftLogin from "react-microsoft-login";
import { useContext } from "react";
import AuthContext from "../utils/authContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";

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
  avatar: {
    marginRight: "5px",
  },
}));

export default function DesktopHeader() {
  const classes = useStyles();
  const router = useRouter();
  const auth = useContext(AuthContext);
  const handleOnAuth = (error, authData, msal, action) => {
    if (authData) {
      auth.login("microsoftCheck", { authData });
      if (action === "signup") {
        router.push("/sign-up");
      }
      if (action === "login") {
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
                <>
									<Button
									className={classes.button}
									color="inherit"
									aria-controls="simple-menu" 
									aria-haspopup="true"
									>
										<Avatar className={classes.avatar} src={auth.user.avatar} />
										<span>{auth.user.name}</span>
									</Button>
                </>
              )}
            </Toolbar>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </AppBar>
    </div>
  );
}
