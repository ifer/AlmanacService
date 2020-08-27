import React, { Component } from 'react';

// To connect to Redux
import { connect } from 'react-redux';
// Import all action -creator functions
import * as actions from '../actions';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import moment from 'moment';

moment.locale('el');

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '40px',
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    calDayOfMonthYear: {
        color: 'black',
        fontWeight: 'bold',
    },

    calDayOfMonth: {
        color: 'red',
        fontWeight: 'bold',
    },

    calHolidays: {
        color: 'blue',
    },

    calMoonPhase: {
        color: 'green',
    },

    calSunRiseSet: {
        color: 'magenta',
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.gotoDate = this.gotoDate.bind(this);
        this.renderCalendar = this.renderCalendar.bind(this);
    }

    componentDidMount() {
        this.props.changeDate('today');
    }

    gotoDate(where) {
        this.props.changeDate(where, this.props.curdayinfo.datestr);
    }

    renderCalendar(dayinfo) {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography paragraph variant="h5" className={this.classes.calDayOfMonthYear}>
                            {dayinfo.dayOfWeek}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph variant="h4" className={this.classes.calDayOfMonth}>
                            {dayinfo.dayOfMonth}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph variant="h5" className={this.classes.calDayOfMonthYear}>
                            {dayinfo.month} {dayinfo.year}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph variant="body1" className={this.classes.calHolidays}>
                            {dayinfo.dayHolidays}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph variant="subtitle1" className={this.classes.calMoonPhase}>
                            {dayinfo.moonPhase}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph variant="subtitle1" className={this.classes.calSunRiseSet}>
                            {dayinfo.sunRiseSet}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className={this.classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6}>
                            <Paper elevation={5} className={this.classes.paper}>
                                {this.renderCalendar(this.props.curdayinfo)}
                            </Paper>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid container justify="flex-end" item xs={4}>
                            <IconButton aria-label="prev day" onClick={() => this.gotoDate('prevDay')}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid container justify="center" item xs={4}>
                            <IconButton aria-label="next day" onClick={() => this.gotoDate('today')}>
                                <ArrowDownwardIcon />
                            </IconButton>
                        </Grid>
                        <Grid container justify="flex-start" item xs={4}>
                            <IconButton aria-label="next day" onClick={() => this.gotoDate('nextDay')}>
                                <ArrowForwardIcon />
                            </IconButton>
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

/*
<Typography paragraph variant="body1" color="inherit">
    {JSON.stringify(this.props.curdayinfo)}
</Typography>
*/

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
