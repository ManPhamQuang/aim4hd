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
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "12px",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        // flexBasis: "50%",
        // flexShrink: 0,
    },
    // secondaryHeading: {
    //     fontSize: theme.typography.pxToRem(15),
    //     color: theme.palette.text.secondary,
    // },
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
}));

const Feedback = ({ user }) => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
            <div
                style={{
                    textAlign: "right",
                    marginBottom: "10px",
                    color: "red",
                }}
            >
                Note: *Feeback will be available after you or your teammates
                closed post and 3 weeks have passed since then.
            </div>
            {isLoading && (
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            )}
            {posts.length > 0 &&
                posts.map((post) => (
                    <Accordion
                        expanded={expanded === post.id}
                        onChange={handleChange(post.id)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${post.id}-content`}
                            id={`${post.id}-header`}
                        >
                            <Typography className={classes.heading}>
                                {post.course.name}
                            </Typography>
                            {/* <Typography className={classes.secondaryHeading}>
                                {post.title}
                            </Typography> */}
                        </AccordionSummary>
                        <AccordionDetails className={classes.summary}>
                            {post.approvedMembers
                                .filter((member) => member.id !== user.id)
                                .map((member) => (
                                    <Chip
                                        variant="outlined"
                                        avatar={<Avatar src={member.avatar} />}
                                        label={member.name}
                                        onDelete={(e) =>
                                            console.log("I was clicked")
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
