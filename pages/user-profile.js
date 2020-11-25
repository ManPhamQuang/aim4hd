import Head from "next/head";
import { Grid } from "@material-ui/core";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';

export default function UserProfile() {
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get("https://aim4hd.herokuapp.com/api/v1/users/5fab4912ffd1131f3cace691")
        .then(res => setUser(res.data.data.user))
        .catch(err => console.log(err))
    })
    return (
        <Grid container justify="center">
            <Grid item xs={12} md={3}>
            <Avatar alt="Remy Sharp" src={user.avatar} />
                {/* Leftside user info */}
            </Grid>
            <Grid item xs={11} md={5}>
                {/* center user description */}
                <h1>{user.name}</h1>
            </Grid>
            <Grid item xs={false} md={4}>
                {/* suggested users - for later */}
            </Grid>
        </Grid>
    );
}
