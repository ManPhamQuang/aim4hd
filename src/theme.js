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
});

export default theme;
