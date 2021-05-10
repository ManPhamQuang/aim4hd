import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { FullscreenExit } from "@material-ui/icons";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import landingPageHead from '../pages/landingPageHead.png';


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
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'center'
    },
    headImg: {
        width: "100%",
    },
    featureItems: {
        // width: "80%"
    }


}));

export default function LandingPage() {
    const classes = useStyles();
    return (
        // <h1>landing page</h1>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    {/* <Paper className={classes.paper}>xs=6</Paper> */}
                    <div className=" classes.headTitle">
                        <h1>lolololo</h1>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    {/* <Paper className={classes.paper}>xs=6</Paper> */}
                    <img className="classes.headImg" src={require('../pages/')}></img>
                </Grid>
                <Grid item xs={12}>
                    <h1>
                        App features
                    </h1>
                </Grid>

                <Grid className="classes.featureItems" item xs={4}>
                    <Paper className={classes.paper}>Feature1</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Feature2</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Feature3</Paper>
                </Grid>
            </Grid>
        </div>




    );
}
