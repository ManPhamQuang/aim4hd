import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ca3028",
        },
        secondary: {
            main: "#050551",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#f2f2f2",
        },
    },
    userCard: {
        boxShadow: "none",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "300px",
        borderColor: "",
        "&:hover": {
            boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "7px",
            cursor: "pointer",
        },
    },
});

export default theme;
