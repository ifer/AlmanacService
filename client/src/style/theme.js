import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ANAOneiroparmEni82 from './ANAOneiroparmEni82.ttf';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

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

const breakpoints = createBreakpoints({});

let theme = createMuiTheme({
    palette: {
        primary: { 500: '#B22222' },
    },
    typography: {
        // fontFamily: ['Roboto', 'oneiro'].join(','),
        h6: {
            fontFamily: 'oneiro',
            fontWeight: 400,
            fontSize: 14,
        },
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 14,
    },
    breakpoints,
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [oneiro],
            },
        },
        MuiTypography: {
            h6: {
                // fontSize: pxToRem(14),
                [breakpoints.down('sm')]: {
                    fontSize: 8,
                },
                [breakpoints.up('sm')]: {
                    fontSize: 10,
                },
                [breakpoints.up('md')]: {
                    fontSize: 12,
                },
                [breakpoints.up('lg')]: {
                    fontSize: 16,
                },
                [breakpoints.up('xl')]: {
                    fontSize: 18,
                },
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
                    paddingTop: '5px',
                    borderBottom: 'none',
                    boxShadow: 'none',
                    height: '1em',
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
        MuiFormLabel: {
            root: {
                lineHeight: 0.5, // To center vertically placeholder inside textbox
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
