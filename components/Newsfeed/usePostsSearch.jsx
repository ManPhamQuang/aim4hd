import { useEffect, useState } from "react";
import axios from "axios";

export default function usePostsSearch(query, aiming, page, setPage) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setPosts([]);
        setPage(1);
        // setHasMore(true)
    }, [aiming, query]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        // axios.get(
        //     `https://aim4hd-backend.herokuapp.com/api/v1/posts?&limit=5&page=${page}&aiming=${aiming}&sort=-createdAt`
        // );
        axios({
            method: "GET",
            url: `https://aim4hd-backend.herokuapp.com/api/v1/posts/search/fuzzy?query=${query}`,
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setPosts((prevPosts) => {
                    return [...new Set([...prevPosts, ...res.data.data])];
                });
                // setHasMore(res.data.data.length > 0);
                setLoading(false);
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                setError(true);
            });
        return () => cancel();
    }, [query, aiming, page]);

    return { loading, error, posts, hasMore };
}
