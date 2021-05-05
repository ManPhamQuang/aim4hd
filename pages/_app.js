import React, {
    useCallback,
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Layout from "../components/Layout";
import AuthContext from "../utils/authContext";
import { useRouter } from "next/router";
import { SnackbarProvider, useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    success: { backgroundColor: "purple" },
    error: { backgroundColor: "blue" },
    warning: { backgroundColor: "green" },
    info: { backgroundColor: "yellow" }, // pass !important to change the color
}));

let timer;
function MyApp(props) {
    const { Component, pageProps } = props;
    const [user, setUser] = useState(null);
    const [authData, setAuthData] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();
    const LogOutNotice = useRef();
    const classes = useStyles();
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const login = useCallback((status, data) => {
        console.log(data);
        if (status === "microsoftCheck") setAuthData(data.authData);
        if (status === "signup" || status === "login") {
            setUser(data.user);
            setToken(data.token);
            let expireTime = 10000 * 60 * 60;
            let startSessionAt = Date.now() + expireTime;
            timer = setTimeout(logout, expireTime);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    user: data.user,
                    startSessionAt,
                    token: data.token,
                })
            );
        }
        if (status === "update") {
            setUser(data.user);
            const storage = {
                ...JSON.parse(localStorage.getItem("user")),
                user: data.user,
            };
            localStorage.setItem("user", JSON.stringify(storage));
        }
    });

    const logout = useCallback((state) => {
        setUser(null);
        setAuthData(null);
        localStorage.removeItem("user");
        clearTimeout(timer);
        router.push("/");
        if (!state)
            setTimeout(() => {
                LogOutNotice.current.getAlert();
            });
    }, []);

    const LogOutComponent = forwardRef((props, ref) => {
        const { enqueueSnackbar, closeSnackbar } = useSnackbar();
        useImperativeHandle(ref, () => ({
            getAlert() {
                enqueueSnackbar("Session expired. Please login again", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    autoHideDuration: 4000,
                    // persist: true,
                });
            },
        }));
        return null;
    });

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const data = JSON.parse(localStorage.getItem("user"));
            let remainningTime = data.startSessionAt - Date.now();
            if (remainningTime > 0) {
                setUser(data.user);
                setToken(data.token);
                timer = setTimeout(logout, remainningTime);
            } else logout("autoLogout");
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <AuthContext.Provider
                value={{ user, login, logout, authData, token }}
            >
                <ThemeProvider theme={theme}>
                    <SnackbarProvider
                        maxSnack={3}
                        classes={{
                            variantSuccess: classes.success,
                            variantError: classes.error,
                            variantWarning: classes.warning,
                            variantInfo: classes.info,
                        }}
                    >
                        <CssBaseline />
                        <Layout>
                            <LogOutComponent ref={LogOutNotice} />
                            <Component {...pageProps} />
                        </Layout>
                    </SnackbarProvider>
                </ThemeProvider>
            </AuthContext.Provider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default MyApp;
