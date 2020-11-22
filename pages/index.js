import Head from "next/head";
import { Grid } from "@material-ui/core";
import Posts from "../components/Posts";

export default function Home() {
    return (
        <Grid container justify="center">
            <Grid item xs={false} md={3} />
            <Grid item xs={11} md={5}>
                <Posts />
            </Grid>
            <Grid item xs={false} md={4} />
        </Grid>
    );
}
