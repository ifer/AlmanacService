import React, { Component } from 'react';

// To connect to Redux
import { connect } from 'react-redux';
// Import all action -creator functions
import * as actions from '../actions';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import moment from 'moment';

moment.locale('el');

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.gotoDate = this.gotoDate.bind(this);
    }

    componentDidMount() {
        this.props.changeDate('today');
    }

    gotoDate(where) {
        this.props.changeDate(where, this.props.curdayinfo.datestr);
    }

    render() {
        return (
            <div>
                <div className={this.classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={this.classes.paper}>xs=12</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={this.classes.paper}>xs=6</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={this.classes.paper}>xs=6</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={this.classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={this.classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={this.classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={this.classes.paper}>xs=3</Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let curdayinfo = {};
    if (!state.date) {
        curdayinfo.datestr = moment().format('DDMMYYYY');
        // curdayinfo = '';
    } else {
        // curdayinfo = moment(state.date, 'DDMMYYYY');
        curdayinfo = state.date;
    }
    // console.log(curdayinfo);
    return { curdayinfo: curdayinfo };
}

//plugin styles as props (material-ui)
const styledHome = withStyles(useStyles)(Home);
// With the statement below, actions will be passed to App as props
export default connect(mapStateToProps, actions)(styledHome);
// export default Home;
