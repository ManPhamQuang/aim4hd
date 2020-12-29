import {
    Box,
    Container,
    makeStyles,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Hidden,
    InputLabel,
    Select,
    MenuItem,
    Input,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
const useStyles = makeStyles((theme) => ({
    breaker: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "3px",
    },
    header: {
        marginBottom: "5px",
        marginLeft: "8px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    mobileCheckboxContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
}));
const aimings = [
    {
        name: "hd",
        label: "HD",
    },
    {
        name: "di",
        label: "DI",
    },
    {
        name: "cr",
        label: "CR",
    },
    {
        name: "pa",
        label: "PA",
    },
    {
        name: "nn",
        label: "NN",
    },
];
let checkItems = {};
aimings.forEach((aim) => (checkItems[aim.name] = false));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export default function Filter({ aiming, setAiming }) {
    const [items, setItems] = useState(aiming);
    const classes = useStyles();
    const Breaker = () => {
        return <div className={classes.breaker}></div>;
    };

    const handleChange = (e) => {
        setItems(e.target.value);
        // setAiming(e.target.value);
    };
    return (
        <div>
            {/* Desktop */}
            {/* <Hidden smDown> */}
            <Container className={classes.container}>
                <Hidden smDown>
                    <h2 className={classes.header}>Aiming</h2>
                    <Breaker />
                </Hidden>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">
                        {aiming.length > 0 ? "Aiming" : "All"}
                    </InputLabel>
                    <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        input={<Input />}
                        value={items}
                        multiple
                        MenuProps={MenuProps}
                        onChange={handleChange}
                        onClose={() => setAiming(items)}
                    >
                        {aimings.map((aim) => (
                            <MenuItem key={aim.name} value={aim.label}>
                                {aim.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                        Course
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={aiming}
                        onChange={(e) => setAiming(e.target.value)}
                    >
                        {aimings.map((aim) => (
                            <MenuItem key={aim.name} value={aim.name}>
                                {aim.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
            </Container>
            {/* </Hidden> */}
            {/* Mobile */}
            {/* <Hidden mdUp>
                <Container className={classes.mobileCheckboxContainer}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Aiming
                        </InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            input={<Input />}
                            value={aiming}
                            multiple
                            MenuProps={MenuProps}
                            onChange={(e) => setAiming(e.target.value)}
                        >
                            {aimings.map((aim) => (
                                <MenuItem key={aim.name} value={aim.label}>
                                    {aim.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Course
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={aiming}
                            onChange={(e) => setAiming(e.target.value)}
                        >
                            {aimings.map((aim) => (
                                <MenuItem key={aim.name} value={aim.name}>
                                    {aim.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Container>
            </Hidden> */}
        </div>
    );
}
