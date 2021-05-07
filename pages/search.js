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
import Posts from "../components/Newsfeed/Posts";
import Filter from "../components/Newsfeed/Filter";
import RecommendedUsers from "../components/Newsfeed/RecommendUsers";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import AuthContext from "../utils/authContext";
import axios from "axios";
import { useRouter } from "next/router";
import usePosts from "../components/Newsfeed/usePosts";
import usePostsSearch from "../components/Newsfeed/usePostsSearch";
import { AccountCircle } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/Person";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Users from "../components/Newsfeed/Users";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    loader: {
        margin: "auto",
        marginTop: "3rem",
    },
    root: {
        padding: "2px 4px",
        display: "flex",
        // flexGrow: "1",
        alignItems: "center",
        // width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Search() {
    const [aiming, setAiming] = useState(["HD"]);
    const [query, setQuery] = useState("");
    const classes = useStyles();
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
    const observer = useRef();

    const lastBookElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    console.log("getting more");
                    console.log(`has more is now: ${hasMore}`);
                    setPage((prevPageNumber) => prevPageNumber + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
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
    console.log(data);

    return (
        <Grid container justify="center" spacing={6}>
            {auth.user ? (
                <Fab
                    className={classes.fab}
                    size="medium"
                    color="primary"
                    aria-label="add"
                >
                    <Link href="posting">
                        <AddIcon />
                    </Link>
                </Fab>
            ) : null}
            <Grid item xs={12} md={2}>
                <Filter aiming={aiming} setAiming={setAiming} />
            </Grid>
            <Grid item xs={11} md={7}>
                <Paper className={classes.root}>
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={handleSetType}
                        arial-label="set search type posts or users"
                    >
                        <ToggleButton
                            value="posts"
                            aria-label="posts"
                            selected={type === "posts"}
                        >
                            <DescriptionIcon />
                        </ToggleButton>
                        <ToggleButton
                            value="users"
                            aria-label="users"
                            selected={type === "users"}
                        >
                            <PersonIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <InputBase
                        className={classes.input}
                        placeholder="Search posts or users"
                        inputProps={{ "aria-label": "serach posts or users" }}
                    />
                </Paper>
                <TextField
                    id="filled-search"
                    label="Search"
                    type="search"
                    variant="filled"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ToggleButtonGroup
                                    value={type}
                                    exclusive
                                    onChange={handleSetType}
                                    arial-label="set search type posts or users"
                                >
                                    <ToggleButton
                                        value="posts"
                                        aria-label="posts"
                                        selected={type === "posts"}
                                    >
                                        <DescriptionIcon />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="users"
                                        aria-label="users"
                                        selected={type === "users"}
                                    >
                                        <PersonIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </InputAdornment>
                        ),
                    }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {type === "posts" ? (
                    <Posts
                        posts={data}
                        aiming={aiming.join()}
                        refVar={lastBookElementRef}
                    />
                ) : (
                    <Users users={data} />
                )}
                {loading && <CircularProgress className={classes.loader} />}
                {/* TODO: Thien An pls style this part */}
            </Grid>
            <Hidden smDown>
                <Grid item xs={false} md={3}>
                    <RecommendedUsers />
                </Grid>
            </Hidden>
        </Grid>
    );
}
