import React, { useRef, useState, useEffect } from "react";
import { Fab, Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";
import WarningIcon from "@material-ui/icons/Warning";
import { ThemeProvider } from "@material-ui/core/styles";

const ImageUpload = ({ image, setImage, enqueueSnackbar }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!image) return setPreview(null);
        const fileReader = new FileReader();
        fileReader.onload = () => setPreview(fileReader.result);
        fileReader.readAsDataURL(image);
    }, [image]);

    const handleImageOnChange = (e) => {
        const file = e.target.files[0];
        if (!file) return setImage(null);
        if (file.size > 71680) {
            enqueueSnackbar("File is too big!", {
                variant: "warning",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                },
                TransitionComponent: Slide,
                autoHideDuration: 4000,
            });
        }
        setImage(e.target.files[0]);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                margin: "16px 0 8px 0",
            }}
        >
            <label htmlFor="upload-photo" style={{ marginRight: "10px" }}>
                <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    accept=".jpg,.png,.jpeg"
                    name="upload-photo"
                    type="file"
                    onChange={handleImageOnChange}
                />
                <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <AddIcon /> Upload avatar
                </Fab>
            </label>
            <Avatar
                alt="Avatar Preview"
                src={
                    preview
                        ? preview
                        : "https://res.cloudinary.com/dybygufkr/image/upload/c_thumb,w_200,g_face/v1593000869/avatar_q2ysxd.jpg"
                }
            />
        </div>
    );
};

export default withSnackbar(ImageUpload);
