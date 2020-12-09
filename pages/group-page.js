//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import LeftGroup from "../components/LeftGroup";
import CenterGroup from "../components/CenterGroup";
//* Styling import
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GroupPage() {
    return (
        <React.Fragment>
            <Head>
                <title>Group name | AimforHD</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Grid container justify="center">
                <Grid item xs={11} md={3}>
                    <LeftGroup />
                </Grid>
                <Grid item xs={11} md={5}>
                    {/* <CenterProfile user={user} /> */}
                </Grid>
                <Grid item xs={false} md={4}>
                    {/* suggested users - for later */}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
