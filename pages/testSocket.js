import React, { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import AuthContext from "../utils/authContext";

// const socket = io.connect("http://localhost:4000");
const endpoint = "http://localhost:4000";

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

function SocketTest() {
    const [res, setRes] = useState([]);
    const auth = useContext(AuthContext);
    // socket.on("notifications", ({ notifications }) => {
    //     console.log("getting messages");
    //     console.log(notifications);
    //     setRes(notifications);
    // });
    useEffect(() => {
        const socket = io(endpoint);
        socket.emit("getNotification", { id: "606a6fb9b824bd0015da77a7" });
        socket.on(
            "notifications",
            ({ notifications }) => {
                console.log("getting messages");
                console.log(notifications);
                setRes(notifications);
                // clean up when unmount
                return () => io.disconnect();
            },
            []
        );
        socket.on("newNoti", (data) => {
            console.log("new noti!!!!");
            console.log(data);
            setRes([data, ...res]);
        });
        // if (auth.user) {
        //     console.log("ran with user id: " + auth.user.id);
        //     socket.emit("getNotification", { id: auth.user?._id }); // somehow auth is not ready when emitting getNotification
        // }
        // return socket.close();
    }, []);

    return (
        auth.user && (
            <div>
                <h1>hello2</h1>
                <h1>{auth.user.name}</h1>
                {res.map((noti, idx) => (
                    <h1 key={noti._id}>{noti.id}</h1>
                ))}
            </div>
        )
    );
    // change some render thing for id to pass TOTO: FIX THIS SHIT LATER
}

export default SocketTest;
