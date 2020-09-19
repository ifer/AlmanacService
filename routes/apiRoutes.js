const { fetchContacts, tokenRefresh } = require('../services/contactsService');
const { getDayInfo } = require('../services/dayinfo');
const refresh = require('passport-oauth2-refresh');

const calendarService = require('../services/calendarService');
const holidayService = require('../services/holidayService');
const requireLogin = require('../middlewares/requireLogin');
// Get User model class from camo
const User = require('../models/User').User;

//Wrap all to an exported anonymous function
//so that we can call it from index.js with app as an argument
module.exports = (app) => {
    app.get('/api/goto/:where/:basedate', (req, res) => {
        // console.log(`where=${req.params.where} basedate=${req.params.basedate}`);
        let date, dayinfo;
        switch (req.params.where) {
            case 'today':
                date = calendarService.today();
                dayinfo = getDayInfo(date.format('DD/MM/YYYY'));
                res.send(dayinfo);
                // res.send(date.format('DDMMYYYY'));
                return;
            case 'nextDay':
                date = calendarService.nextDay(req.params.basedate);
                dayinfo = getDayInfo(date.format('DD/MM/YYYY'));
                res.send(dayinfo);
                return;
            case 'prevDay':
                date = calendarService.prevDay(req.params.basedate);
                dayinfo = getDayInfo(date.format('DD/MM/YYYY'));
                res.send(dayinfo);
                return;
            case 'nextMonth':
                date = calendarService.nextMonth(req.params.basedate);
                dayinfo = getDayInfo(date.format('DD/MM/YYYY'));
                res.send(dayinfo);
                return;
            case 'prevMonth':
                date = calendarService.prevMonth(req.params.basedate);
                dayinfo = getDayInfo(date.format('DD/MM/YYYY'));
                res.send(dayinfo);
                return;
            case 'gotoDate':
                date = calendarService.gotoDate(req.params.basedate);
                dayinfo = getDayInfo(date.format('DD/MM/YYYY'));
                res.send(dayinfo);
                return;
            default:
                res.send(req.params.basedate);
        }
    });

    app.get('/api/fixedHolidays', (req, res) => {
        fixedHolMap = require('../data/holidays').fixedHolMap;

        let fharr = [];
        fixedHolMap.forEach((value, key) => {
            const obj = { daymon: key, holiday: value };
            fharr.push(obj);
        });
        res.send(fharr);
    });

    app.get('/api/allHolidays', (req, res) => {
        fixedHolMap = require('../data/holidays').fixedHolMap;
        mobileHolMap = require('../data/holidays').mobileHolMap;

        let arr = [];
        mobileHolMap.forEach((value, key) => {
            const obj = { key: key, holiday: value, type: 'mobileholidays' };
            arr.push(obj);
        });
        fixedHolMap.forEach((value, key) => {
            const obj = { key: key, holiday: value, type: 'fixedholidays' };
            arr.push(obj);
        });
        res.send(arr);
    });

    app.get('/api/findholiday/:key/:year', (req, res) => {
        // console.log(`API: key=${req.params.key}, year=${req.params.year}`);
        const date = holidayService.getDateOfHoliday(req.params.key, req.params.year);
        // console.log(`DATE=${date.format('DD/MM/YYYY')}`);
        dayinfo = getDayInfo(date.format('DD/MM/YYYY'));
        // console.log(`dayinfo=${JSON.stringify(dayinfo)}`);
        res.send(dayinfo);
    });

    app.get('/api/contacts', requireLogin, (req, res) => {
        // console.log('TOKEN=' + googleToken);
        console.log(`token=${req.user.accessToken}`);
        let retries = 2;

        User.findOne({ googleid: req.user.googleid }).then(
            (user) => {
                console.log('User: ' + user.displayName + ' refresh:' + user.refreshToken);
                const makeRequest = function () {
                    retries--;
                    if (!retries) {
                        // Couldn't refresh the access token.
                        console.log('1. Could not fetch contacts ');
                        return res.status(401).send('Could not fetch contacts');
                    }
                    fetchContacts(user.accessToken, user.refreshToken)
                        .then((contacts) => {
                            contacts.forEach((item, i) => {
                                console.log(`${JSON.stringify(item)}`);
                            });
                            console.log(`contacts number = ${contacts.length}`);
                            res.send(contacts);
                        })
                        .catch((err) => {
                            // console.log('errmsg=' + JSON.stringify(errmsg));
                            if (err.message.indexOf('401') >= 0) {
                                console.log('Access token expired');
                                // Access token expired.
                                // Try to fetch a new one.
                                refresh.requestNewAccessToken('google', user.refreshToken, function (err, accessToken) {
                                    if (err || !accessToken) {
                                        console.log('2. Could not fetch contacts: ' + JSON.stringify(err));
                                        return res.status(401).send('Could not fetch contacts');
                                    }

                                    // Save the new accessToken for future use
                                    user.accessToken = accessToken;
                                    user.save().then((u) => {
                                        // Retry the request.
                                        makeRequest();
                                    });
                                });
                            } else {
                                console.log('3. Could not fetch contacts ');
                                return res.status(401).send(errmsg);
                            }
                        });
                };
                // Make the initial request.
                makeRequest();
            },
            (error) => {
                console.log('User ' + req.user.googleid + ' not found');
                return res.status(401).send('User ' + req.user.googleid + ' not found: ' + error);
            }
        );
    });
};

// async function getContacts() {
//     const contacts = await fetchContacts();
//     return contacts;
// }
