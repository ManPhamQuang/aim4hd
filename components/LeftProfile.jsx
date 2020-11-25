//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";
//* Styling import
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		margin: theme.spacing(4),
		justifyContent: "center",
		alignItems: "center",
	},
	profile_picture: {
		width: theme.spacing(23),
		height: theme.spacing(23),
	},
	logo: {
		fontSize: "3rem",
	},
}));

export default function UserProfile() {
	const classes = useStyles();
	const [user, setUser] = useState({});
	useEffect(() => {
		axios
			.get("https://aim4hd.herokuapp.com/api/v1/users/5fab4912ffd1131f3cace691")
			.then((res) => setUser(res.data.data.user))
			.catch((err) => console.log(err));
	});
	return (
		<div>
			<div className={classes.root}>
				<Avatar
					alt="User avatar"
					src={user.avatar}
					className={classes.profile_picture}
				/>
			</div>
			<div className={classes.root}>
				<Typography variant="h3" align="center">
					{user.name}
				</Typography>
			</div>
			<div className={classes.root}>
				<Typography variant="h5" align="center">
					{user.major}
				</Typography>
			</div>

			<div className={classes.root}>
				<IconButton
					aria-label="Facebook.com"
					onClick={() => window.open("https://www.facebook.com")}
				>
					<FacebookIcon style={{ fill: "#1877F2" }} className={classes.logo} />
				</IconButton>

				<IconButton
					aria-label="Instagram.com"
					onClick={() => window.open("https://www.instagram.com")}
				>
					<InstagramIcon style={{ fill: "#E74159" }} className={classes.logo} />
				</IconButton>

				<IconButton
					aria-label="Linkedin.com"
					onClick={() => window.open("https://www.Linkedin.com")}
				>
					<LinkedInIcon style={{ fill: "#006699" }} className={classes.logo} />
				</IconButton>
			</div>
		</div>
	);
}
