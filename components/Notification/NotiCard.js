import React, { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";

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

function NotiCard({ noti }) {
    const classes = useStyles();

    return <p>{noti.content}</p>;
}

export default withSnackbar(NotiCard);
