import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {
    createMuiTheme,
    responsiveFontSizes,
    ThemeProvider,
} from "@material-ui/core/styles";
import Link from "next/link";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        maxWidth: "60%",
        textAlign: "center",
        boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
        backgroundColor: "#FFFFFF",
        borderRadius: "1rem",
        padding: "1rem",
        maxHeight: "60vh",
        marginBottom: "1rem",
    },
    button: {
        marginTop: "0.5rem",
        padding: "10px 25px",
        fontWeight: "500",
        borderRadius: "25px",
        textTransform: "uppercase",
        transition: "all 0.3s ease",
        border: "2px solid #69a6ce",
        color: "#69a6ce",
        "&:hover": {
            color: "#fff",
            background: "#69a6ce",
        },
    },
    img: {
        objectPosition: "center top",
    },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function Custom404() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        src="/404img.png"
                        alt="404 error"
                        width={600}
                        height={600}
                        className={classes.img}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <div className={classes.error}>
                            {/* <div>
                                <Typography
                                    style={{ color: "red" }}
                                    variant="h1"
                                >
                                    404
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    style={{
                                        textTransform: "uppercase",
                                        marginBottom: "20px",
                                        color: "red",
                                    }}
                                    color="primary"
                                    variant="h3"
                                >
                                    OOPS! PAGE NOT FOUND
                                </Typography>
                            </div> */}
                            <div>
                                <Typography
                                    variant="body1"
                                    style={{ fontWeight: "500" }}
                                >
                                    Sorry, the page you're looking for doesn't
                                    exist or has been removed.
                                </Typography>
                            </div>
                            <div>
                                <Link href="/">
                                    <a style={{ textDecoration: "none" }}>
                                        <Button className={classes.button}>
                                            <Typography variant="button">
                                                Return home
                                            </Typography>
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
