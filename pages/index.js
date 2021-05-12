import {
    CircularProgress,
    Grid,
    Hidden,
    InputAdornment,
    makeStyles,
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
}));

export default function Home() {
    const [aiming, setAiming] = useState(["HD"]);
    const [query, setQuery] = useState("");
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(false);
    const { posts, hasMore, loading, error } = usePosts(aiming, page, setPage);
    // const { posts: searchedPosts, hasMore: hasMoreSearchedPosts, loading: loadingSearchedPosts, error: errorSearchedPosts } = usePostsSearch(
    //     query,
    //     page,
    //     setPage
    // );
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

    return (
        <Grid container justify="center">
            {auth.user ? (
                <Fab
                    className={classes.fab}
                    size="medium"
                    color="primary"
                    aria-label="add"
                >
                    <Link href="posting">
                        <a
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                                textAlign: "center",
                                justifyItems: "center",
                                display: "flex",
                            }}
                        >
                            <AddIcon />
                        </a>
                    </Link>
                </Fab>
            ) : null}
            <Grid item xs={12} md={2}>
                <Filter aiming={aiming} setAiming={setAiming} />
            </Grid>
            <Grid item xs={11} md={7}>
                <TextField
                    id="filled-search"
                    label="Search"
                    type="search"
                    variant="filled"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Posts
                    posts={posts}
                    aiming={aiming.join()}
                    refVar={lastBookElementRef}
                    infiniteLoad={true}
                />
                {loading && <CircularProgress className={classes.loader} />}
                {!hasMore && <h2>no more data</h2>}{" "}
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
