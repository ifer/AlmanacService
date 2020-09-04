import { createMuiTheme } from '@material-ui/core/styles';
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

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#ff6666' },
    },
    typography: {
        fontFamily: ['Roboto', 'oneiro'].join(','),
        h6: {
            fontFamily: 'oneiro',
            fontWeight: 400,
        },
    },

    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [oneiro],
            },
        },
    },
});
export default theme;
