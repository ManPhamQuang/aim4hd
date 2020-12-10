//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import LeftGroup from "../components/LeftGroup";
import CenterGroup from "../components/CenterGroup";
//* Styling import
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GroupPage() {
	// const [group, setGroup] = useState({});
	// useEffect(() => {
	//     axios
	//         .get(
	//             "https://aim4hd.herokuapp.com/api/v1/users/5fab4912ffd1131f3cace694"
	//         )
	//         .then((res) => setUser(res.data.data.user))
	//         .catch((err) => console.log(err));
	// }, []);
	const team = {
		name: "aim4hd",
		avatar: "link image",
		members: [
			{
				name: "man pham",
			},
			{
				name: "Lam Phuong",
			},
			{
				name: "Thang",
			},
			{
				name: "Thien An",
			},
		],
		description: "Lorem",
		courses: [
			{
				name: " Introduction to IT",
			},
		],
	};
	return (
		<React.Fragment>
			<Head>
				<title>Group name | AimforHD</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<Grid container justify="center">
				<Grid item xs={11} md={3}>
					<LeftGroup />
				</Grid>
				<Grid item xs={11} md={5}>
					<CenterGroup team={team} />
				</Grid>
				<Grid item xs={false} md={4}>
					{/* suggested users - for later */}
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
