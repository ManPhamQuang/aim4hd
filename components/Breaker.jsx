import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    breaker: {
        backgroundColor: "#f2f2f2",
        width: "100%",
        height: "3px",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));
export default function Breaker() {
    const classes = useStyles();
    return <div className={classes.breaker} />;
}
