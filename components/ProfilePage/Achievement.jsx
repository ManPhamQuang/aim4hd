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
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal2: {
        position: "relative",
        marginTop: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
    },
}));

export default function Achievement({ user }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [input, setInput] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [imgPath, setimgPath] = React.useState(0);
    const auth = useContext(AuthContext);

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

    const BigImage = (
        <div className={classes.modal}>
            <img
                src={imgPath}
                onClick={handleOpen}
                border="1"
                style={{
                    height: "100%",
                    width: "100%",
                }}
            />
        </div>
    );
    const history = {
        images: [
            {
                link:
                    "https://cdn.slidesharecdn.com/ss_thumbnails/d8b0f189-3db0-4cf3-9691-ce34a7d0f9b0-150714050544-lva1-app6891-thumbnail-4.jpg?cb=1436850363",
                title: "GPA",
            },
            {
                link:
                    "https://phlebotomyscout.com/wp-content/uploads/2019/09/phlebotomy-certification.jpg",
                title: "Certification",
            },
        ],
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let avatar;
        if (image) {
            const formData = new FormData();
            formData.append("file", image[0]);
            formData.append("upload_preset", "iiyg1094");
            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dybygufkr/image/upload",
                    formData
                );
                avatar = response.data.secure_url;
            } catch (error) {
                console.log(error);
            }
        }
        console.log(avatar);
        const update = { title: title, url: avatar };
        let body = {
            id: user.id,
            achievements: [update],
        };
        // if (avatar) body.avatar = avatar;
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

    return (
        <div>
            <div className={classes.root}>
                <Button
                    variant="outlined"
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
                                    "application/pdf",
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
                <GridList cellHeight={200} spacing={10}>
                    {history.images.map((image) => (
                        <GridListTile key={image.title}>
                            <img
                                src={image.link}
                                alt={image.title}
                                onClick={handleOpen}
                                border="1"
                                style={{
                                    height: "15rem",
                                    width: "15rem",
                                    marginTop: "2rem",
                                }}
                            />
                            <GridListTileBar
                                title={image.title}
                                classes={{
                                    root: classes.titleBar,
                                }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <React.Fragment>
                    <Modal
                        open={open1}
                        onClose={handleClose2}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className={classes.modal2}
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
        </div>
    );
}
