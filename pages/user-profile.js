import Head from "next/head";
import { Grid } from "@material-ui/core";
import Posts from "../components/Posts";
import Filter from "../components/Filter";

export default function UserProfile() {
    return (
        <Grid container justify="center">
            <Grid item xs={12} md={3}>
                {/* Leftside user info */}
            </Grid>
            <Grid item xs={11} md={5}>
                {/* center user description */}
            </Grid>
            <Grid item xs={false} md={4}>
                {/* suggested users - for later */}
            </Grid>
        </Grid>
    );
}
