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
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
// pick a date util library

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
        /* background: 'FloralWhite',
        background: 'WhiteSmoke',*/
        background: '#FAFAFA',
        width: '100%',
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
        marginTop: '60px',
        color: 'blue',
        minHeight: '100px',
    },

    calMoonPhase: {
        marginTop: '30px',
        color: 'green',
    },

    calSunRiseSet: {
        marginTop: '30px',
        color: 'magenta',
        marginBottom: '60px',
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.gotoDate = this.gotoDate.bind(this);
        this.renderCalendar = this.renderCalendar.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.props.changeDate('today');
    }

    gotoDate(where) {
        this.props.changeDate(where, this.props.curdayinfo.datestr);
    }

    handleDateChange() {}

    renderCalendar(dayinfo) {
        return (
            <div>
                <Typography paragraph variant="h5" className={this.classes.calDayOfMonthYear}>
                    {dayinfo.dayOfWeek}
                </Typography>
                <Typography paragraph variant="h4" className={this.classes.calDayOfMonth}>
                    {dayinfo.dayOfMonth}
                </Typography>
                <Typography paragraph variant="h5" className={this.classes.calDayOfMonthYear}>
                    {dayinfo.month} {dayinfo.year}
                </Typography>
                <Typography paragraph variant="body1" className={this.classes.calHolidays}>
                    {dayinfo.dayHolidays}
                </Typography>
                <Typography paragraph variant="subtitle1" className={this.classes.calMoonPhase}>
                    {dayinfo.moonPhase}
                </Typography>
                <Typography paragraph variant="subtitle1" className={this.classes.calSunRiseSet}>
                    {dayinfo.sunRiseSet}
                </Typography>
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
                        <Grid container justify="flex-end" item xs={3}>
                            <IconButton aria-label="prev month" onClick={() => this.gotoDate('prevMonth')}>
                                <ArrowBackIcon />
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>{' '}
                        <Grid container justify="flex-end" item xs={2}>
                            <IconButton aria-label="prev day" onClick={() => this.gotoDate('prevDay')}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid container justify="center" item xs={2}>
                            <IconButton aria-label="next day" onClick={() => this.gotoDate('today')}>
                                <ArrowDownwardIcon />
                            </IconButton>
                        </Grid>
                        <Grid container justify="flex-start" item xs={2}>
                            <IconButton aria-label="next day" onClick={() => this.gotoDate('nextDay')}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </Grid>
                        <Grid container justify="flex-start" item xs={3}>
                            <IconButton aria-label="next month" onClick={() => this.gotoDate('nextMonth')}>
                                <ArrowForwardIcon />
                                <ArrowForwardIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={moment(this.props.curdayinfo.datestr, 'DDMMYYYY')}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
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
