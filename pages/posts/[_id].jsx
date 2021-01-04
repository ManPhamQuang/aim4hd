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
	Tooltip,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	GridListTileBar,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import SkillBadge from "../../components/SkillBadge";
import AimBadge from "../../components/AimBadge";
import ProgressButton from "../../components/ApplyButton";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../utils/authContext";
import Breaker from "../../components/Breaker";
import moment from "moment";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PostComments from "../../components/PostComments";

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
		revalidate: 1,
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
		[theme.breakpoints.down("sm")]: {
			width: theme.spacing(6),
			height: theme.spacing(6),
		},
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
		"&:hover": {
			textDecoration: "underline",
			cursor: "pointer",
		},
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
	infoContainer: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
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
	studentList: {
		width: "100%",
	},
	date: {
		fontSize: "1.5rem",
		[theme.breakpoints.down("xs")]: {
			fontSize: "12px",
			marginTop: "1rem",
		},
		minWidth: "80px",
	},
	icon: {
		fontSize: "20px",
		[theme.breakpoints.down("xs")]: {
			fontSize: "12px",
		},
		marginTop: "2px",
	},
	userCard: theme.userCard,
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
    const UserCard = ({ student }) => {
        return (
            <Link href={`/users/${student._id}`}>
                <ListItem className={classes.userCard}>
                    <ListItemAvatar>
                        <Avatar
                            alt={student.name}
                            src={student.avatar}
                        ></Avatar>
                    </ListItemAvatar>
                    <ListItemText>{student.name}</ListItemText>
                </ListItem>
            </Link>
        );
    };
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
                        <Typography className={classes.date} paragraph>
                            {moment(createdAt).format("DD-MM-YYYY")} {"  "}
                            {isOpen ? (
                                <Tooltip title="This post is open for apply">
                                    <CheckCircleOutlineIcon
                                        className={classes.icon}
                                        color="primary"
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title="This post is not open for apply">
                                    <CheckCircleOutlineIcon
                                        className={classes.icon}
                                        color="disabled"
                                    />
                                </Tooltip>
                            )}
                        </Typography>
                    }
                    title={
                        <Link href={`/users/${author._id}`}>
                            <Typography variant="h6">{author.name}</Typography>
                        </Link>
                    }
                    subheader={author.school}
                />
                <Grid container className={classes.infoContainer}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h6"
                            style={{ marginBottom: "10px" }}
                        >
                            Aiming:
                        </Typography>
                        <Chip
                            label={aiming}
                            color="primary"
                            icon={<HighlightOffIcon />}
                        />
                        <Typography
                            variant="h6"
                            style={{ marginBottom: "10px" }}
                        >
                            Required Skills:{" "}
                        </Typography>
                        {requiredSkills.map((skill, idx) => {
                            return (
                                <SkillBadge
                                    key={skill.name}
                                    label={skill.name}
                                />
                            );
                        })}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h6"
                            style={{ marginBottom: "10px" }}
                        >
                            Current members:
                        </Typography>
                        {appliedStudents? (
                            <List className={classes.studentList}>
                                {appliedStudents.map((student) => (
                                    <UserCard
                                        student={student}
                                        key={student._id}
                                    />
                                ))}
                            </List>
                        ) : (
                            <Typography variant="h7">No member yet</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h6"
                            style={{ marginBottom: "10px" }}
                        >
                            Course:
                        </Typography>
                        <List className={classes.studentList}>
                            <ListItem>
                                {course ? (
                                    <ListItemText>
                                        {course.name} - {course.code}
                                    </ListItemText>
                                ) : null}
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
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
                                isOpen={isOpen}
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

				<Typography
					variant="caption"
					align="right"
					className={classes.commentText}
					component="a"
				>
					{numberOfComments} comments
				</Typography>
				<PostComments _id={_id} />
			</Card>
		</Container>
	);
}

export default PostPage;
