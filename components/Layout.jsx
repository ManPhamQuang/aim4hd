import React from "react";
import Header from "./Header";
import { Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import MobileHeader from "./MobileHeader";

export default function Layout(props) {
    return (
        <Grid container direction="column">
            <Grid item>
                <Hidden mdDown>
                    <Header />
                </Hidden>
                {/* <Hidden mdUp>
                    <MobileHeader />
                </Hidden> */}
            </Grid>
            <Grid item container>
                {props.children}
            </Grid>
        </Grid>
    );
}
