import React from "react";
import Header from "./header";
import { Grid } from "@material-ui/core";

export default function Layout(props) {
    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
            </Grid>
            <Grid item container>
                {props.children}
            </Grid>
        </Grid>
    );
}
