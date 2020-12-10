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
				image:"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
            },
            {
				name: "Lam Phuong",
				image:"https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/s1080x2048/120219815_2711848469028177_1267074794249366109_o.jpg?_nc_cat=111&ccb=2&_nc_sid=8bfeb9&_nc_ohc=JwkRenicmcYAX-9ArDN&_nc_ht=scontent.fsgn2-1.fna&tp=7&oh=17bfc9bd0c5269c5e72aa0a024335d07&oe=5FF665D6",
            },
            {
				name: "Thang",
				image:"https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/39760744_1110452755772225_29803121664327680_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=uKgdCj8AKQkAX8VPYOj&_nc_ht=scontent.fsgn2-4.fna&oh=b55200bcfb328f1d4024c6ee685bc8fc&oe=5FF6746B",
            },
            {
				name: "Thien An",
				image:"https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/s1080x2048/92954613_2472736239723249_2665763270073253888_o.jpg?_nc_cat=105&ccb=2&_nc_sid=174925&_nc_ohc=StLTe9xkBxwAX-5m9lW&_nc_ht=scontent.fsgn2-1.fna&tp=7&oh=44f4a50ba6eec892d40b1a2fee2fc419&oe=5FF774EB"
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
                    <LeftGroup team={team} />
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
