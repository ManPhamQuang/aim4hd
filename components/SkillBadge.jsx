import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";

const useStyles = makeStyles({
	root: {
		marginRight: "5px",
		marginBottom: "3px",
	},
});

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const generateRandomColor = () => {
	switch (getRndInteger(1, 6)) {
		case 1:
			return {
				style: {
					borderColor: "lightcoral",
					color: "white",
					backgroundColor: "lightcoral",
				},
			};
			break;
		case 2:
			return {
				style: {
					borderColor: "	mediumpurple",
					color: "white",
					backgroundColor: "	mediumpurple",
				},
			};
			break;
		case 3:
			return {
				style: {
					borderColor: "	tomato",
					color: "white",
					backgroundColor: "	tomato",
				},
			};
			break;
		case 4:
			return {
				style: {
					borderColor: "	cornflowerblue",
					color: "white",
					backgroundColor: "	cornflowerblue",
				},
			};
			break;
		case 5:
			return {
				style: {
					borderColor: "darkturquoise",
					color: "white",
					backgroundColor: "darkturquoise",
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

export default function SkillBadge({ label }) {
	const classes = useStyles();
	return (
		<Chip
			className={classes.root}
			// color={green}
			// color={generateRandomColor().color}
			style={generateRandomColor().style}
			label={label}
		/>
	);
}
