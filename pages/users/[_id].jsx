//* Components import
import Head from "next/head";
import Filter from "../../components/Newsfeed/Filter";
import FullProfile from "../../components/UserPage/FullProfile";
import MainUser from "../../components/MainUser";
//* Styling import
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

export async function getStaticPaths() {
    // get list of post to populate paths
    let users = await getUsers();
    let paths = users.map((user) => `/users/${user._id}`);
    return {
        paths,
        fallback: true,
    };
}

const getUsers = async () => {
    let users = await axios.get(
        "https://aim4hd-backend.herokuapp.com/api/v1/users?limit=10000"
    );
    return users.data.data.user;
};

const getUser = async (_id) => {
    let post = await axios.get(
        `https://aim4hd-backend.herokuapp.com/api/v1/users/${_id}`
    );
    return post.data.data;
};

export async function getStaticProps({ params }) {
    let res = await getUser(params._id);
    return {
        props: res,
        revalidate: 1,
    };
}
function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F4F7FA",
    },
}));

function UserProfile({ user, enqueueSnackbar }) {
    const classes = useStyles();
    const { isFallback } = useRouter();
    const [feedback, setFeedback] = useState({
        feedbacks: [],
    });
    useEffect(() => {
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/users/${user._id}/feedbacks`
            )
            .then((res) => setFeedback(res.data.data))
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

    if (isFallback) {
        return <></>;
    }

    return (
        <React.Fragment>
            <Head>
                <title>{user.name} | AimforHD</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <Grid container justify="center" alignItems="center">
                <Grid item xs={11} md={9}>
                    <FullProfile user={user} />
                </Grid>
                <Grid item xs={11} md={9}>
                    <MainUser user={user} feedback={feedback} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default withSnackbar(UserProfile);
