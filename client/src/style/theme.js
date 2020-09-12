import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ANAOneiroparmEni82 from './ANAOneiroparmEni82.ttf';

const oneiro = {
    fontFamily: 'oneiro',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,

    src: `
    local('oneiro'),
    local('oneiro-regular'),
    url(${ANAOneiroparmEni82}) format('truetype')
  `,
};

let theme = createMuiTheme({
    palette: {
        primary: { 500: '#B22222' },
    },
    typography: {
        fontFamily: ['Roboto', 'oneiro'].join(','),
        h6: {
            fontFamily: 'oneiro',
            fontWeight: 400,
            fontSize: '16px',
        },
    },

    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [oneiro],
            },
        },
        MuiOutlinedInput: {
            //'Autocomplete' component
            root: {
                '& $notchedOutline': {
                    // borderColor: 'green',
                },
                '&:hover $notchedOutline': {
                    // borderColor: 'red',
                },
                '&$focused $notchedOutline': {
                    // borderColor: 'purple',
                },
                '&&&&& $input': {
                    padding: '0px',
                    borderBottom: 'none',
                    boxShadow: 'none',
                    height: '2em',
                },
            },
        },
        MuiAutocomplete: {
            paper: {
                // Dropdown list of 'Autocomplete' component
                fontSize: '12px',
            },
            groupLabel: {
                color: 'blue',
            },
        },
    },
});
theme = responsiveFontSizes(theme);

// theme.typography.h6 = {
//     fontSize: '1.2rem',
//     '@media (min-width:600px)': {
//         fontSize: '1.5rem',
//     },
//     [theme.breakpoints.up('md')]: {
//         fontSize: '2.4rem',
//     },
// };

export default theme;
