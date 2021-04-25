import React, { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import AuthContext from "../../utils/authContext";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Snackbar from "@material-ui/core/Snackbar";
import { withSnackbar } from "notistack";

// const socket = io.connect("http://localhost:4000");
const endpoint = "http://localhost:5000";

function useSocket(url) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketIo = io(url);

        setSocket(socketIo);

        function cleanup() {
            socketIo.disconnect();
        }
        return cleanup;

        // should only run once and not on every re-render,
        // so pass an empty array
    }, []);

    return socket;
}

function Notification({ auth, enqueueSnackbar }) {
    const [res, setRes] = useState([]);
    // socket.on("notifications", ({ notifications }) => {
    //     console.log("getting messages");
    //     console.log(notifications);
    //     setRes(notifications);
    // });
    useEffect(() => {
        const socket = io(endpoint);
        // socket.emit("room ids", {})
        socket.emit("getNotification", { id: auth.user._id });
        socket.on(
            "notifications",
            ({ notifications }) => {
                console.log("getting messages");
                // console.log(notifications);
                setRes(notifications);
                // clean up when unmount
                return () => io.disconnect();
            },
            []
        );
        socket.on("newNoti", (data) => {
            setRes((res) => [data, ...res]);
            enqueueSnackbar(data.content);
        });
        // if (auth.user) {
        //     console.log("ran with user id: " + auth.user.id);
        //     socket.emit("getNotification", { id: auth.user?._id }); // somehow auth is not ready when emitting getNotification
        // }
        // return socket.close();
    }, []);

    return (
        auth.user && (
            <Badge badgeContent={res.length} color="primary">
                <NotificationsIcon />
            </Badge>
        )
    );
    // change some render thing for id to pass TOTO: FIX THIS SHIT LATER
}

export default withSnackbar(Notification);
