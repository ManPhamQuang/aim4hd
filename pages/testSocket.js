import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

// const socket = io.connect("http://localhost:4000");
const endpoint = "http://localhost:4000";
const socket = io(endpoint);

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
    const [res, setRes] = useState("");
    useEffect(() => {
        socket.on("message", (data) => console.log(data));
    }, []);
    return <h1>heel</h1>;
}

export default SocketTest;
