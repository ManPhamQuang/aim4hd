import Head from "next/head";
import { Grid } from "@material-ui/core";
import Posts from "../components/Posts";

export default function Home() {
    return (
        <div>
            <Posts />
        </div>
    );
}
