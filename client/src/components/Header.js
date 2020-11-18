import React, { Component } from 'react';
// To connect to Redux
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import * as actions from '../actions';

import messages from '../util/messages';

const useStyles = (theme) => ({
    appBar: {
        width: `calc(100% - 0px)`,
        // marginLeft: '10px',
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
    version: {
        color: 'white',
        marginRight: '60px',
    },
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.renderLogButton = this.renderLogButton.bind(this);
        this.renderUsername = this.renderUsername.bind(this);
        this.classes = this.props.classes;
        this.state = {
            anchorEl: null,
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openPrivacy = this.openPrivacy.bind(this);
        this.renderVersion = this.renderVersion.bind(this);
        // const { classes } = this.props;
    }

    componentDidMount() {
        this.props.getVersion();
    }
    openMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    closeMenu() {
        this.setState({ anchorEl: null });
    }

    openPrivacy() {
        this.props.history.push('/privacy');
        this.closeMenu();
    }

    renderMenu() {
        return (
            <div>
                <IconButton
                    edge="start"
                    style={{ color: 'white', marginRight: '20px' }}
                    onClick={this.openMenu}
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="app-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.closeMenu}
                    style={{ marginTop: '40px' }}
                >
                    <MenuItem onClick={this.openPrivacy}>{messages.privacy}</MenuItem>
                </Menu>
            </div>
        );
    }

    /*
<Menu
id="simple-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleClose}
>
<MenuItem onClick={handleClose}>Profile</MenuItem>

</Menu>

*/
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

    renderVersion() {
        return (
            <Typography variant="subtitle2" className={this.classes.version}>
                {messages.version + this.props.version}
            </Typography>
        );
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
            <AppBar color="primary" position="static">
                <Toolbar>
                    {this.renderMenu()}
                    <Box display="flex" flexGrow={1}>
                        <Link className={this.classes.brandLogo} to={'/'}>
                            <Typography variant="h5" color="inherit">
                                {messages.appname}
                            </Typography>
                        </Link>
                    </Box>
                    {this.renderVersion()}
                    {this.renderUsername()}
                    {this.renderLogButton()}
                </Toolbar>
            </AppBar>
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
    return { auth: state.auth, version: state.version };
}
//plugin styles as props (material-ui)
//withRouter: to make props.history available
const styledHeader = withStyles(useStyles)(withRouter(Header));
//plugin state as props (redux)
export default connect(mapStateToProps, actions)(styledHeader);
