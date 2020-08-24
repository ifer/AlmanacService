import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// To connect to Redux
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import { Navbar, NavItem, Icon } from 'react-materialize';

class Header extends Component {
    constructor(props) {
        super(props);
        this.renderNavitem = this.renderNavitem.bind(this);
    }
    // Return JSX piece of code that shows
    // the user auth state.
    // this.props.auth are injected by redux via mapStateToProps
    renderNavitem() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <NavItem href="/auth/google">Login with Google</NavItem>;
            default:
                return <NavItem href="/api/logout">Logout</NavItem>;
        }
    }

    render() {
        return (
            <div>
                <Navbar
                    alignLinks="right"
                    brand={
                        <a className="brand-logo" href={this.props.auth ? '/surveys' : '/'}>
                            Almanac
                        </a>
                    }
                    options={{
                        draggable: true,
                        edge: 'left',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 200,
                        preventScrolling: true,
                    }}
                >
                    {this.renderNavitem}
                </Navbar>
            </div>
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
