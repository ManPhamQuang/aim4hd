import React, { useEffect, useState } from "react";
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

function RecommenedUsers({ enqueueSnackbar }) {
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        axios
            .get(
                "https://aim4hd-backend.herokuapp.com/api/v1/users?sort=-numberOfRecommended&limit=5"
            )
            .then((res) => setUsers(res.data.data.user))
            .catch((err) =>
                enqueueSnackbar(err.message, {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },

                    autoHideDuration: 4000,
                })
            );
    }, []);

    const UserCard = ({ user }) => {
        return (
            <Card className={classes.root}>
                <CardHeader
                    classes={{ root: classes.cardHeaderRoot }}
                    avatar={
                        <Avatar src={user.avatar} className={classes.cover} />
                    }
                    title={user.name}
                    titleTypographyProps={{
                        variant: "body2",
                        align: "left",
                    }}
                    subheader={`${user.major} - ${user.school}`}
                    subheaderTypographyProps={{
                        align: "left",
                        variant: "subtitle2",
                    }}
                />
            </Card>
        );
    };
    const Breaker = () => {
        return <div className={classes.breaker}></div>;
    };
    return (
        <Container>
            <Typography variant="h5" component="h2">
                Recommended Users
            </Typography>
            <Breaker />
            <Grid container direction="column" spacing={4}>
                {users.map((user) => (
                    <Link href={`/users/${user._id}`} key={user._id}>
                        <a
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <Grid item classes={{ item: classes.gridItem }}>
                                <UserCard user={user} />
                            </Grid>
                        </a>
                    </Link>
                ))}
            </Grid>
        </Container>
    );
}
export default withSnackbar(RecommenedUsers);
