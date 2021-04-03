//* Components import
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//*Styling import
import Tabs from "@material-ui/core/Tabs";
import Avatar from "@material-ui/core/Avatar";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { List } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        marginLeft: "2%",
        marginRight: "2%",
        borderRadius: "0px 0px 8px 8px",
        paddingBottom: "20px",
    },
    title: {
        color: "white",
        fontWeight: "500",
    },
    titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
    root2: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    modal: {
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal2: {
        position: "relative",
        marginTop: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
    },
    about: {
        marginLeft: "4%",
        marginTop: "3%",
        marginRight: "20px",
    },
}));

const Accordion = withStyles({
    root: {
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
        "&$expanded": {
            margin: "auto",
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: "rgba(0, 0, 0, .03)",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56,
        },
    },
    content: {
        "&$expanded": {
            margin: "12px 0",
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme2) => ({
    root: {
        padding: theme2.spacing(2),
        flexWrap: "wrap",
    },
}))(MuiAccordionDetails);

export default function RightProfile({ history, user }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [imgPath, setimgPath] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get(`https://aim4hd.herokuapp.com/api/v1/users/${user._id}/posts`)
            .then((res) => setPosts(res.data.data.posts))
            .catch((err) => console.log(err));
    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange2 = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleOpen = (e) => {
        setimgPath(e.target.src);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const BigImage = (
        <div className={classes.modal}>
            <img
                src={imgPath}
                onClick={handleOpen}
                border="1"
                style={{
                    height: "100%",
                    width: "100%",
                }}
            />
        </div>
    );

    const ColorLine = ({ color }) => (
        <hr
            style={{
                borderStyle: "none",
                backgroundColor: "#f2f2f2",
                height: 4,
                width: "100%",
            }}
        />
    );

    return (
        <Paper className={classes.root} variant="outlined">
            <AppBar
                position="static"
                style={{
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: "none",
                }}
            >
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="My achievement" />
                </Tabs>
            </AppBar>
            <div className={classes.root2}>
                <GridList cellHeight={180} spacing={7}>
                    {history.images.map((image) => (
                        <GridListTile key={image.title}>
                            <img
                                src={image.link}
                                alt={image.title}
                                onClick={handleOpen}
                                border="1"
                                style={{
                                    height: "15rem",
                                    width: "15rem",
                                    marginTop: "2rem",
                                }}
                            />
                            <GridListTileBar
                                title={image.title}
                                classes={{
                                    root: classes.titleBar,
                                }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <React.Fragment>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className={classes.modal2}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>{BigImage}</Fade>
                    </Modal>
                </React.Fragment>
            </div>
            <ColorLine color="gray[900]" />

            <div style={{ marginBottom: "3px" }}>
                <div className={classes.about}>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: "bold" }}
                    >
                        Groups
                    </Typography>
                </div>
                {posts
                    ? posts.map((group) => {
                          return (
                              <Accordion
                                  square
                                  expanded={expanded === group.id}
                                  onChange={handleChange2(group.id)}
                              >
                                  <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={group.id + "-content"}
                                      id={group.id + "-header"}
                                  >
                                      <Typography
                                          style={{ fontWeight: "bold" }}
                                      >
                                          {group.course
                                              ? group.course.name
                                              : "Unnamed Group"}
                                      </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                      {group.approvedMembers
                                          ? group.approvedMembers.map(
                                                (member) => {
                                                    return (
                                                        <Chip
                                                            className={
                                                                classes.chipTest
                                                            }
                                                            label={member.name}
                                                            style={{
                                                                fontSize:
                                                                    "100%",
                                                            }}
                                                            clickable
                                                            avatar={
                                                                <Avatar
                                                                    src={
                                                                        member.avatar
                                                                    }
                                                                />
                                                            }
                                                        />
                                                    );
                                                }
                                            )
                                          : null}
                                  </AccordionDetails>
                              </Accordion>
                          );
                      })
                    : null}
            </div>
        </Paper>
    );
}
