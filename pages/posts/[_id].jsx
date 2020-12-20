import React, { useContext, useEffect, useState } from "react";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Hidden,
    Grid,
    Button,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import SkillBadge from "../../components/SkillBadge";
import ProgressButton from "../../components/ApplyButton";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../utils/authContext";
import Breaker from "../../components/Breaker";
import moment from "moment";

export async function getStaticPaths() {
    // get list of post to populate paths
    let posts = await getPosts();
    let paths = posts.map((post) => `/posts/${post._id}`);
    return {
        paths,
        fallback: false,
    };
}

const getPosts = async () => {
    let posts = await axios.get(
        "https://aim4hd.herokuapp.com/api/v1/posts?limit=300"
    );
    return posts.data.data.posts;
};

const getPost = async (_id) => {
    let post = await axios.get(
        `https://aim4hd.herokuapp.com/api/v1/posts/${_id}`
    );
    return post.data.data.post;
};

export async function getStaticProps({ params }) {
    let res = await getPost(params._id);
    return {
        props: res,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 400,
        // maxWidth: 700,
        borderRadius: 7,
        paddingBottom: theme.spacing(2),
        // padding: theme.spacing(2),
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    content: {
        paddingTop: theme.spacing(2),
    },
    action: {
        // backgroundColor: "red",
        // display: "inline-block",
        // flex: "0 1 auto",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        flex: "0 1 auto",
    },
    title: {
        fontWeight: 400,
        fontSize: 24,
        minWidth: 130,
    },
    bottom: {
        flexWrap: "wrap",
        // overflowX: "hidden",
        justifyContent: "flex-end",
    },
    button: {
        width: "100%",
    },
    bottomAction: {
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        paddingLeft: "0.6rem",
        paddingRight: "0.6rem",
        paddingBottom: "0.6rem",
    },
    buttonsContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: "60%",
        minWidth: "300px",
    },
    skillsContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    commentText: {
        fontSize: "16px",
        padding: "16px",
        paddingBottom: "0px",
        paddingTop: "0px",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
        },
    },
    titleLink: {
        color: theme.palette.primary,
        backgroundColor: theme.palette.primary,
    },
}));

function PostPage({
    isOpen,
    createdAt,
    _id,
    author,
    title,
    content,
    aiming,
    requiredSkills,
    currentMember,
    maximumMember,
    course,
    numberOfComments,
    appliedStudents,
}) {
    const classes = useStyles();
    const context = useContext(AuthContext);
    return (
        <Container maxWidth="lg">
            <Card className={classes.root}>
                <CardHeader
                    classes={{ action: classes.action, title: classes.title }}
                    avatar={
                        <Avatar
                            alt={author.name}
                            src={author.avatar}
                            className={classes.avatar}
                        ></Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    action={
                        <Typography paragraph>
                            {moment(createdAt).format("DD-MM-YYYY")}
                        </Typography>
                    }
                    title={author.name}
                    subheader={author.school}
                />
                <div className={classes.skillsContainer}>
                    <Typography variant="h6" style={{ marginBottom: "10px" }}>
                        Required Skills:{" "}
                    </Typography>
                    {requiredSkills.map((skill, idx) => {
                        return (
                            <SkillBadge key={skill.name} label={skill.name} />
                        );
                    })}
                </div>
                <Breaker />
                {context.user ? (
                    <Grid
                        container
                        spacing={3}
                        className={classes.buttonsContainer}
                    >
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                className={classes.button}
                                startIcon={<BookmarkIcon />}
                            >
                                Save It
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <ProgressButton
                                postId={_id}
                                appliedStudents={appliedStudents}
                            />
                        </Grid>
                    </Grid>
                ) : null}
                <CardContent className={classes.content}>
                    <Typography variant="h4" component="h2">
                        {title}
                    </Typography>
                    <Typography paragraph variant="body1" component="p">
                        {content}
                    </Typography>
                </CardContent>
                <Breaker />
                {/* member list */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px",
                    }}
                >
                    <Link href={`/posts/${_id}`}>
                        <Typography
                            variant="caption"
                            align="right"
                            className={classes.commentText}
                            component="a"
                        >
                            {numberOfComments} comments
                        </Typography>
                    </Link>
                    <Link href={`/posts/${_id}`}>
                        <Typography
                            variant="caption"
                            align="right"
                            className={classes.commentText}
                            component="a"
                        >
                            recruiting {maximumMember - currentMember}/{""}
                            {maximumMember} members
                        </Typography>
                    </Link>
                </div>
            </Card>
        </Container>
    );
}

export default PostPage;
