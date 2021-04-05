import React, { useRef, useState, useEffect } from "react";
import { Fab, Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const ImageUpload = ({ image, setImage }) => {
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
        if (file.size > 71680) return alert("File is too big!");
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

export default ImageUpload;
