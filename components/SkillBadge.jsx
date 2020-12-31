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
	switch (getRndInteger(1, 11)) {
		case 1:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "lightcoral",
				},
			};
			break;
		case 2:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "	mediumpurple",
				},
			};
			break;
		case 3:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "	tomato",
				},
			};
			break;
		case 4:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "	cornflowerblue",
				},
			};
			break;
		case 5:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "darkturquoise",
				},
			};
			break;
		case 6:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "	rosybrown",
				},
			};
			break;
		case 7:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "sandybrown",
				},
			};
			break;
		case 8:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "palevioletred",
				},
			};
			break;
		case 9:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "mediumslateblue",
				},
			};
			break;
		case 10:
			return {
				style: {
					borderColor: "	darkgray",
					color: "white",
					backgroundColor: "indianred",
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
			clickable
		/>
	);
}
