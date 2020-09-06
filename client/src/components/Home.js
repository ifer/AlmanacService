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
import { KeyboardDatePicker, DatePicker } from '@material-ui/pickers';
// Package to tell @material-ui/pickers which date-time package to use (eg moment)
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
import MomentUtils from '@date-io/moment';

import moment from 'moment';
import 'moment/locale/el';

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

    calDayOfWeek: {
        color: 'black',
        fontWeight: 'bold',
    },

    calDayOfMonth: {
        color: 'red',
        fontWeight: 'bold',
    },

    calMonthYear: {
        color: 'black',
        fontWeight: 'bold',
    },

    calHolidays: {
        color: 'blue',
        // minHeight: '120px',
    },

    calHolidayDiv: {
        marginTop: '60px',
        minHeight: '120px',
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

    controls: {
        alignItems: 'center',
    },
    controlLabels: {
        color: 'darkred',
    },
    title: {
        color: theme.palette.primary.main,
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.gotoDate = this.gotoDate.bind(this);
        this.renderCalendar = this.renderCalendar.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleKeyboardDateChange = this.handleKeyboardDateChange.bind(this);
        this.renderHolidays = this.renderHolidays.bind(this);
    }

    componentDidMount() {
        this.props.changeDate('today');
    }

    gotoDate(where) {
        this.props.changeDate(where, this.props.curdayinfo.datestr);
    }

    handleKeyboardDateChange(date, value) {
        // console.log(`date=${date} value=${value} type=${typeof value}`);
        if (!moment(value, 'DD/MM/YYYY', true).isValid()) {
            console.log('date not valid');
            return;
        }
        if (value) {
            this.props.changeDate('gotoDate', value.replace(/\//g, ''));
        }
    }

    handleDateChange(date, value) {
        console.log(`date=${date} value=${value} type=${typeof value}`);
        // if (!moment(value, 'DD/MM/YYYY', true).isValid()) {
        //     console.log('date not valid');
        //     return;
        // }

        this.props.changeDate('gotoDate', date.format('DDMMYYYY'));
    }
    renderHolidays(dayHolidays) {
        return (
            <div>
                {dayHolidays.map((holiday) => (
                    <Typography paragraph variant="body1" className={this.classes.calHolidays}>
                        {holiday}
                    </Typography>
                ))}
            </div>
        );
    }

    renderCalendar(dayinfo) {
        return (
            <div>
                <Typography paragraph variant="h5" className={this.classes.calDayOfWeek}>
                    {dayinfo.dayOfWeek}
                </Typography>
                <Typography paragraph variant="h4" className={this.classes.calDayOfMonth}>
                    {dayinfo.dayOfMonth}
                </Typography>
                <Typography paragraph variant="h5" className={this.classes.calMonthYear}>
                    {dayinfo.month} {dayinfo.year}
                </Typography>
                <div className={this.classes.calHolidayDiv}>
                    {/* dayHolidays is an array */}
                    {dayinfo.dayHolidays.map((holiday, index) => (
                        <Typography paragraph variant="body1" className={this.classes.calHolidays} key={index}>
                            {holiday}
                        </Typography>
                    ))}
                </div>
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
        if (!this.props.curdayinfo.dayOfMonth) {
            return <div />;
        }
        return (
            <div>
                {/* tell @material-ui/pickers which date-time package to use */}
                <MuiPickersUtilsProvider utils={MomentUtils} locale={'el'}>
                    <div className={this.classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Paper elevation={5} className={this.classes.paper}>
                                    <Grid container spacing={2} className={this.classes.controls}>
                                        <Grid container justify="flex-end" item xs={3}>
                                            <Typography variant="h6" className={this.classes.controlLabels}>
                                                Hμέρα:
                                            </Typography>
                                        </Grid>
                                        <Grid container justify="flex-end" item xs={3}>
                                            <IconButton aria-label="prev day" onClick={() => this.gotoDate('prevDay')}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid container justify="center" item xs={3}>
                                            <IconButton aria-label="next day" onClick={() => this.gotoDate('today')}>
                                                <ArrowDownwardIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid container justify="flex-start" item xs={3}>
                                            <IconButton aria-label="next day" onClick={() => this.gotoDate('nextDay')}>
                                                <ArrowForwardIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className={this.classes.controls}>
                                        <Grid container justify="flex-end" item xs={3}>
                                            <Typography variant="h6" className={this.classes.controlLabels}>
                                                Μήνας:
                                            </Typography>
                                        </Grid>
                                        <Grid container justify="flex-end" item xs={3}>
                                            <IconButton
                                                aria-label="prev month"
                                                onClick={() => this.gotoDate('prevMonth')}
                                            >
                                                <ArrowBackIcon />
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid container justify="center" item xs={3}></Grid>
                                        <Grid container justify="flex-start" item xs={3}>
                                            <IconButton
                                                aria-label="next month"
                                                onClick={() => this.gotoDate('nextMonth')}
                                            >
                                                <ArrowForwardIcon />
                                                <ArrowForwardIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className={this.classes.controls}>
                                        <Grid container justify="flex-end" item xs={3}>
                                            <Typography variant="h6" className={this.classes.controlLabels}>
                                                Hμερομηνία:
                                            </Typography>
                                        </Grid>
                                        <Grid container justify="center" item xs={9}>
                                            <DatePicker
                                                openTo="date"
                                                format="DD/MM/YYYY"
                                                label=""
                                                value={moment(this.props.curdayinfo.datestr, 'DD/MM/YYYY')}
                                                onChange={this.handleDateChange}
                                                views={['year', 'month', 'date']}
                                                minDate={new Date('1971-01-01')}
                                                minDateMessage="Παλαιότερη δυνατή ημερομηνία: 01/01/1971"
                                                maxDate={new Date('2200-12-31')}
                                                maxDateMessage="Νεώτερη δυνατή ημερομηνία: 31/12/2200"
                                                inputProps={{
                                                    style: {
                                                        textAlign: 'center',
                                                        borderStyle: 'none',
                                                        marginBottom: '0px',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={5} className={this.classes.paper}>
                                    {this.renderCalendar(this.props.curdayinfo)}
                                </Paper>
                            </Grid>

                            <Grid container justify="flex-end" item xs={3}>
                                <IconButton aria-label="prev month" onClick={() => this.gotoDate('prevMonth')}>
                                    <ArrowBackIcon />
                                    <ArrowBackIcon />
                                </IconButton>
                            </Grid>
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
                            <Grid container justify="center" item xs={12}>
                                <KeyboardDatePicker
                                    variant="dialog"
                                    format="DD/MM/YYYY"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Επιλέξτε ημερομηνία"
                                    value={moment(this.props.curdayinfo.datestr, 'DD/MM/YYYY')}
                                    // handle clearing outside => pass plain array if you are not controlling value outside
                                    mask="__/__/____"
                                    placeholder="DD/MM/YYYY"
                                    onChange={this.handleKeyboardDateChange}
                                    minDate={new Date('1971-01-01')}
                                    minDateMessage="Παλαιότερη δυνατή ημερομηνία: 01/01/1971"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid container justify="center" item xs={12}>
                                <DatePicker
                                    openTo="year"
                                    format="DD/MM/YYYY"
                                    label="Επιλέξτε ημερομηνία"
                                    value={moment(this.props.curdayinfo.datestr, 'DD/MM/YYYY')}
                                    onChange={this.handleDateChange}
                                    views={['year', 'month', 'date']}
                                    minDate={new Date('1971-01-01')}
                                    minDateMessage="Παλαιότερη δυνατή ημερομηνία: 01/01/1971"
                                    maxDate={new Date('2200-12-31')}
                                    maxDateMessage="Νεώτερη δυνατή ημερομηνία: 31/12/2200"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </MuiPickersUtilsProvider>
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
