import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    breaker: {
        backgroundColor: "#f2f2f2",
        width: "100%",
        height: "3px",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function LandingPage() {
    const classes = useStyles();
    // return <h1>landing page</h1>;
    return (
        <h1>landing page</h1>

    );
}
