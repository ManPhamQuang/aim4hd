import {
    Container,
    makeStyles,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import validator from "../utils/postValidator";
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            // margin: theme.spacing(1),
            // width: "25ch",
        },
    },
    container: {
        padding: theme.spacing(5),
    },
    aiming: {
        width: "80px",
    },
    course: {
        width: "85%",
    },
}));
export default function PostingPage() {
    const classes = useStyles();
    const [input, setInput] = useState({
        title: "",
        content: "",
        aiming: "",
        currentMember: [],
        course: "",
        requiredSkills: [],
        isOpen: true,
        maximumMember: 4,
        requiredSkills: [],
        approvedMembers: [],
    });
    const [errorMsg, setErrorMsg] = useState({
        title: "",
        content: "",
        aiming: "",
        course: "",
    });
    const handleInputChange = (e) => {
        setInput((input) => ({
            ...input,
            [e.target.name]: e.target.value,
        }));
        let newErrorMsg = { ...errorMsg };
        console.log(newErrorMsg);
        const message = validator(event.target.name, event.target.value);
        if (message) setErrorMsg({ ...errorMsg, [event.target.name]: message });
        else {
            delete newErrorMsg[event.target.name];
            setErrorMsg(newErrorMsg);
        }
        // if(e.target.name == "aiming"){
        //     setInput((input) => ({
        //         ...input,
        //         [e.target.name]: e.target.value,
        //     }));
        // }else{
        //     setInput((input) => ({
        //         ...input,
        //         [e.target.name]: e.target.value,
        //     }));
        // }
    };
    return (
        <Container>
            <Paper className={classes.container}>
                <Typography>Posting new post</Typography>
                <form className={classes.root}></form>
                <TextField
                    required
                    id="title"
                    label="Title"
                    fullWidth
                    name="title"
                    value={input.title}
                    onChange={handleInputChange}
                />
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <TextField
                        required
                        id="aiming"
                        label="Aiming"
                        name="aiming"
                        className={classes.aiming}
                        value={input.aiming}
                        onChange={handleInputChange}
                        select
                    >
                        <MenuItem value="HD">HD</MenuItem>
                        <MenuItem value="DI">DI</MenuItem>
                        <MenuItem value="CR">CR</MenuItem>
                        <MenuItem value="PA">PA</MenuItem>
                        <MenuItem value="NN">NN</MenuItem>
                    </TextField>
                    <TextField
                        required
                        id="course"
                        label="Course"
                        name="course"
                        className={classes.course}
                        value={input.course}
                        onChange={handleInputChange}
                    />
                </div>
                <TextField
                    id="maximumMember"
                    label="Maximum Member"
                    name="maximumMember"
                    fullWidth
                    value={input.maximumMember}
                    onChange={handleInputChange}
                />
                <TextField
                    id="approved-students"
                    label="Skills Required"
                    name="requiredSkills"
                    fullWidth
                    value={input.requiredSkills}
                    onChange={handleInputChange}
                />
                <TextField
                    id="approved-students"
                    label="Approved Members"
                    name="approvedMembers"
                    fullWidth
                    value={input.approvedMembers}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="content"
                    label="Content"
                    name="content"
                    fullWidth
                    rows={7}
                    multiline
                    value={input.content}
                    onChange={handleInputChange}
                />
            </Paper>
        </Container>
    );
}
