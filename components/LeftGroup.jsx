//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		margin: theme.spacing(2),
		justifyContent: "center",
	},
	container: {
		[theme.breakpoints.down("sm")]: {
			borderRadius: "8px",
			backgroundColor: "#ffffff",
			paddingTop: "0.5rem",
			paddingBottom: "0.5rem",
			marginBottom: "1.5rem",
		},
		[theme.breakpoints.up("md")]: {
			marginLeft: "1rem",
			marginRight: "1rem",
		},
	},
	profile_picture: {
		width: theme.spacing(23),
		height: theme.spacing(23),
	},
	logo: {
		fontSize: "3rem",
	},
	logo2: {
		fontSize: "2rem",
	},
	info: {
		fontSize: "1rem",
	},
	contactInfo: {
		display: "flex",
		marginLeft: "15%",
		marginBottom: "2%",
		marginTop: "2%",
	},
}));
const ColorLine = ({ color }) => (
	<hr
		style={{
			borderStyle: "none",
			backgroundColor: color,
			height: 2.5,
			width: "100%",
		}}
	/>
);

export default function LeftGroup() {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.root}>
				<Avatar alt="Group avatar" className={classes.profile_picture}>
					N
				</Avatar>
			</div>
			<div className={classes.root}>
				<Typography variant="h5" align="center" style={{ fontWeight: "bold" }}>
					Group name
				</Typography>
			</div>
			<div className={classes.root}>
				<Typography variant="h6" align="center">
					Course name
				</Typography>
			</div>
			<Hidden mdUp>
				<ColorLine color="#f2f2f2" />
			</Hidden>
			<Hidden smDown>
				<ColorLine color="#e5e5e5" />
			</Hidden>
			<div className={classes.contactInfo}>
				<Typography
					variant="h6"
					style={{
						fontWeight: "bold",
					}}
				>
					Group Information
				</Typography>
			</div>
			<ColorLine color="#d6072b" />
		</div>
	);
}
