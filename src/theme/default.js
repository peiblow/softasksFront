import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';


const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: green,
    },

    shadows: Array(25).fill('0px 0px 1px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 1px -2px rgba(0,0,0,0.12)'),

    overrides: {        
        MuiAppBar: {
            root: {
              'box-shadow':'none'
            }
        }
    }
});

export default theme