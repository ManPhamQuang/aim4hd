//* Components import 
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from 'axios'
import React, {useState, useEffect} from 'react'
//* Styling import 
import Avatar from '@material-ui/core/Avatar';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';  

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
          "justify": 'center'
      }
    },
    small: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: theme.spacing(3)
    }
    
  }));


export default function UserProfile() {
    const classes = useStyles();
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get("https://aim4hd.herokuapp.com/api/v1/users/5fab4912ffd1131f3cace691")
        .then(res => setUser(res.data.data.user))
        .catch(err => console.log(err))
    })
    return (
        <Grid container justify="center">
            <Grid item xs={12} md={3} >
            {/* Leftside user info */}
            <div className={classes.root}>
            <Avatar alt="User avatar" src={user.avatar} className={classes.small} />
            <Typography variant="h3" align="center">{user.name}</Typography>
            </div>
            
            
            
            </Grid>
            <Grid item xs={11} md={5}>
                {/* center user description */}
            </Grid>
            <Grid item xs={false} md={4}>
                {/* suggested users - for later */}
            </Grid>
        </Grid>
    );
}
