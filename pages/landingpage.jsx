import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { FullscreenExit } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import landingPageHeadImg from '../pages/landingPageHeadImg.png';
import Image from "next/image";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    breaker: {
        backgroundColor: "#f2f2f2",
        width: "100%",
        height: "3px",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        textAlign: "center",
        // background:"linear-gradient(#dbf6e9,#ffdcdc)"
    },
    paper: {
        // padding: theme.spacing(2),
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
        // color: "#ffdcdc",
        width: "50%",
        justify: "center",
        display: "center",
        // marginLeft: "10%",
        // mar,
    },
    headContainer: {
        // marginTop: "40%",
        // marginLeft: "10%",
        textAlign: "center",
        flexGrow: 1,
        textAlign: "center",
        background: " linear-gradient(#dbf6e9,#ffdcdc)",
    },
    headTitle: {
        // background:" linear-gradient(#dbf6e9,#ffdcdc)"
        marginTop: "40%",
        marginLeft: "10%",
    },
    headImg: {
        width: "100px",
    },
    btn: {
        display: "inline-block",
        background: "#f48b29",
        color: "#fff",
        padding: "8px 30px",
        margin: "30px 0px",
        borderRadius: "30px",
    },
    head: {
        background: "#ffdcdc",
    },
    feature: {
        textAlign: "center",
        flexGrow: 1,
        textAlign: "center",
        width: "50%",
    },
    featureItems: {
        // width: "80%",
        // marginBlockStart: "10%",
        justify: "center",
        display: "center",
    },
}));

export default function LandingPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={5} className={classes.headContainer}>
                    <div className={classes.headTitle}>
                        <h1>Favorite brands and hottest trends</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Earum laudantium doloribus aliquam alias
                            tempore, neque obcaecati qui dignissimos doloremque!
                            Exercitationem ducimus doloribus voluptate odit
                            atque sit perferendis blanditiis repellat ipsam.
                        </p>
                        <a className={classes.btn}>Login now &#8594;</a>
                    </div>
                </Grid>
                <Grid item xs={7} className={classes.headContainer}>
                    <Image
                        alt="header"
                        width={700}
                        height={500}
                        src="/headImg.png"
                    />
                </Grid>

                {/* <Grid className={"classes.feature"}> */}
                <Grid item xs={12} className={"classes.feature"}>
                    <h1>App features</h1>
                </Grid>
                <Grid className={"classes.featureItems"} item xs={4}>
                    <Paper className={classes.featureItems}>Feature1</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.featureItems}>Feature2</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.featureItems}>Feature3</Paper>
                </Grid>
                {/* </Grid> */}
            </Grid>
        </div>
    );
}
