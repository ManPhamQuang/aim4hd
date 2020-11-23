import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const data = [
    {
        author: "Huynh Van Anh",
        major: "Information Technology",
        skills: ["HTML", "CSS", "React.js"],
        title: "I need two more member for my team",
        avatar:
            "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/122011102_1469051093304410_451830840054431871_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=sxu8LSivNd4AX94mBcR&_nc_ht=scontent.fsgn5-5.fna&oh=4fa2189588d43fdb7eba7f337dc17fab&oe=5FD9604D",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quos deserunt nulla consectetur voluptatem magnam! Vitae autem laborum sequi reprehenderit magnam, nemo facere vel natus eligendi consectetur ipsum quas maxime.",
    },
    {
        author: "Lam Phuong",
        major: "Fashion Design",
        skills: ["HTML", "CSS", "Java", "Cheerleading", "React.js"],
        title: "Frontend developer needed",
        avatar:
            "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/116707843_2661908164022208_484094272993460414_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=4EiLuOpuEgsAX8CBN1N&_nc_ht=scontent.fsgn5-3.fna&oh=10b7b8b8829bf5ed206fa8f725e5894a&oe=5FD7946E",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quos deserunt nulla consectetur voluptatem magnam! Vitae autem laborum sequi reprehenderit magnam, nemo facere vel natus eligendi consectetur ipsum quas maxime.",
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
}));
export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get("https://aim4hd.herokuapp.com/api/v1/posts")
            .then((res) => {
                setPosts(res.data.data.posts);
                console.log(res.data.data.posts);
            })
            .catch((err) => console.log(err));
    }, []);
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={4}>
            {posts.map((post) => (
                <Grid item key={post._id}>
                    <PostCard {...post} />
                </Grid>
            ))}
        </Grid>
    );
}
