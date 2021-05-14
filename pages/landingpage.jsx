import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { FullscreenExit } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import landingPageHeadImg from '../pages/landingPageHeadImg.png';
import Image from "next/image";
import Box from "@material-ui/core/Box";
import LoginWithMicrosoft from "../pages/login";

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
        background: "white",
    },
    headContainer: {
        textAlign: "center",
        flexGrow: 1,
        background: " linear-gradient(#dbf6e9,#ffdcdc)",
    },
    headTitle: {
        marginTop: "40%",
        marginLeft: "10%",
        justify: "center",
        display: "center",
        background: " linear-gradient(#dbf6e9,#ffdcdc)",
    },
    headImg: {
        // width: "100px",
        background: " linear-gradient(#dbf6e9,#ffdcdc)",
        marginRight: "20%",
        width: "80%",
    },
    btn: {
        display: "inline-block",
        background: "#f48b29",
        color: "#fff",
        padding: "8px 30px",
        margin: "30px 0px",
        borderRadius: "30px",
        textDecoration: "none",
    },
    head: {
        // background: "white",
        // marginLeft: "8%",
        // marginRight: "8%",
        display: "flex",
        alignItems: "center",
        background: " linear-gradient(#dbf6e9,#ffdcdc)",
    },

    row: {
        marginLeft: "8%",
        marginRight: "8%",
        display: "flex",
        alignItems: "center",
        // flexWrap: "wrap",
        // justify-content: space-around;
    },
    col2: {
        textAlign: "auto",
        width: "50%",
        marginLeft: "10%",
        marginRight: "5%",
    },
    feature: {
        marginBottom: "10%",
        marginTop: "50px",
    },
    featureHead: {
        marginTop: "5%",
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
        // marginTop: "15%",
    },
    featureItems: {
        // padding: theme.spacing(2),
        // width: "80%",
        // marginBlockStart: "10%",
        // justify: "center",
        // display: "center",
        // marginLeft: "5%",
        marginTop: "5%",
        marginLeft: "20%",
        marginRight: "20%",
        display: "flex",
        color: theme.palette.text.secondary,
        color: "#ffdcdc",
    },
    paper: {
        // padding: theme.spacing(2),
        marginLeft: "3%",
        marginRight: "3%",
        textAlign: "center",
        marginBottom: "3%",
        // color: theme.palette.text.secondary,
        width: "35%",
        // border: "1px solid black",
        backgroundColor: "#e08f62",
        color: "white",
        borderRadius: "10px",
        boxShadow: "4px 4px 1px #9E9E9E",
    },
    reason: {
        marginTop: "5%",
        marginLeft: "15%",
        marginRight: "15%",
        // backgroundRepeat: "no-repeat",
        // backgroundImage: url("img_tree.gif"), url("paper.gif");
        // backgroundBlend-mode: multiply;
        // backgroundColor: "#dbf6e9",
    },
    reasonItems: {
        display: "flex",
        // marginTop: "5%",
        textAlign: "center",
        width: "80%",
        // marginLeft: "15%",
        marginTop: "5%",
        // display: "center",
    },
    bottom: {
        marginTop: "10%",
        marginLeft: "15%",
        marginRight: "3%",
        textAlign: "center",
        // marginBottom: "3%",
        // color: theme.palette.text.secondary,
        width: "70%",
        // height: "50%",
        // border: "1px solid black",
        backgroundColor: "#dbf6e9",
        color: "#707070",
        borderRadius: "10px 10px",
        boxShadow: "4px 4px 1px #9E9E9E",
    },
}));

export default function LandingPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.head}>
                <div className={classes.col2}>
                    <h1>Finding teammates web application</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Earum laudantium doloribus aliquam alias tempore,
                        neque obcaecati qui dignissimos doloremque!
                        Exercitationem ducimus doloribus voluptate odit atque
                        sit perferendis blanditiis repellat ipsam.
                    </p>
                    <LoginWithMicrosoft>
                        {/* <a className={classes.btn}>Login now &#8594;</a> */}
                    </LoginWithMicrosoft>
                </div>
                <div class="col-2">
                    {/* <a href="order-placement.html"> */}
                    <img
                        width={"100%"}
                        marginLeft={"5%"}
                        marginRight={"10%"}
                        src="/HeadImg.png"
                        className={classes.headImg}
                        alt="Image"
                    ></img>
                    {/* </a> */}
                </div>
            </div>
            <div className={classes.feature}>
                <div className={classes.featureHead}>
                    <h1>SIGNIFICANT FEATURES</h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Quod dignissimos eius possimus nulla, non odit
                        incidunt ipsam sint optio, delectus explicabo officiis.
                        Qui reprehenderit exercitationem accusantium dignissimos
                        rem repellendus ullam.
                    </p>
                </div>
                <div className={classes.featureItems}>
                    <div className={classes.paper}>
                        {/* <h4>box1</h4> */}
                        <img src="/2.png" width={"60%"} alt="" />
                        <h4 marginLeft={"10%"} marginRight={"10%"}>
                            Search and filter posts, users by fields
                        </h4>
                    </div>
                    <div className={classes.paper}>
                        {/* <h4>box1</h4> */}
                        <img
                            src="/3.png"
                            width={"60%"}
                            marginTop={"5%"}
                            alt=""
                        />
                        <h4>Save favourite posts</h4>
                    </div>
                    <div className={classes.paper}>
                        {/* <h4>box1</h4> */}
                        <img src="/4.png" width={"60%"} alt="" />
                        <h4>Chatbox</h4>
                    </div>
                    <div className={classes.paper}>
                        {/* <h4>box1</h4> */}
                        <img src="/5.png" width={"60%"} alt="" />
                        <h4>Star user/Posts</h4>
                    </div>
                </div>
                <div className={classes.reason}>
                    <div>
                        <h1>WHY IT IS NECCESSARY FOR STUDENT LIFE</h1>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <br />
                            <br />
                            <br />
                            <h4>
                                If you feel that finding teammates on Canvas or
                                RMIT Society on Facebook , this web application
                                helps you solve this problem.
                            </h4>
                        </Grid>
                        <Grid item xs={6}>
                            <img
                                src="/ReasonWhy.png"
                                width={"100%"}
                                borderRadius={"70"}
                                alt=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <img
                                src="/Reason2.png"
                                width={"100%"}
                                borderRadius={"70"}
                                alt=""
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <br />
                            <br />
                            <br />
                            <h4>
                                If you feel that finding teammates on Canvas or
                                RMIT Society on Facebook , this web application
                                helps you solve this problem.
                            </h4>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={classes.bottom}>
                <br></br>
                <h1>Let's work together</h1>
                <LoginWithMicrosoft>
                    {/* <a className={classes.btn}>Login now &#8594;</a> */}
                </LoginWithMicrosoft>
            </div>
        </div>
    );
}
