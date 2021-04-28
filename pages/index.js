import { CircularProgress, Grid, Hidden, makeStyles } from "@material-ui/core";
import Posts from "../components/Newsfeed/NewPosts";
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
    // const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const auth = useContext(AuthContext);
    // const [posts, setPosts] = useState([]);
    const [endOfList, setEndOfList] = useState(false);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const [active, setActive] = useState(false);
    const { posts, hasMore, loading, error } = usePosts(aiming, page, setPage);
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

    const fetchPosts = () => {
        // console.log(router.query.aiming);
        // console.log(router.query?.aiming);
        setLoading(true);
        axios
            .get(
                `https://aim4hd-backend.herokuapp.com/api/v1/posts?&limit=5&page=${page}${
                    router.query.aiming != "" &&
                    router.query.aiming != undefined
                        ? `&aiming=${router.query.aiming}`
                        : ""
                }&sort=-createdAt`
            )
            .then((res) => {
                if (res.data.length != 0) {
                    setPosts([...posts, ...res.data.data.posts]);
                    setLoading(false);
                    setActive(true);
                } else {
                    // no more posts, stop loading more
                    setEndOfList(true);
                    setActive(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const onChange = (isVisible) => {
        // console.log("Element is now %s", isVisible ? "visible" : "hidden");
        setActive(false);
        // setLoading(true);
        // setPage(page + 1);
    };

    // useEffect(() => {
    //     console.log("fetching..");
    // }, [active]);

    // useEffect(() => {
    //     fetchPosts();
    // }, [page]);

    // useEffect(() => {
    //     setPage(1);
    // }, [aiming]);

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
                <Posts
                    posts={posts}
                    aiming={aiming.join()}
                    refVar={lastBookElementRef}
                />
                {loading && <CircularProgress className={classes.loader} />}
            </Grid>
            <Hidden smDown>
                <Grid item xs={false} md={3}>
                    <RecommendedUsers />
                </Grid>
            </Hidden>
        </Grid>
    );
}
