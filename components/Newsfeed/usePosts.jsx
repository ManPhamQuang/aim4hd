import { useEffect, useState } from "react";
import axios from "axios";

export default function usePosts(aiming, page, setPage) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setPosts([]);
        setPage(1);
        // setHasMore(true)
    }, [aiming]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        // axios.get(
        //     `https://aim4hd-backend.herokuapp.com/api/v1/posts?&limit=5&page=${page}&aiming=${aiming}&sort=-createdAt`
        // );
        axios({
            method: "GET",
            url: `https://aim4hd-backend.herokuapp.com/api/v1/posts?&limit=4&page=${page}&aiming=${aiming}&sort=-createdAt`,
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setPosts((prevPosts) => {
                    return [...prevPosts, ...res.data.data.posts];
                });
                setHasMore(res.data.data.posts.length > 0);
                setLoading(false);
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                setError(true);
            });
        return () => cancel();
    }, [aiming, page]);

    return { loading, error, posts, hasMore };
}
