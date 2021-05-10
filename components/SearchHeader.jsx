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
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        marginLeft: theme.spacing(3),
    },
    search: {
        position: "relative",
        borderRadius: "1.5rem",
        backgroundColor: fade(theme.palette.common.black, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: "60%",
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
        width: "50%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    Autocomplete: {
        border: "none",
        borderRadius: "10rem",
    },
}));
const filter = createFilterOptions();

export default function SearchHeader({ user }) {
    const classes = useStyles();
    const [aiming, setAiming] = useState(["HD"]);
    const [query, setQuery] = useState("");
    const auth = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [type, setType] = useState("posts");
    const router = useRouter();
    const { data, hasMore, loading, error } = usePostsSearch(
        type,
        query,
        aiming,
        page,
        setPage
    );
    const [value, setValue] = React.useState(null);

    const handleSetType = (event, newType) => {
        setType((prevType) => {
            if (newType === null) {
                return prevType;
            } else {
                return newType;
            }
        });
    };
    const options = [{ name: "" }];
    return (
        <div className={classes.grow}>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        setValue({
                            name: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        setValue({
                            name: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== "") {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Search for "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={options}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                }}
                renderOption={(option, params) => (
                    <React.Fragment>
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                router.push("/search");
                            }}
                        >
                            Search for "{params.inputValue}"
                        </span>
                    </React.Fragment>
                )}
                style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search on Aim4HD"
                        variant="outlined"
                    />
                )}
                classes={{ root: classes.Autocomplete }}
            />
        </div>
    );
}
