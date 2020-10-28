import React, { Component } from 'react';

// To connect to Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// Import all action -creator functions
import * as actions from '../actions';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DatePicker } from '@material-ui/pickers';
// Package to tell @material-ui/pickers which date-time package to use (eg moment)
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';

import moment from 'moment';
import 'moment/locale/el';

import leftArrow from '../style/leftArrow.png';
import rightArrow from '../style/rightArrow.png';
import leftDoubleArrow from '../style/leftDoubleArrow.png';
import rightDoubleArrow from '../style/rightDoubleArrow.png';
import messages from '../util/messages';
import { noGreekAccents } from '../util/utils';
import ShowNotification from './ShowNotification';

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
        marginTop: '15px',
    },

    controlLabels: {
        color: 'darkred',
        textTransform: 'none',
    },
    controlButtons: {
        color: 'darkred',
        textTransform: 'none',
        paddingTop: '20px',
    },
    title: {
        color: theme.palette.primary.main,
    },
    card: {
        maxWidth: 345,
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
        this.renderLeftPage = this.renderLeftPage.bind(this);
        // this.handleFixedHolidayInput = this.handleFixedHolidayInput.bind(this);
        this.handleHolidayInput = this.handleHolidayInput.bind(this);
        this.getCelebrating = this.getCelebrating.bind(this);
        this.onCloseErrorMsg = this.onCloseErrorMsg.bind(this);
    }

    componentDidMount() {
        // this.props.fetchFixedHolidays();
        this.props.fetchAllHolidays();

        // Clear celebrating wizard "memory"
        this.props.setCelebSelected([]);
        this.props.setEmailData(null);

        // Dev only
        this.props.changeDate('gotoDate', '07012021');

        // PROD
        // if (this.props.curdayinfo) {
        //     this.props.changeDate('gotoDate', this.props.curdayinfo.datestr);
        // } else {
        //     // this.props.changeDate('today');
        //     this.props.changeDate('gotoDate', '07012021');
        // }
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
        this.props.changeDate('gotoDate', date.format('DDMMYYYY'));
    }

    async getCelebrating() {
        await this.props.fetchContacts();
        if (this.props.error) {
            // console.log(this.props.error.message);
            return;
        }
        // console.log(this.props.contacts);
        const personList = checkContacts(this.props.contacts, this.props.curdayinfo.dayNames);
        // console.log(personList);
        if (personList.length > 0) {
            this.props.openCelebrating(personList, this.props.history);
        } else {
            this.props.noCelebrating();
        }
    }

    handleHolidayInput(event, value) {
        if (value) {
            // Add a prefix for the api to recognize holiday type
            const key = value.type === 'mobileholidays' ? 'M' + value.key : 'F' + value.key;

            this.props.gotoDateOfHoliday(key, this.props.curdayinfo.year);
            // console.log(value);
            // const datestr = value.daymon + this.props.curdayinfo.year;
            // this.props.changeDate('gotoDate', datestr);
        }
    }

    onCloseErrorMsg() {
        // console.log('Switching to false');
        this.props.hideNotif();
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
            <Paper elevation={5} className={this.classes.paper} style={{ height: '600px' }}>
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
            </Paper>
        );
    }

    renderLeftPage() {
        return (
            <Paper elevation={5} className={this.classes.paper} style={{ height: '600px' }}>
                <Grid container spacing={2} className={this.classes.controls}>
                    <Grid container justify="flex-start" item xs={3}>
                        <IconButton onClick={() => this.gotoDate('prevMonth')}>
                            <img src={leftDoubleArrow} alt="" />
                        </IconButton>
                    </Grid>
                    <Grid container justify="flex-end" item xs={2}>
                        <IconButton onClick={() => this.gotoDate('prevDay')}>
                            <img src={leftArrow} alt="" />
                        </IconButton>
                    </Grid>
                    <Grid container justify="center" item xs={2}>
                        <Button onClick={() => this.gotoDate('today')}>
                            <Typography paragraph variant="h6" className={this.classes.controlButtons}>
                                {messages.today}
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid container justify="flex-start" item xs={2}>
                        <IconButton aria-label="next day" onClick={() => this.gotoDate('nextDay')}>
                            <img src={rightArrow} alt="" />
                        </IconButton>
                    </Grid>
                    <Grid container justify="flex-end" item xs={3}>
                        <IconButton onClick={() => this.gotoDate('nextMonth')}>
                            <img src={rightDoubleArrow} alt="" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={this.classes.controls}>
                    <Grid container justify="flex-start" item xs={7}>
                        <Typography
                            paragraph
                            variant="h6"
                            className={this.classes.controlLabels}
                            style={{ marginLeft: '0px', marginBottom: '0px' }}
                        >
                            {messages.gotodate}
                        </Typography>
                    </Grid>
                    <Grid container justify="center" item xs={5}>
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
                <Grid container spacing={2} className={this.classes.controls}>
                    <Grid container justify="flex-start" item xs={7}>
                        <Typography
                            paragraph
                            variant="h6"
                            className={this.classes.controlLabels}
                            style={{ marginLeft: '0px', marginBottom: '0px' }}
                        >
                            {messages.findholiday}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center" item xs={12} className={this.classes.controls}>
                    <Autocomplete
                        id="combo-findholiday"
                        options={this.props.allHolidays}
                        groupBy={(option) => getHolidayType(option.type)}
                        getOptionLabel={(option) => option.holiday}
                        onChange={this.handleHolidayInput}
                        style={{ width: '100%', height: '50px' }}
                        autoHighlight
                        noOptionsText={messages.nooptions}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={messages.holiday}
                                variant="outlined"
                                style={{ fontSize: '8px' }}
                            />
                        )}
                    />
                </Grid>
                <Grid container item xs={12} className={this.classes.controls}>
                    <Button onClick={() => this.getCelebrating()}>
                        <Typography paragraph variant="h6" className={this.classes.controlButtons}>
                            {messages.celebrating}
                        </Typography>
                    </Button>
                </Grid>
            </Paper>
        );
    }

    render() {
        const errorText = () => {
            // debugger;
            if (this.props.error) {
                return this.props.error.message;
            } else {
                return '';
            }
        };
        const errorSeverity = () => {
            return this.props.severity || 'error';
            // if (this.props.error) {
            //     debugger;
            //     return this.props.error.severity || 'error';
            // } else {
            //     return 'error';
            // }
        };

        return (
            <div>
                <ShowNotification
                    open={this.props.isOpen}
                    text={errorText()}
                    onClose={this.onCloseErrorMsg}
                    severity={errorSeverity()}
                />

                {this.props.curdayinfo.dayOfMonth && this.props.allHolidays && (
                    <MuiPickersUtilsProvider utils={MomentUtils} locale={'el'}>
                        <div className={this.classes.root}>
                            <Grid
                                container
                                justify="center"
                                spacing={3}
                                style={{ maxWidth: '1100px', minWidth: '1000px' }}
                            >
                                <Grid item xs={5}>
                                    {this.renderLeftPage()}
                                </Grid>
                                <Grid item xs={5} style={{ height: '300px' }}>
                                    {this.renderCalendar(this.props.curdayinfo)}
                                </Grid>
                            </Grid>
                        </div>
                    </MuiPickersUtilsProvider>
                )}
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

    const error = state.errorObj != null ? state.errorObj.error : null;
    const isOpen = state.errorObj != null ? state.errorObj.isOpen : false;
    const severity = state.errorObj != null ? state.errorObj.severity : null;

    return {
        curdayinfo: curdayinfo,
        allHolidays: state.allHolidays,
        holdate: state.holdate,
        contacts: state.contacts,
        error: error,
        isOpen: isOpen,
        severity: severity,
        showNoCelebrating: state.noCelebrating,
    };
}

function getHolidayType(keyword) {
    switch (keyword) {
        case 'mobileholidays':
            return messages.mobileholidays;
        case 'fixedholidays':
            return messages.fixedholidays;
        default:
            return '';
    }
}

function checkContacts(contacts, daynames) {
    let personList = [];

    for (var i = 0; i < contacts.length; i++) {
        if (!contacts[i].name) continue;

        // if (contacts[i].givenName != null) givenName = contacts[i].gd$name.gd$givenName.$t;

        // if (contacts[i].gd$name.gd$familyName != null) familyName = contacts[i].gd$name.gd$familyName.$t;
        if (contacts[i].familyName == null) contacts[i].familyName = '';

        if (contacts[i].givenName == null) {
            if (contacts[i].fullName != null) {
                let s = contacts[i].fullName.split(' ');
                if (s == null || s.length === 0) continue;
                if (s.length >= 2) {
                    contacts[i].givenName = s[0];
                    contacts[i].familyName = s[1];
                } else {
                    contacts[i].givenName = s[0];
                }

                if (contacts[i].givenName == null) contacts[i].givenName = '';
            } else {
                continue;
            }
        }

        // id = i;

        let isCelebrant = false;
        // console.log(contacts[i].familyName + ' ' + contacts[i].givenName);
        let gn = noGreekAccents(contacts[i].givenName).toUpperCase();
        for (let j = 0; j < daynames.length; j++) {
            let fn = noGreekAccents(daynames[j]).toUpperCase();
            if (gn.startsWith(fn)) {
                isCelebrant = true;
                break;
            }
        }

        if (!isCelebrant) continue;

        let emails = '';
        // if (i === 78) {
        //     console.log(contacts[i].fullName);
        //     console.log(contacts[i].emails);
        // }
        if (contacts[i].emails.length >= 1) {
            for (let j = 0; j < contacts[i].emails.length; j++) {
                if (!contacts[i].emails[j]) continue;

                emails += contacts[i].emails[j];

                if (j < contacts[i].emails.length - 1) emails += ', ';
            }
        }

        // let phones = '';
        // if (contacts[i].phoneNumber != null) {
        //     for (let j = 0; j < contacts[i].phoneNumber.length; j++) {
        //         phones += contacts[i].phoneNumber[j].replace(/ /g, '');
        //         if (j < contacts[i].phoneNumber.length - 1) phones += ', ';
        //     }
        // }

        let person = {
            id: i,
            familyName: contacts[i].familyName,
            givenName: contacts[i].givenName,
            fullName: contacts[i].familyName + ' ' + contacts[i].givenName,
            phone: contacts[i].phoneNumber,
            email: contacts[i].email || '',
            emails: emails,
            selected: false,
        };

        personList.push(person);
    }

    // personList.sort(compareContacts);

    return personList;

    // if (this.personlist.length > 0) this.setState({ contactsFound: true });
    // else this.setState({ contactsFound: false });
    //
    // //		for (let i=0; i<this.personlist.length; i++){
    // //			console.log(this.personlist[i].name);
    // //		}
    //
    // this.setState({ canRender: true });
}

// function compareContacts(a, b) {
//     if (a.familyName < b.familyName) return -1;
//     else if (a.familyName > b.familyName) return 1;
//     else {
//         if (a.givenName < b.givenName) return -1;
//         else if (a.givenName > b.givenName) return 1;
//     }
//     return 0;
// }

//plugin styles as props (material-ui)
const styledHome = withStyles(useStyles)(withRouter(Home));
// With the statement below, actions will be passed to App as props
export default connect(mapStateToProps, actions)(styledHome);
// export default Home;
