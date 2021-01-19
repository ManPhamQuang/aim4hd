import React, { useContext } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SkillBadge from "./SkillBadge";
import { Box, Button, Container, Grid, Hidden } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SendIcon from "@material-ui/icons/Send";
import Link from "next/link";
import ProgressButton from "./ApplyButton";
import AuthContext from "../../utils/authContext";
import AimBadge from "./AimBadge";
const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 400,
        // maxWidth: 700,
        borderRadius: 7,
    },
    userCard: theme.userCard,
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
        "&:hover": {
            cursor: "pointer",
        },
    },
    content: {
        paddingTop: "0px",
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
        fontSize: 19,
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
        // color: theme.color.prim
        // [theme.breakpoints.up("md")]: {
        //     maxWidth: 250,
        // },
        // flexGrow: 1,
        // maxWidth: 200,
        // minWidth: 145,
        width: "100%",
    },
    bottomAction: {
        // flex: "0 1 auto",
        display: "flex",
        width: "100%",
        // paddingLeft: "8px",
        justifyContent: "space-around",
        paddingLeft: "0.6rem",
        paddingRight: "0.6rem",
        paddingBottom: "0.6rem",
    },
    buttonsContainer: {
        padding: theme.spacing(2),
        // paddingLeft: theme.spacing(3),
        // paddingRight: theme.spacing(3),
        // marginBottom: theme.spacing(3),
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
        // color: theme.palette.primary,
        // backgroundColor: theme.palette.primary,
        fontWeight: "bold",
        textDecoration: "none",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
        },
    },
}));

export default function PostCard({
    isOpen,
    createdAt,
    _id,
    author,
    title,
    content,
    aiming,
    currentMember,
    maximumMember,
    course,
    numberOfComments,
    appliedStudents,
    requiredSkills,
}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const context = useContext(AuthContext);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const skillBadges = () => {
        return (
            <Hidden xsDown>
                {skills.map((skill) => (
                    <SkillBadge key={skill.name} label={skill.name} />
                ))}
            </Hidden>
        );
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                classes={{
                    action: classes.action,
                    title: classes.title,
                }}
                avatar={
                    <Link href={`/users/${author._id}`}>
                        <Avatar
                            alt={author.name}
                            src={author.avatar}
                            className={classes.avatar}
                        />
                    </Link>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                action={
                    <Hidden xsDown>
                        {/* desktop */}
                        {requiredSkills.map((skill, idx) => {
                            if (idx < 4) {
                                return (
                                    <SkillBadge
                                        key={skill.name}
                                        label={skill.name}
                                    />
                                );
                            }
                        })}
                    </Hidden>
                }
                title={
                    <Link href={`/users/${author._id}`}>
                        <Typography variant="h6">{author.name}</Typography>
                    </Link>
                }
                subheader={author.school}
            />
            <CardContent className={classes.content}>
                <Typography variant="h5" component="h2">
                    {title} - <AimBadge aiming={aiming} />
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                    {content}
                </Typography>
                <Link href={`/posts/${_id}`}>
                    <Typography variant="a" className={classes.titleLink}>
                        Read more
                    </Typography>
                </Link>
            </CardContent>
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
                    {currentMember ? (
                        <Typography
                            variant="caption"
                            align="right"
                            className={classes.commentText}
                            component="a"
                        >
                            recruiting {maximumMember - currentMember}/{""}
                            {maximumMember} members
                        </Typography>
                    ) : (
                        <Typography
                            variant="caption"
                            align="right"
                            className={classes.commentText}
                            component="a"
                        >
                            recruiting {maximumMember} members
                        </Typography>
                    )}
                </Link>
            </div>
            {/* <MUILink
                component={Link}
                href="/about"
                className={classes.commentText}
            >
                3 comments
            </MUILink> */}
            <CardActions className={classes.bottom} disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton> */}
                <Hidden smUp>
                    {/* mobile */}
                    {requiredSkills.map((skill, idx) => {
                        if (idx < 4) {
                            return (
                                <SkillBadge
                                    key={skill._id}
                                    label={skill.name}
                                />
                            );
                        }
                    })}
                </Hidden>
            </CardActions>
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
            {/* <Box className={classes.bottomAction}>
                <Button variant="contained" className={classes.button}>
                    Save It
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                >
                    Apply
                </Button>
            </Box> */}
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                    </Typography>
                </CardContent>
            </Collapse> */}
        </Card>
    );
}