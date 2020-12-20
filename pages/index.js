import { Grid, Hidden } from "@material-ui/core";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import RecommendedUsers from "../components/RecommendUsers";
import { useEffect, useState } from "react";

export default function Home() {
    const [aiming, setAiming] = useState(["HD"]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setPage(1);
    // }, [aiming]);

    return (
        <Grid container justify="center">
            <Grid item xs={12} md={3}>
                <Filter
                    loading={loading}
                    setLoading={setLoading}
                    aiming={aiming}
                    setAiming={setAiming}
                />
            </Grid>
            <Grid item xs={11} md={5}>
                <Posts
                    loading={loading}
                    setLoading={setLoading}
                    aiming={aiming.join()}
                />
            </Grid>
            <Hidden smDown>
                <Grid item xs={false} md={4}>
                    <RecommendedUsers />
                </Grid>
            </Hidden>
        </Grid>
    );
}
