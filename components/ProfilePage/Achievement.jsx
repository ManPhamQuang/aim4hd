import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import validator from "../../utils/validator";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import ImageUpload from "../common/ImageUpload";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { LensTwoTone } from "@material-ui/icons";
import AuthContext from "../../utils/authContext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Hidden } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import CardHeader from "@material-ui/core/CardHeader";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    submit: {
        marginTop: "1rem",
    },
    newAchievement: {
        alignItems: "center",
        marginTop: theme.spacing(5),
        justifyContent: "center",
    },
    root2: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(5),
    },
    titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    gridList: {
        width: 500,
        height: 450,
    },
    card: {
        boxShadow: "6px 6px 20px rgba(122,122,122,0.4)",
        borderRadius: "1.5rem",
    },
}));

export default function Achievement({ user }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [imgPath, setimgPath] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const auth = useContext(AuthContext);
    const [open3, setOpen3] = React.useState(false);

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (e) => {
        setimgPath(e.target.src);
        setOpen1(true);
    };

    const handleClose2 = () => {
        setOpen1(false);
    };

    const deleteAchivement = async (achievement) => {
        let update = user.achievements.filter((e) => e != achievement);
        console.log(update);
        let body = {
            id: user.id,
            achievements: update,
        };
        try {
            const response = await axios.patch(
                "https://aim4hd-backend.herokuapp.com/api/v1/users/update",
                body
            );
            if (`${response.status}`.startsWith("2")) {
                console.log("ENTERING");
                setIsLoading(false);
                const data = {};
                data.user = response.data.data.user;
                auth.login("update", data);
                setTimeout(() => alert("Successfully update your profile"), 0);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            alert("ERROR");
        }
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let achievement;
        if (image) {
            const formData = new FormData();
            formData.append("file", image[0]);
            formData.append("upload_preset", "iiyg1094");
            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dybygufkr/image/upload",
                    formData
                );

                console.log(response);

                achievement = response.data.secure_url;
            } catch (error) {
                console.log(error);
            }
        }
        console.log(achievement);
        const update = { title: title, url: achievement };
        let body = {
            id: user.id, // id of user to be updated
            achievements: [...user.achievements, update],
        };
        try {
            // update a user profile
            const response = await axios.patch(
                "https://aim4hd-backend.herokuapp.com/api/v1/users/update",
                body
            );
            if (`${response.status}`.startsWith("2")) {
                console.log("ENTERING");
                setIsLoading(false);
                const data = {};
                data.user = response.data.data.user;
                auth.login("update", data);
                setTimeout(() => alert("Successfully update your profile"), 0);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            alert("ERROR");
        }
    };

    return (
        <div style={{ height: "auto" }}>
            <div className={classes.root}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    className={classes.newAchievement}
                >
                    Add new achievement
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Upload a new achievement
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <DialogContentText>
                                Please enter the title of the achievement and
                                upload an image/pdf of it.
                            </DialogContentText>
                            <TextField
                                label="Title"
                                id="outlined-margin-normal"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                helperText="Please enter the achievement title."
                            />

                            <DropzoneArea
                                onChange={(files) => setImage(files)}
                                acceptedFiles={[
                                    "image/jpeg",
                                    "image/png",
                                    "image/bmp",
                                ]}
                                maxFileSize={5000000}
                                filesLimit="1"
                                showFileNames
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {isLoading ? "Processing..." : "Upload"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className={classes.root2}>
                <Grid
                    xs={12}
                    container
                    direction="row"
                    alignItems="stretch"
                    spacing={4}
                >
                    {user.achievements.map((image) => (
                        <Grid item xs={12} md={6}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={image.title}
                                        height="150"
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
                                <CardActions
                                    style={{
                                        alignItems: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={handleClickOpen3}
                                    >
                                        Delete
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="small"

                                        // onClick={() => deleteAchivement(image)}
                                    >
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <React.Fragment>
                    <Modal
                        open={open1}
                        onClose={handleClose2}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className={classes.modal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open1}>{BigImage}</Fade>
                    </Modal>
                    <Dialog open={open3} onClose={handleClose3}>
                        <DialogTitle>
                            Are you sure you want to delete this attachment?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Be careful, this process can not be undone.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Delete
                            </Button>
                            <Button
                                onClick={() => deleteAchivement(image)}
                                color="primary"
                                autoFocus
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </div>
        </div>
    );
}
