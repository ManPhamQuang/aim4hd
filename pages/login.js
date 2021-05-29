import { Container, makeStyles } from "@material-ui/core";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../utils/authContext";
import { withSnackbar } from "notistack";
import axios from "axios";

const MicrosoftLogin = dynamic(() => import("react-microsoft-login"), {
    ssr: false,
});

const useStyles = makeStyles((theme) => ({
    btn: {
        display: "inline-block",
        background: "#f48b29",
        color: "#fff",
        padding: "8px 30px",
        margin: "30px 0px",
        borderRadius: "30px",
        textDecoration: "none",
    },
}));

const LoginWithMicrosoft = ({ enqueueSnackbar }) => {
    const router = useRouter();
    const auth = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

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
            enqueueSnackbar("Creating new account", {
                variant: "info",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                },
                autoHideDuration: 4000,
            });
            return { error: error.response.data.message };
        }
    };

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

    return (
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
                <a
                    // variant="contained"
                    // size="large"
                    // color="primary"
                    className={classes.btn}
                >
                    Login now &#8594;
                </a>
            }
            // buttonTheme="light_short"
        />
    );
};

export default withSnackbar(LoginWithMicrosoft);
