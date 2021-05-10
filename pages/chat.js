import React, { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import AuthContext from "../utils/authContext";
import axios from "axios";
import { withSnackbar } from "notistack";
import { useRouter } from "next/router";
import { AirportShuttle } from "@material-ui/icons";
import {
    Grid,
    makeStyles,
    Typography,
    Avatar,
    CardHeader,
} from "@material-ui/core";
// const socket = io.connect("http://localhost:4000");
const endpoint = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
    chatroomsContainer: {
        height: "100%",
        // backgroundColor: "red",
    },
    activeChatContainer: {
        height: "100%",
        // backgroundColor: "blue",
    },
    infoPanelContainer: {
        height: "100%",
        // backgroundColor: "green",
    },
    chatAppContainer: {
        marginTop: "-40px",
        height: "calc(100vh - 80px)",
        backgroundColor: "#fff",
    },
    title: theme.title,
}));

function Chat({ enqueueSnackbar }) {
    const auth = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [chatrooms, setChatRoom] = useState([]);
    const router = useRouter();
    const classes = useStyles();
    // if (!auth.authData && typeof window !== "undefined") router.push("/");
    // if (auth.user && typeof window !== "undefined") router.push("/");
    // socket.on("notifications", ({ notifications }) => {
    //     console.log("getting messages");
    //     console.log(notifications);
    //     setRes(notifications);
    // });

    useEffect(() => {
        if (auth.user !== null) {
            axios
                .get(
                    `https://aim4hd-backend.herokuapp.com/api/v1/chatroom/${auth.user._id}` // fetch chat rooms
                )
                .then((res) => setChatRoom(res.data.rooms))
                .catch((err) => {
                    enqueueSnackbar(err.message, {
                        variant: "warning",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },

                        autoHideDuration: 4000,
                    });
                });
        }
    }, [auth]);

    // useEffect(() => {
    //     // TODO: socket io for the snack bar, just an event listener for snackbar popups
    //     if (auth.user !== null) {
    //         // const socket = io(endpoint);
    //         // socket.onAny((event, ...args) => {
    //         //     console.log(event, args);
    //         // });
    //         axios
    //             .get(
    //                 "https://aim4hd-backend.herokuapp.com/api/v1/chatroom/60813b092e491417b4d5a6ed/message" // TODO: that's a room id
    //             )
    //             .then((res) => setMessages(res.data.conversation))
    //             .catch((err) =>
    //                 enqueueSnackbar(err.message, {
    //                     variant: "warning",
    //                     anchorOrigin: {
    //                         vertical: "bottom",
    //                         horizontal: "left",
    //                     },

    //                     autoHideDuration: 4000,
    //                 })
    //             );
    //         socket.emit("room ids", ["60813b092e491417b4d5a6ed"]); // array of room ids
    //         socket.on("new message", ({ message }) => {
    //             console.log("new messages!!!console;");
    //             setMessages((messages) => [message, ...messages]);
    //         });
    //     }
    // }, [auth]);

    return (
        auth.user && (
            <Grid
                container
                direction="row"
                className={classes.chatAppContainer}
            >
                <Grid
                    item
                    xs={false}
                    md={3}
                    xl={2}
                    className={classes.chatroomsContainer}
                >
                    <CardHeader
                        avatar={<Avatar src={auth.user.avatar} title="Chat" />}
                    >
                        {/* <Typography variant="h5" className={classes.title}>
                            Chat
                        </Typography> */}
                    </CardHeader>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    xl={8}
                    className={classes.activeChatContainer}
                >
                    <h1>active chatroom container</h1>
                </Grid>
                <Grid
                    item
                    xs={false}
                    md={3}
                    xl={2}
                    className={classes.infoPanelContainer}
                >
                    <h1>Info panel</h1>
                </Grid>
            </Grid>
        )
    );
    // change some render thing for id to pass TOTO: FIX THIS SHIT LATER
}

export default withSnackbar(Chat);
