import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FeedbackDialog from "./FeedbackDialog";
import LoadingSpinner from "./LoadingSpinner";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "12px",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    summary: {
        flexWrap: "wrap",
        "& > div": {
            "&:not(:last-child)": {
                marginRight: "1.2rem",
            },
        },
    },
    progress: {
        display: "flex",
        justifyContent: "center",
    },
    info: { marginBottom: "10px", color: "red", textAlign: "right" },
}));

const Feedback = ({ user }) => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [chosenStudent, setChosenStudent] = useState(null);
    const [content, setContent] = useState({
        isRecommended: true,
        isAnonymous: false,
        feedback: "",
    });
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangeStudent = (student) => {
        setContent({
            isRecommended: true,
            isAnonymous: false,
            feedback: "",
        });
        setChosenStudent(student);
    };

    const handleSubmitFeedback = async () => {
        const { isRecommended, isAnonymous, feedback } = content;
        const data = {
            comment: feedback,
            isRecommended,
            isAnonymous,
            author: user.id,
            user: chosenStudent.id,
        };
        setIsLoading(true);
        try {
            const response = await axios.post(
                `https://aim4hd.herokuapp.com/api/v1/users/${chosenStudent.id}/feedbacks`,
                data
            );
            const responseData = response.data;
            if (responseData.status === "success") {
                const newPosts = [...posts].map((post) => {
                    post.approvedMembers = post.approvedMembers.filter(
                        (member) => member.id !== chosenStudent.id
                    );
                    return post;
                });
                setIsLoading(false);
                setPosts(newPosts);
                handleChangeStudent(null);
                setTimeout(
                    () => alert("Successfully provide feedback to user"),
                    0
                );
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        let source = axios.CancelToken.source();
        const getAllPostsAdmitted = async () => {
            setIsFetching(true);
            try {
                const getPostsAdmitted = axios.get(
                    `https://aim4hd.herokuapp.com/api/v1/users/${user.id}/posts`
                );
                const getFeedbacksOfUser = axios.get(
                    `https://aim4hd.herokuapp.com/api/v1/users/${user.id}/feedbacks?author=true`
                );
                const result = await axios.all(
                    [getPostsAdmitted, getFeedbacksOfUser],
                    { cancelToken: source.token }
                );
                const posts = result[0].data.data.posts;
                const feedbacks = result[1].data.data.feedbacks;
                let data = posts.map((post) => {
                    post.approvedMembers = post.approvedMembers.filter(
                        (member) => member.id !== user.id
                    );
                    return post;
                });
                if (feedbacks.length > 0) {
                    console.log(data);
                    feedbacks.forEach((feedback) =>
                        data.forEach((post) => {
                            post.approvedMembers = post.approvedMembers.filter(
                                (member) => member.id !== feedback.user
                            );
                        })
                    );
                }
                setPosts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetching(false);
            }
        };
        getAllPostsAdmitted();
        return () => {
            source.cancel();
        };
    }, [user]);

    return (
        <div className={classes.root}>
            <Container className={classes.info} fixed>
                Note: *Feeback will be available after you or your teammates
                closed post and 3 weeks have passed since then.
            </Container>
            {isFetching && (
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            )}
            <LoadingSpinner isLoading={isLoading} />
            <FeedbackDialog
                author={user}
                user={chosenStudent}
                open={!!chosenStudent}
                setOpen={handleChangeStudent}
                content={content}
                setContent={setContent}
                handleSubmitFeedback={handleSubmitFeedback}
            />
            {posts.length > 0 &&
                !isFetching &&
                posts.map((post) => (
                    <Accordion
                        key={post.id}
                        expanded={expanded === post.id}
                        onChange={handleChange(post.id)}
                        disabled={!!!post.closedAt}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${post.id}-content`}
                            id={`${post.id}-header`}
                        >
                            <Typography className={classes.heading}>
                                {post.course.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.summary}>
                            {post.approvedMembers.length > 0 ? (
                                post.approvedMembers.map((member) => (
                                    <Chip
                                        key={member.id}
                                        variant="outlined"
                                        avatar={<Avatar src={member.avatar} />}
                                        label={member.name}
                                        onDelete={() =>
                                            handleChangeStudent(member)
                                        }
                                        deleteIcon={<FeedbackOutlinedIcon />}
                                    />
                                ))
                            ) : (
                                <Grid container justify="center">
                                    Done
                                </Grid>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
        </div>
    );
};

export default Feedback;
