import React from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Avatar, Container, Grid, CardHeader } from "@material-ui/core";
import Link from "next/link";
import { withSnackbar } from "notistack";
import ChatIcon from "@material-ui/icons/Chat";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "#FFFFFF",
        // ...theme.userCard,
        minHeight: 120,
        marginTop: "1rem",
        boxShadow: "none",
        "&:hover": {
            boxShadow: "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
        },
        borderRadius: "1rem",
        width: "100%",
    },
    cardHeaderRoot: {
        [theme.breakpoints.down("md")]: {
            padding: "8px !important",
        },
    },

    cover: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        [theme.breakpoints.down("md")]: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        borderRadius: "7px",
        // width: "100%",
        // height: "100%",
        objectFit: "cover",
    },
    hover: {
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    icon: {
        display: "flex",
        alignItems: "flex-end",
    },
}));

export default function UserCard({ user }) {
    const { avatar, major, school, name } = user;
    const classes = useStyles();
    return (
        <Link href={`/users/${user._id}`}>
            <a
                style={{
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                <Card className={classes.root}>
                    <CardHeader
                        classes={{ root: classes.cardHeaderRoot }}
                        avatar={
                            <Avatar src={avatar} className={classes.cover} />
                        }
                        title={
                            <Link href={`/users/${user._id}`}>
                                <a className={classes.hover}>{name}</a>
                            </Link>
                        }
                        titleTypographyProps={{
                            variant: "h6",
                            align: "left",
                        }}
                        subheader={`${school} - ${major}`}
                        subheaderTypographyProps={{
                            align: "left",
                            variant: "body1",
                            display: "block",
                        }}
                        // action={
                        //     <IconButton className={classes.icon}>
                        //         <ChatIcon />
                        //     </IconButton>
                        // }
                    />
                </Card>
            </a>
        </Link>
    );
}
