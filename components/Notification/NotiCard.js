import React, { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TimeAgo from "react-timeago";
import { withSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        minHeight: 75,
        marginBottom: 2,
        boxShadow: "none",
        "&:hover": {
            boxShadow: "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
        },
        borderRadius: "1rem",
    },
    cardHeader: {
        padding: 0,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function NotiCard({ noti }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar
                        className={classes.avatar}
                        src={noti.sender.avatar}
                    />
                }
                title={noti.content}
                titleTypographyProps={{
                    variant: "body2",
                    align: "left",
                }}
                subheader={<TimeAgo date={noti.createdAt} />}
                subheaderTypographyProps={{
                    align: "left",
                    variant: "subtitle2",
                }}
            />
        </Card>
    );
}

export default withSnackbar(NotiCard);
