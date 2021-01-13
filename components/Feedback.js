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
import { makeStyles } from "@material-ui/core/styles";
import FeedbackDialog from "./FeedbackDialog";
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
    const [isLoading, setIsLoading] = useState(false);
    const [chosenStudent, setChosenStudent] = useState(null);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        const getAllPostsAdmitted = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://aim4hd.herokuapp.com/api/v1/users/${user.id}/posts`
                );
                console.log(response);
                setPosts(response.data.data.posts);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getAllPostsAdmitted();
    }, [user]);
    console.log(posts);

    return (
        <div className={classes.root}>
            <Container className={classes.info} fixed>
                Note: *Feeback will be available after you or your teammates
                closed post and 3 weeks have passed since then.
            </Container>
            {isLoading && (
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            )}
            <FeedbackDialog
                author={user}
                user={chosenStudent}
                open={!!chosenStudent}
                setOpen={setChosenStudent}
            />
            {posts.length > 0 &&
                !isLoading &&
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
                            {post.approvedMembers
                                .filter((member) => member.id !== user.id)
                                .map((member) => (
                                    <Chip
                                        key={member.id}
                                        variant="outlined"
                                        avatar={<Avatar src={member.avatar} />}
                                        label={member.name}
                                        onDelete={(e) =>
                                            setChosenStudent(member)
                                        }
                                        deleteIcon={<FeedbackOutlinedIcon />}
                                    />
                                ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
        </div>
    );
};

export default Feedback;
