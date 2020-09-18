import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import {
    GRAY_SECONDARY, PRIMARY, SECONDARY, WHITE,
} from './colors';
// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: PRIMARY,
        },
        secondary: {
            main: SECONDARY,
        },
        error: {
            main: red.A400,
        },
        background: {
            default: WHITE,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1200,
            xl: 1920,
        },
    },
});
export default theme;