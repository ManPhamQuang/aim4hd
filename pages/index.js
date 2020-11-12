import Head from "next/head";
import { Grid } from "@material-ui/core";
import Header from "../components/header";

export default function Home() {
    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
            </Grid>
            <Grid item container>
                content
            </Grid>
        </Grid>
    );
}
