import React from "react";
import PostCard from "./PostCard";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const data = [
    {
        author: "huynh van anh",
        major: "Information Technology",
        skills: ["HTML", "Web Fullstack", "React.js"],
        title: "I need two more member for my team",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quos deserunt nulla consectetur voluptatem magnam! Vitae autem laborum sequi reprehenderit magnam, nemo facere vel natus eligendi consectetur ipsum quas maxime.",
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));
export default function Posts() {
    const classes = useStyles();
    return (
        <Container
            style={{ backgroundColor: "#cfe8fc" }}
            className={classes.root}
        >
            {data.map((post) => (
                <PostCard {...post} />
            ))}
        </Container>
    );
}
