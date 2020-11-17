import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
const useStyles = makeStyles({
    root: {
        marginLeft: "5px",
        marginBottom: "3px",
        // borderColor: "red",
    },
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const generateRandomColor = () => {
    switch (getRndInteger(1, 6)) {
        case 1:
            return {
                color: "primary",
                style: {},
            };
            break;
        case 2:
            return {
                color: "secondary",
                style: {},
            };
            break;
        case 3:
            return {
                color: "",
                style: { borderColor: "violet", color: "violet" },
            };
            break;
        case 4:
            return {
                color: "",
                style: { borderColor: green[600], color: green[600] },
            };
            break;
        case 5:
            return {
                color: "",
                style: { borderColor: purple[600], color: purple[600] },
            };
            break;
        default:
            return {
                color: "primary",
                style: {},
            };
            break;
    }
};

export default function SkillBadge({ label }) {
    const classes = useStyles();
    return (
        <Chip
            className={classes.root}
            // color={green}
            color={generateRandomColor().color}
            style={generateRandomColor().style}
            variant="outlined"
            label={label}
        />
    );
}
