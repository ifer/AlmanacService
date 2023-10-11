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
import Tooltip from '@material-ui/core/Tooltip';

import { DatePicker } from '@material-ui/pickers';
// Package to tell @material-ui/pickers which date-time package to use (eg moment)
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';

import CookieConsent from 'react-cookie-consent';

import moment from 'moment';
import 'moment/locale/el';

import leftArrow from '../style/leftArrow.png';
import rightArrow from '../style/rightArrow.png';
import leftDoubleArrow from '../style/leftDoubleArrow.png';
import rightDoubleArrow from '../style/rightDoubleArrow.png';
import messages from '../util/messages';
import { noGreekAccents } from '../util/utils';
import ShowNotification from './ShowNotification';
import Celebrators from './Celebrators';

moment.locale('el');

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '40px',
    },
    '@global': {
        html: {
            // [theme.breakpoints.down('sm')]: {
            //     fontSize: 8,
            // },
            // [theme.breakpoints.up('sm')]: {
            //     fontSize: 10,
            // },
            [theme.breakpoints.down('lg')]: {
                fontSize: 12,
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: 16,
            },
            [theme.breakpoints.up('xl')]: {
                fontSize: 17,
            },
        },
    },
    section: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        // [theme.breakpoints.down('md')]: {
        //     width: '185px',
        //     height: 'calc(185px * 1.50)',
        // },
        // Min browser width ~= 500px
        [theme.breakpoints.down('lg')]: {
            width: '296px',
            height: 'calc(296px * 1.50)',
        },
        [theme.breakpoints.up('lg')]: {
            width: '370px',
            height: 'calc(370px * 1.50)',
        },
        [theme.breakpoints.up('xl')]: {
            width: '450px',
            height: 'calc(450px * 1.50)',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        /* background: 'FloralWhite',
        background: 'WhiteSmoke',*/
        background: '#FAFAFA',
        width: '100%',
        height: '100%',
    },

    calDayOfWeek: {
        color: 'black',
        fontWeight: 'regular',
        margin: 0,
        padding: 0,
    },

    calDayOfMonth: {
        color: 'red',
        fontWeight: 'bold',
        margin: 0,
        padding: 0,
    },

    calMonthYear: {
        color: 'black',
        fontWeight: 'regular',
        margin: 0,
        padding: 0,
    },

    calHolidays: {
        color: 'blue',
        // minHeight: '120px',
    },

    calHolidayDiv: {
        // marginTop: '60px',
        // minHeight: '120px',
    },

    calMoonPhase: {
        // marginTop: '30px',
        color: 'green',
    },

    calSunRiseSet: {
        // marginTop: '30px',
        color: 'magenta',
        // marginBottom: '60px',
    },

    controls: {
        alignItems: 'center',
        // marginTop: '15px',
    },

    controlLabels: {
        color: 'darkred',
        textTransform: 'none',
    },
    controlButtons: {
        color: 'darkred',
        textTransform: 'none',
        // paddingTop: '20px',
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
        this.openHelp = this.openHelp.bind(this);
        this.renderCookieConsent = this.renderCookieConsent.bind(this);
        this.closeCelebrators = this.closeCelebrators.bind(this);

        this.state = {
            celebratorsOpen: false,
        };

        // console.log(`props=${JSON.stringify(props.curdayinfo)}`);
    }

    componentDidMount() {
        // this.props.fetchFixedHolidays();
        this.props.fetchAllHolidays();

        // Clear celebrating wizard "memory"
        this.props.setCelebSelected([]);
        this.props.setEmailData(null);

        // Dev only
        // this.props.changeDate('gotoDate', '07012021');

        // PROD
        if (this.props.curdayinfo) {
            this.props.changeDate('gotoDate', this.props.curdayinfo.datestr);
            // console.log(`props.curdayinfo=${JSON.stringify(this.props.curdayinfo)}`);
        } else {
            this.props.changeDate('today');
            // this.props.changeDate('gotoDate', '07012021');
        }
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

    openHelp() {
        this.props.history.push('/help');
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
        const dayOfWeek = noGreekAccents(dayinfo.dayOfWeek).toUpperCase();
        const month = noGreekAccents(dayinfo.month).toUpperCase();
        // console.log(`dayinfo=${JSON.stringify(dayinfo)}`);
        return (
            <Paper elevation={5} className={this.classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                    style={{ height: '100%' }}
                >
                    <Grid container direction="column" justify="flex-start" alignItems="center" spacing={0}>
                        <Typography paragraph variant="h5" className={this.classes.calDayOfWeek}>
                            {dayOfWeek}
                        </Typography>
                        <Typography paragraph variant="h4" className={this.classes.calDayOfMonth}>
                            {dayinfo.dayOfMonth}
                        </Typography>
                        <Typography paragraph variant="h5" className={this.classes.calMonthYear}>
                            {month} {dayinfo.year}
                        </Typography>
                    </Grid>
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
                </Grid>
            </Paper>
        );
    }

    renderLeftPage(dayinfo) {
        return (
            <Paper elevation={5} className={this.classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                    style={{ height: '100%' }}
                >
                    <Grid container spacing={1} className={this.classes.controls}>
                        <Grid container item alignItems="center" justify="space-between" style={{ padding: 0 }}>
                            <Tooltip title={messages.prev_day}>
                                <IconButton aria-label={messages.prev_day} onClick={() => this.gotoDate('prevDay')}>
                                    <img src={leftArrow} alt="" />
                                </IconButton>
                            </Tooltip>

                            <Button style={{ marginBottom: '0px' }} onClick={() => this.gotoDate('today')}>
                                <Typography
                                    paragraph
                                    variant="h6"
                                    className={this.classes.controlButtons}
                                    style={{ marginBottom: '0px' }}
                                >
                                    {messages.today}
                                </Typography>
                            </Button>

                            <Tooltip title={messages.next_day}>
                                <IconButton aria-label="next day" onClick={() => this.gotoDate('nextDay')}>
                                    <img src={rightArrow} alt="" />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        <Grid container item alignItems="center" justify="space-between" style={{ padding: 0 }}>
                            <Tooltip title={messages.prev_month}>
                                <IconButton onClick={() => this.gotoDate('prevMonth')}>
                                    <img src={leftDoubleArrow} alt="" />
                                </IconButton>
                            </Tooltip>

                            <Typography
                                paragraph
                                variant="h6"
                                className={this.classes.controlButtons}
                                style={{ color: 'silver', marginBottom: '0px' }}
                            >
                                {'Μήνας'}
                            </Typography>

                            <Tooltip title={messages.next_month}>
                                <IconButton onClick={() => this.gotoDate('nextMonth')}>
                                    <img src={rightDoubleArrow} alt="" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Typography
                            paragraph
                            variant="h6"
                            className={this.classes.controlLabels}
                            style={{ marginLeft: '0px', marginBottom: '0px', marginTop: '15px' }}
                        >
                            {messages.gotodate}
                        </Typography>
                        <DatePicker
                            openTo="date"
                            format="DD/MM/YYYY"
                            label=""
                            value={moment(this.props.curdayinfo.datestr, 'DD/MM/YYYY')}
                            onChange={this.handleDateChange}
                            views={['year', 'month', 'date']}
                            minDate={new Date('1971-01-01')}
                            minDateMessage={messages.error_min_date}
                            maxDate={new Date('2200-12-31')}
                            maxDateMessage={messages.error_max_date}
                            cancelLabel={messages.cancelLabel}
                            okLabel={messages.okLabel}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                    borderStyle: 'none',
                                    marginBottom: '0px',
                                },
                            }}
                        />
                    </Grid>
                    <Grid container spacing={1} direction="column" alignItems="flex-start">
                        <Typography
                            paragraph
                            variant="h6"
                            className={this.classes.controlLabels}
                            style={{ marginLeft: '0px', marginTop: '25px', marginBottom: '2px' }}
                        >
                            {messages.findholiday}
                        </Typography>
                        <Autocomplete
                            id="combo-findholiday"
                            options={this.props.allHolidays}
                            groupBy={(option) => getHolidayType(option.type)}
                            getOptionLabel={(option) => option.holiday}
                            onChange={this.handleHolidayInput}
                            style={{ width: '100%', height: '50px', marginTop: '15px' }}
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
                    <Grid container item alignItems="center" justify="flex-start">
                        {/* <Button style={{ marginTop: '25px' }} onClick={() => this.getCelebrating()}> */}
                        <Button style={{ marginTop: '25px' }} onClick={() => this.setState({ celebratorsOpen: true })}>
                            <Typography paragraph variant="h6" className={this.classes.controlButtons}>
                                {messages.celebrating}
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid container item alignItems="center" justify="flex-end">
                        <Button style={{ marginTop: '0px' }} onClick={() => this.openHelp()}>
                            <Typography paragraph variant="h6" className={this.classes.controlButtons}>
                                {messages.help}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    renderCookieConsent() {
        //expires={150}
        return (
            <CookieConsent expires={1} buttonText={messages.cookiesConsentButton}>
                {messages.cookiesConsentText}
            </CookieConsent>
        );
    }

    closeCelebrators() {
        this.setState({ celebratorsOpen: false });
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
        };

        return (
            <div>
                <ShowNotification
                    open={this.props.isOpen}
                    text={errorText()}
                    onClose={this.onCloseErrorMsg}
                    severity={errorSeverity()}
                />
                {this.state.celebratorsOpen === true && <Celebrators onClose={this.closeCelebrators} />}
                {this.renderCookieConsent()}
                {this.props.curdayinfo.dayOfMonth && this.props.allHolidays && (
                    <MuiPickersUtilsProvider utils={MomentUtils} locale={'el'}>
                        <Grid container justify="center">
                            <Grid item container justify="center" className={this.classes.section}>
                                {this.renderLeftPage(this.props.curdayinfo)}
                            </Grid>
                            <Grid item container justify="center" className={this.classes.section}>
                                {this.renderCalendar(this.props.curdayinfo)}
                            </Grid>
                        </Grid>
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
