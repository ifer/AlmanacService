import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// To connect to Redux
import { connect } from 'react-redux';

class Header extends Component {
    // Return JSX piece of code that shows
    // the user auth state.
    // this.props.auth are injected by redux via mapStateToProps
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return (
                    <li>
                        <a href="/api/logout">Logout</a>
                    </li>
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link className="left brand-logo" to={this.props.auth ? '/surveys' : '/'}>
                        Almanac
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

//  Η συνάρτηση αυτή καλείται από το redux, περνώντας της το state της στιγμής.
// Εμείς από το state ενδιαφερόμαστε για το πεδίο auth το οποίο το έχει γεμίσει
// η combineReducers αφού έχει εκτελεστεί η authReducer.
// Κατόπιν περνάμε την mapStateToProps ως παράμετρο στην connect, η οποία κάνει
// διαθέσιμο το πεδίο auth στο component Header.
function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
