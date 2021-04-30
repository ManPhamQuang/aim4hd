//* Components import
import React, { useState, useEffect } from "react";
//* Styling import
import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "2rem",
        backgroundColor: "#FFFFFF",
        boxShadow: "6px 6px 20px rgba(122,122,122,0.4)",
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    root2: {
        maxWidth: 345,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        boxShadow: "6px 6px 20px rgba(122,122,122,0.4)",
        borderRadius: "1.5rem",
    },
}));

export default function MyAchievement({ user }) {
    const classes = useStyles();
    const [open1, setOpen1] = React.useState(false);
    const [imgPath, setimgPath] = React.useState(0);
    const router = useRouter();
    const [expanded, setExpanded] = React.useState(false);
    const handleOpen = (e) => {
        setimgPath(e.target.src);
        setOpen1(true);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const BigImage = (
        <div className={classes.modal}>
            <img
                src={imgPath}
                onClick={handleOpen}
                border="1"
                style={{
                    height: "80vh",
                    width: "auto",
                }}
            />
        </div>
    );

    const handleClose2 = () => {
        setOpen1(false);
    };

    return (
        <div className={classes.root}>
            <Grid
                xs={12}
                container
                direction="row"
                alignItems="center"
                spacing={3}
                justify="flex-start"
            >
                <Grid item xs={12}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "1rem",
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() =>
                                router.push("/profile?page=achievement")
                            }
                        >
                            Achievement Management
                        </Button>
                    </div>
                </Grid>

                {user.achievements.map((image) => (
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={image.title}
                                    height="160"
                                    image={image.url}
                                    title={image.title}
                                    onClick={handleOpen}
                                />
                                <CardContent>
                                    <Typography
                                        component="h5"
                                        style={{
                                            fontWeight: "600",
                                            fontSize: "22px",
                                            textAlign: "center",
                                        }}
                                    >
                                        {image.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <React.Fragment>
                <Modal
                    open={open1}
                    onClose={handleClose2}
                    className={classes.modal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open1}>{BigImage}</Fade>
                </Modal>
            </React.Fragment>
        </div>
    );
}
