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

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "transparent",
        ...theme.userCard,
    },
    cardHeaderRoot: {
        [theme.breakpoints.down("md")]: {
            padding: "8px !important",
        },
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        padding: "0px",
    },
    breaker: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "3px",
        marginBottom: "5px",
        [theme.breakpoints.down("md")]: {
            marginBottom: "15px",
        },
    },
    cover: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        [theme.breakpoints.down("md")]: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        borderRadius: "7px",
        // width: "100%",
        // height: "100%",
        objectFit: "cover",
    },
    gridItem: {
        [theme.breakpoints.down("md")]: {
            padding: "5px !important",
        },
    },
}));

export default function UserCard({ user }) {
    const { avatar, major, school, name } = user;
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                classes={{ root: classes.cardHeaderRoot }}
                avatar={<Avatar src={avatar} className={classes.cover} />}
                title={name}
                titleTypographyProps={{
                    variant: "body2",
                    align: "left",
                }}
                subheader={`${major} - ${school}`}
                subheaderTypographyProps={{
                    align: "left",
                    variant: "subtitle2",
                }}
            />
        </Card>
    );
}
