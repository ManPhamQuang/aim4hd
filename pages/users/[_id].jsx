//* Components import
import Head from "next/head";
import Posts from "../../components/Posts";
import Filter from "../../components/Filter";
import LeftProfile from "../../components/LeftProfile";
import CenterProfile from "../../components/CenterProfile";
//* Styling import
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";

export async function getStaticPaths() {
	// get list of post to populate paths
	let users = await getUsers();
	let paths = users.map((user) => `/users/${user._id}`);
	return {
		paths,
		fallback: false,
	};
}

const getUsers = async () => {
	let users = await axios.get(
		"https://aim4hd.herokuapp.com/api/v1/users?limit=10000"
	);
	return users.data.data.user;
};

const getUser = async (_id) => {
	let post = await axios.get(
		`https://aim4hd.herokuapp.com/api/v1/users/${_id}`
	);
	return post.data.data;
};
const feedback = {
	numberOfRecommended: "3",
	reviewers: [
		{
			name: "Man Pham",
			image:
				"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
			comment: "This girl working really hard. Highly recommended.",
			isAnonymous: false,
			isRecommended: true,
		},
		{
			name: "Nguyen Dang Lam Phuong",
			image:
				"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
			comment:
				"It is not easy to communicate with this girl because she often has conflicts with teammates.",
			isAnonymous: true,
			isRecommended: false,
		},
	],
};

export async function getStaticProps({ params }) {
	let res = await getUser(params._id);
	return {
		props: res,
	};
}

export default function UserProfile({ user }) {
	// const [user, setUser] = useState({});
	// useEffect(() => {
	//     axios
	//         .get(
	//             "https://aim4hd.herokuapp.com/api/v1/users/5fab4912ffd1131f3cace694"
	//         )
	//         .then((res) => setUser(res.data.data.user))
	//         .catch((err) => console.log(err));
	// }, []);

	return (
		<React.Fragment>
			<Head>
				<title>{user.name} | AimforHD</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<Grid container justify="center">
				<Grid item xs={11} md={3}>
					<LeftProfile user={user} />
				</Grid>
				<Grid item xs={11} md={5}>
					<CenterProfile user={user} feedback={feedback} />
				</Grid>
				<Grid item xs={false} md={4}>
					{/* suggested users - for later */}
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
