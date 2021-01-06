import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

const useStyles = makeStyles({
    root: {
        marginRight: "5px",
        marginBottom: "3px",
    },
});

const BadgeColor = (aiming) => {
    switch (aiming) {
        case "HD":
            return {
                style: {
                    borderColor: "	darkgray",
                    color: "white",
                    backgroundColor: "red",
                },
            };
            break;
        case "DI":
            return {
                style: {
                    borderColor: "darkgray",
                    color: "white",
                    backgroundColor: "dodgerblue",
                },
            };
            break;
        case "CR":
            return {
                style: {
                    borderColor: "darkgray",
                    color: "white",
                    backgroundColor: "limegreen",
                },
            };
            break;
        case "PA":
            return {
                style: {
                    borderColor: "darkgray",
                    color: "white",
                    backgroundColor: "blueviolet",
                },
            };
            break;
        case "NN":
            return {
                style: {
                    borderColor: "darkgray",
                    color: "white",
                    backgroundColor: "darkslategray",
                },
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

export default function AimBadge({ aiming }) {
    const classes = useStyles();
    return (
        <Chip
            className={classes.root}
            style={BadgeColor(aiming).style}
            label={aiming}
            clickable
            icon={<StarRoundedIcon style={{ color: "white" }} />}
        />
    );
}
