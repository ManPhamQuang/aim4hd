//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";

//*Styling import
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
        margin: theme.spacing(4),
        backgroundColor: 'white',
		justifyContent: "center",
        alignItems: "center",
    },
    overview:{
		margin: theme.spacing(4),
		alignItems: "left",
		marginBottom: "10%",
        marginTop: "10%",
        marginLeft:"5%",

    },
	about: {
		margin: theme.spacing(4),
		alignItems: "left",
		marginBottom: "10%",
        marginTop: "10%",
        marginLeft:"20%",
    },
    content:{
        margin: theme.spacing(4),
        alignItems: "left",
        marginBottom: "10%",
        marginTop: "10%",
        marginLeft:"20%",

    },
    skill:{
		margin: theme.spacing(4),
		marginBottom: "10%",
        marginTop: "10%",
        marginLeft:"20%",
    }
}));

export default function CenterProfile(){
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={classes.overview}>
				<Typography
					variant="h3"
					style={{ fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}
				>
					Overview
				</Typography>
            </div>
            <hr/>
            <div className={classes.about}>
                <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}
                >
                    About
                </Typography>
            </div>
            <div className={classes.content}>
                <Typography
                    variant="h6"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore est perspiciatis aliquam quas. Laborum quas dolor delectus, culpa aliquam sequi architecto nam sapiente dicta molestiae harum quis doloremque! Vero, repudiandae?
                </Typography>
            </div>
            <hr/>
            <div className={classes.about}>
                <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}
                >
                    Skill
                </Typography>
            </div>
            <div className={classes.content}>
                <Typography
                    variant="h6"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe maxime adipisci nesciunt consectetur incidunt molestiae. Non repellendus, adipisci cum eveniet aliquid dolore rem, inventore provident eaque sequi quidem voluptate?
                </Typography>
            </div>
            
		 
        </div>
    );
}
