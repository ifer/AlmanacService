// App.js: controls the rendering layer of the app (React Routing)
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// To connect to Redux
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../style/theme';

// Import all action -creator functions
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import Help from './Help';
import Privacy from './Privacy';

import CelebWizard from './celebrating/celebWizard';

// Package to tell @material-ui/pickers which date-time package to use (eg moment)
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
// import MomentUtils from '@date-io/moment';

// pseudo-components for testing:
// const Header = () => <h2>Header</h2>;
// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;
// const Landing = () => <h2>Landing</h2>;

class App extends Component {
    componentDidMount() {
        // imported actions have been passed as props
        // to the App component, with the export statement below
        this.props.fetchUser();
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <BrowserRouter>
                    {/* BrowserRouter accepts only one child-component */}
                    <Grid container direction="column">
                        <Grid>
                            <Header />
                        </Grid>
                        <Grid item container>
                            {/* left padding: extra small screen: 0 cells, small screen: 2 cells */}
                            <Grid item xs="0" sm="2" />
                            <Grid item xs="12" sm="8">
                                {/* Home: extra small screen: 12 cells, small screen: 8 cells */}
                                <Route exact={true} path="/" component={Home} />
                                <Route exact path="/celebrating" component={CelebWizard} />
                                <Route exact path="/help" component={Help} />
                                <Route exact path="/privacy" component={Privacy} />
                            </Grid>
                            {/* right padding: extra small screen: 0 cells, small screen: 2 cells  */}
                            <Grid item xs="0" sm="2" />
                        </Grid>
                    </Grid>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}
// With the statement below, actions will be passed to App as props
export default connect(null, actions)(App);
