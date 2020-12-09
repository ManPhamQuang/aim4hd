//* Components import
import Head from "next/head";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";

export default function LeftGroup() {
    return (
        <div>
            <Typography
                variant="h5"
                align="center"
                style={{ fontWeight: "bold" }}
            >
                Hello
            </Typography>
        </div>
    );
}
