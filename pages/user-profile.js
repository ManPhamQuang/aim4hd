//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import LeftProfile from "../components/LeftProfile";
import CenterProfile from "../components/CenterProfile";
//* Styling import
import { Grid } from "@material-ui/core";

export default function UserProfile() {
	return (
		<Grid container justify="center">
			<Grid item xs={12} md={3}>
				<LeftProfile />
			</Grid>
			<Grid item xs={11} md={5}>
				{/* center user description */}
                <CenterProfile/>
			</Grid>
			<Grid item xs={false} md={4}>
				{/* suggested users - for later */}
			</Grid>
		</Grid>
	);
}
