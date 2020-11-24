import Head from "next/head";
import { Grid } from "@material-ui/core";
import Posts from "../components/Posts";
import Filter from "../components/Filter";

export default function Home() {
    return (
        <Grid container justify="center">
            <Grid item xs={12} md={3}>
                <Filter />
            </Grid>
            <Grid item xs={11} md={5}>
                <Posts />
            </Grid>
            <Grid item xs={false} md={4} />
        </Grid>
    );
}
