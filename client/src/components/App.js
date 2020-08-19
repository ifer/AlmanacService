// App.js: controls the rendering layer of the app (React Routing)
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// To connect to Redux
import { connect } from 'react-redux';
// Import all action -creator functions
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';

// pseudo-components for testing:
// const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
    componentDidMount() {
        // imported actions have been passed as props
        // to the App component, with the export statement below
        this.props.fetchUser();
    }

    render() {
        return (
            // className='container' needed by materialize.css
            <div className="container">
                <BrowserRouter>
                    {/* BrowserRouter accepts only one child-component */}
                    <div>
                        <Header />
                        {/* Επειδή δεν συνδέουμε τον header με κάποιο Route,
                        ο router θα το εμφανίζει πάντα, πριν από όλα τα
                        components!
                        */}
                        <Route exact={true} path="/" component={Home} />
                        {/* Αν δεν χρησιμοποιήσουμε exact=true στο root, o router
                            θα δείχνει και το Landing και σε όλα τα άλλα paths
                            που περιέχουν '/'. Το ίδιο και στο '/surveys'
                         */}
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
// With the statement below, actions will be passed to App as props
export default connect(null, actions)(App);
