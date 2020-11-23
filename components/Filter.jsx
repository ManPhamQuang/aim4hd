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
        <Container>
            <h2 className={classes.header}>Aiming</h2>
            <Breaker />
            <FormControl component="fieldset" className={classes.formControl}>
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
    );
}
