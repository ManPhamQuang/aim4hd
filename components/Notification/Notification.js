import React, { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import AuthContext from "../../utils/authContext";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";
import NotiCard from "./NotiCard";

import { withSnackbar } from "notistack";

const endpoint = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
    dropdown: {
        position: "absolute",
        width: "290px",
        top: "100%",
        right: 0,
        zIndex: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)",
    },
}));

function Notification({ user, enqueueSnackbar }) {
    const [notis, setNotis] = useState([]);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        const socket = io(endpoint);
        // socket.emit("room ids", {})
        socket.emit("getNotification", { id: user._id });
        socket.on(
            "notifications",
            ({ notifications }) => {
                setNotis(notifications);
                // clean up when unmount
                return () => io.disconnect();
            },
            []
        );
        socket.on("newNoti", (data) => {
            setNotis((res) => [data, ...res]);
            enqueueSnackbar(data.content, {
                variant: "info",
            });
        });
    }, []);

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <IconButton onClick={() => setOpen(!open)}>
                <Badge badgeContent={notis.length} color="primary">
                    <NotificationsIcon />
                    {open && (
                        <div className={classes.dropdown}>
                            {notis.map((noti) => (
                                <NotiCard noti={noti} />
                            ))}
                        </div>
                    )}
                </Badge>
            </IconButton>
        </ClickAwayListener>
    );
}

export default withSnackbar(Notification);
