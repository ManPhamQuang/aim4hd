//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import LeftProfile from "../components/LeftProfile";
import CenterProfile from "../components/CenterProfile";
//* Styling import
import { Grid } from "@material-ui/core";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UserProfile() {
	const [user, setUser] = useState({});
	useEffect(() => {
		axios
			.get("https://aim4hd.herokuapp.com/api/v1/users/5fab4912ffd1131f3cace694")
			.then((res) => setUser(res.data.data.user))
			.catch((err) => console.log(err));
	}, []);
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
			<Grid item xs={12} md={3}>
				<LeftProfile user={user}/>
			</Grid>
			<Grid item xs={11} md={5}>
                <CenterProfile user={user}/>
			</Grid>
			<Grid item xs={false} md={4}>
				{/* suggested users - for later */}
			</Grid>
		</Grid>
		</React.Fragment>
	);
}
