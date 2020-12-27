//* Components import
import React from "react";
import PropTypes from "prop-types";

//*Styling import
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { List } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Divider from "@material-ui/core/Divider";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        marginLeft: "2%",
        marginRight: "2%",
        borderRadius: "0px 0px 8px 8px",
        display: "flex",
        flexWrap: "wrap",
        // overflow: "hidden",
        paddingBottom: "20px",
    },

    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
}));

export default function RightProfile({ history }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <GridList cellHeight={180}>
                <GridListTile
                    key="Subheader"
                    cols={2}
                    style={{ height: "auto" }}
                    display="flex"
                >
                    <ListSubheader
                        variant="h3"
                        component="h4"
                        style={{ fontWeight: "bold", justifyItems: "center" }}
                    >
                        My Achievement
                        <img
                            src="https://img.icons8.com/plasticine/2x/medal.png"
                            alt="medal icon"
                            style={{
                                width: "30px",
                                height: "30px",
                            }}
                        />
                    </ListSubheader>
                </GridListTile>
                {history.images.map((image) => (
                    <GridListTile>
                        <img src={image.link} alt={image.title} />
                        <GridListTileBar
                            title={image.title}
                            //   subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton
                                    aria-label={`info about ${image.title}`}
                                    className={classes.icon}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </Paper>
    );
}
