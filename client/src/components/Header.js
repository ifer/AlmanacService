import React, { Component } from 'react';
// To connect to Redux
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import messages from '../util/messages';

const useStyles = (theme) => ({
    appBar: {
        width: `calc(100% - 0px)`,
        marginLeft: '10px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    login: {
        color: 'cyan',
        flexGrow: 1,
        textTransform: 'none',
    },
    username: {
        display: 'flex',
        color: 'LemonChiffon',
        marginRight: '10px',
    },
    brandLogo: {
        color: 'white',
    },
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.renderLogButton = this.renderLogButton.bind(this);
        this.renderUsername = this.renderUsername.bind(this);
        this.classes = this.props.classes;
        // const { classes } = this.props;
    }

    // Return JSX piece of code that shows
    // the user auth state.
    // this.props.auth are injected by redux via mapStateToProps
    renderNavitem() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <Typography variant="subtitle1" className={this.classes.login}>
                        {messages.loginWithGoogle}
                    </Typography>
                );
            default:
                return (
                    <Typography variant="subtitle1" className={this.classes.login}>
                        {messages.logout}
                    </Typography>
                );
        }
    }

    renderLogButton() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <Button href="/auth/google">
                        <Typography variant="subtitle1" className={this.classes.login}>
                            {messages.loginWithGoogle}
                        </Typography>
                    </Button>
                );
            default:
                return (
                    <Button href="/api/logout">
                        <Typography variant="subtitle1" className={this.classes.login}>
                            {messages.logout}
                        </Typography>
                    </Button>
                );
        }
    }

    renderUsername() {
        if (!this.props.auth) {
            return;
        } else {
            return (
                <Typography variant="subtitle2" className={this.classes.username}>
                    {this.props.auth.displayname}
                </Typography>
            );
        }
    }

    render() {
        return (
            <div>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <MenuItem className={this.classes.brandLogo} to={'/'}>
                                <Typography variant="h5" color="inherit">
                                    {messages.appname}
                                </Typography>
                            </MenuItem>
                        </Box>
                        {this.renderUsername()}
                        {this.renderLogButton()}
                    </Toolbar>
                </AppBar>
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
    // console.log(state.auth);
    return { auth: state.auth };
}
//plugin styles as props (material-ui)
const styledHeader = withStyles(useStyles)(Header);
//plugin state as props (redux)
export default connect(mapStateToProps)(styledHeader);
