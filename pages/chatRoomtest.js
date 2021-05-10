import React, { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import AuthContext from "../utils/authContext";
import axios from "axios";
import { withSnackbar } from "notistack";
import { useRouter } from "next/router";
import { AirportShuttle } from "@material-ui/icons";
// const socket = io.connect("http://localhost:4000");
const endpoint = "http://localhost:5000";

function chatRoomManTheSon({ enqueueSnackbar }) {
    const auth = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [chatrooms, setChatRoom] = useState([]);
    const router = useRouter();
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
                .then((res) => console.log(res))
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
            <div>
                <h1>hello2</h1>
                <h1>{auth.user.name}</h1>
            </div>
        )
    );
    // change some render thing for id to pass TOTO: FIX THIS SHIT LATER
}

export default withSnackbar(chatRoomManTheSon);
