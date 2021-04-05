import Axios from "axios";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Container, Grid } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "transparent",
        ...theme.userCard,
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
    },
    cover: {
        width: 110,
        height: 110,
        borderRadius: "7px",
        // width: "100%",
        // height: "100%",
        objectFit: "cover",
    },
}));

export default function RecommenedUsers() {
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        axios
            .get(
                "https://aim4hd-backend.herokuapp.com/api/v1/users?sort=-numberOfRecommended&limit=5"
            )
            .then((res) => setUsers(res.data.data.user))
            .catch((err) => console.log(err));
    }, []);
    const UserCard = ({ user }) => {
        return (
            <Card className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image={user.avatar}
                    title="Live from space album cover"
                />
                {/* <div className={classes.details}> */}
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {user.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {user.major}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {user.school}
                    </Typography>
                </CardContent>
                {/* </div> */}
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
                        <Grid item>
                            <UserCard user={user} />
                        </Grid>
                    </Link>
                ))}
            </Grid>
        </Container>
    );
}
