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
export default function Filter() {
    const [checkedItems, setCheckedItems] = useState(checkItems);
    const [mobileCheckItem, setMobileCheckItem] = useState("");
    const handleChange = (event) => {
        // updating an object instead of a Map
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };
    const classes = useStyles();
    const Breaker = () => {
        return <div className={classes.breaker}></div>;
    };
    return (
        <div>
            {/* Desktop */}
            <Hidden smDown>
                <Container>
                    <h2 className={classes.header}>Aiming</h2>
                    <Breaker />
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                        <FormGroup>
                            {aimings.map((aim) => (
                                <FormControlLabel
                                    key={aim.name}
                                    control={
                                        <Checkbox
                                            checked={checkedItems[aim.name]}
                                            onChange={handleChange}
                                            name={aim.name}
                                        />
                                    }
                                    label={aim.label}
                                />
                            ))}
                        </FormGroup>
                        {/* <FormHelperText>P</FormHelperText> */}
                    </FormControl>
                </Container>
            </Hidden>
            {/* Mobile */}
            <Hidden mdUp>
                <Container className={classes.mobileCheckboxContainer}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Aiming
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={mobileCheckItem}
                            onChange={(e) => setMobileCheckItem(e.target.value)}
                        >
                            {aimings.map((aim) => (
                                <MenuItem key={aim.name} value={aim.name}>
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
                            value={mobileCheckItem}
                            onChange={(e) => setMobileCheckItem(e.target.value)}
                        >
                            {aimings.map((aim) => (
                                <MenuItem key={aim.name} value={aim.name}>
                                    {aim.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Container>
            </Hidden>
        </div>
    );
}
