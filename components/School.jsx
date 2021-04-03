import React from "react";
import Typography from "@material-ui/core/Typography";

const schoolName = (school) => {
    switch (school) {
        case "SST":
            return "School of Science & Technology";
            break;
        case "SCD":
            return "School of Communication & Design";
            break;
        case "SBM":
            return "School of Business & Management";
            break;
        case "SEUP":
            return "School of English and University Pathways";
            break;
    }
};

export default function School({ school }) {
    return (
        <Typography variant="h6" style={{ fontWeight: "200" }}>
            {schoolName(school)}
        </Typography>
    );
}
