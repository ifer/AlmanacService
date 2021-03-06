const { fetchContacts, tokenRefresh } = require('../services/contactsService');
const { getDayInfo } = require('../services/dayinfo');
const refresh = require('passport-oauth2-refresh');

// var moment = require('moment');

const calendarService = require('../services/calendarService');
const holidayService = require('../services/holidayService');
const requireLogin = require('../middlewares/requireLogin');
const emailService = require('../services/emailService');
// Get User model class from camo
const User = require('../models/User').User;

const { ERROR_COULD_NOT_REFRESH_TOKEN, MESSAGE_EMAIL_SUCCESS, ERROR_EMAIL_FAILURE } = require('../helpers/constants');

const { AppError } = require('../helpers/error');

const emailSendingInterval = 500; // ms

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
                // return res.status(411).send(new AppError('411', 'No next month'));
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
        // console.log(`token=${req.user.accessToken}`);
        let retries = 3;

        User.findOne({ googleid: req.user.googleid }).then(
            (user) => {
                // console.log('User: ' + user.displayname + ' refresh:' + user.refreshToken);
                const makeRequest = function () {
                    retries--;
                    if (!retries) {
                        // Couldn't refresh the access token.
                        // console.log('1. Could not fetch contacts ');
                        return res.status(401).send(new AppError(401, ERROR_COULD_NOT_REFRESH_TOKEN));
                    }
                    fetchContacts(user.accessToken, user.refreshToken)
                        .then((contacts) => {
                            // contacts.forEach((item, i) => {
                            //     console.log(`${JSON.stringify(item)}`);
                            // });
                            // console.log(`contacts number = ${contacts.length}`);
                            res.send(contacts);
                        })
                        .catch((err) => {
                            // console.log('errmsg=' + JSON.stringify(errmsg));
                            if (err.message.indexOf('401') >= 0) {
                                // console.log('Access token expired');

                                // Access token expired.
                                // Try to fetch a new one.
                                refresh.requestNewAccessToken('google', user.refreshToken, function (err, accessToken) {
                                    if (err || !accessToken) {
                                        // console.log('2. Could not fetch contacts: ' + JSON.stringify(err));
                                        return res.status(401).send(new AppError(401, ERROR_COULD_NOT_REFRESH_TOKEN));
                                    }
                                    // console.log('Refresh: new access token: ' + accessToken);

                                    // Save the new accessToken for future use
                                    user.accessToken = accessToken;
                                    user.save().then((u) => {
                                        // Retry the request.
                                        makeRequest();
                                    });
                                });
                            } else {
                                // Other error
                                // console.log('3. Could not fetch contacts :' + err.message);
                                return res.status(401).send(new AppError(401, err.message));
                            }
                        });
                };
                // Make the initial request.
                makeRequest();
            },
            (error) => {
                // console.log('User ' + req.user.googleid + ' not found');
                return res.status(401).send(new AppError(401, 'User ' + req.user.googleid + ' not found: ' + error));
            }
        );
    });

    app.post('/api/sendemail', requireLogin, (req, res) => {
        const message = req.body.message;
        const recipients = req.body.recipients;

        User.findOne({ googleid: req.user.googleid }).then(async (user) => {
            if (!user) {
                console.log('User ' + req.user.googleid + ' not found');
                return res.status(401).send(new AppError(401, 'User ' + req.user.googleid + ' not found: ' + error));
            }

            try {
                await sendToAll(user, recipients, message);
                // console.log('POST RES Caught error:' + res);
            } catch (error) {
                // console.log('POST Caught error:' + error);
                return res.status(400).send(new AppError(400, ERROR_EMAIL_FAILURE + error));
            }

            return res.status(200).send(new AppError(200, MESSAGE_EMAIL_SUCCESS));
        });
    });

    app.get('/api/getVersion', (req, res) => {
        fs = require('fs');
        fs.readFile('version.txt', 'utf8', function (err, data) {
            if (err) {
                // console.log(err);
                return res.status(400).send(new AppError(400, ''));
            }
            res.send(data);
        });
    });
};

function sendToAll(user, recipients, message) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < recipients.length; i++) {
            const recipient = recipients[i];
            message.to = recipient.email;
            try {
                // await emailService.sendEmail(message, user.accessToken, user.refreshToken);
                await emailService.sendEmailGoogleAPI(message, user.accessToken, user.refreshToken);
            } catch (error) {
                return reject(error);
            }
        }

        resolve();
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
