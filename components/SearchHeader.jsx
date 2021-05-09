import React from "react";
import {
    CircularProgress,
    Grid,
    Hidden,
    InputAdornment,
    InputBase,
    makeStyles,
    Paper,
    TextField,
} from "@material-ui/core";
import Posts from "./Newsfeed/Posts";
import Filter from "./Newsfeed/Filter";
import RecommendedUsers from "./Newsfeed/RecommendUsers";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import AuthContext from "../utils/authContext";
import axios from "axios";
import { useRouter } from "next/router";
import usePosts from "./Newsfeed/usePosts";
import usePostsSearch from "./Newsfeed/usePostsSearch";
import { AccountCircle } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/Person";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Users from "../components/Newsfeed/Users";
import { fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    search: {
        position: "relative",
        borderRadius: "1.5rem",
        backgroundColor: fade(theme.palette.common.black, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",

        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export default function SearchHeader() {
    const classes = useStyles();
    const [aiming, setAiming] = useState(["HD"]);
    const [query, setQuery] = useState("");
    const auth = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [type, setType] = useState("posts");
    const { data, hasMore, loading, error } = usePostsSearch(
        type,
        query,
        aiming,
        page,
        setPage
    );

    const handleSetType = (event, newType) => {
        setType((prevType) => {
            if (newType === null) {
                return prevType;
            } else {
                return newType;
            }
        });
    };
    return (
        <div className={classes.grow}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    placeholder="Search posts or users"
                    inputProps={{ "aria-label": "serach posts or users" }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* {type === "posts" && data[0]?.author && (
                    
                    // <Posts posts={data} infiniteLoad={false} />
                )}

                {type === "users" && data[0]?.name && <Users users={data} />}

                {loading && <CircularProgress className={classes.loader} />} */}
            </div>
        </div>
    );
}
