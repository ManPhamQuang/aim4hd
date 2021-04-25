import { Grid, Hidden, makeStyles } from "@material-ui/core";
import Posts from "../components/Newsfeed/Posts";
import Filter from "../components/Newsfeed/Filter";
import RecommendedUsers from "../components/Newsfeed/RecommendUsers";
import { useEffect, useState, useContext } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import AuthContext from "../utils/authContext";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function Home() {
    const [aiming, setAiming] = useState(["HD"]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const auth = useContext(AuthContext);

    // useEffect(() => {
    //     setPage(1);
    // }, [aiming]);

    return (
        <Grid container justify="center" spacing={6}>
            {auth.user ? (
                <Fab
                    className={classes.fab}
                    size="medium"
                    color="primary"
                    aria-label="add"
                >
                    <Link href="posting">
                        <AddIcon />
                    </Link>
                </Fab>
            ) : null}
            <Grid item xs={12} md={2}>
                <Filter
                    loading={loading}
                    setLoading={setLoading}
                    aiming={aiming}
                    setAiming={setAiming}
                />
            </Grid>
            <Grid item xs={11} md={7}>
                <Posts
                    loading={loading}
                    setLoading={setLoading}
                    aiming={aiming.join()}
                />
            </Grid>
            <Hidden smDown>
                <Grid item xs={false} md={3}>
                    <RecommendedUsers />
                </Grid>
            </Hidden>
        </Grid>
    );
}
