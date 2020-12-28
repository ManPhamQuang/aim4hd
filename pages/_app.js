import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Layout from "../components/Layout";
import AuthContext from "../utils/authContext";
let timer;
export default function MyApp(props) {
    const { Component, pageProps } = props;
    const [user, setUser] = useState(null);
    const [authData, setAuthData] = useState(null);
    const [token, setToken] = useState(null);
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
            let expireTime = 1000 * 60 * 60;
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
    });

    const logout = useCallback(() => {
        setUser(null);
        setAuthData(null);
        localStorage.removeItem("user");
        clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const data = JSON.parse(localStorage.getItem("user"));
            let remainningTime = data.startSessionAt - Date.now();
            if (remainningTime > 0) {
                setUser(data.user);
                setToken(data.token);
                timer = setTimeout(logout, remainningTime);
            } else logout();
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
                    <CssBaseline />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </AuthContext.Provider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
