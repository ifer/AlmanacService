const { fetchContacts } = require('../services/contactsService');
const { getDayInfo } = require('../services/dayinfo');
const calendarService = require('../services/calendarService');
const holidayService = require('../services/holidayService');

const requireLogin = require('../middlewares/requireLogin');

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

    app.get('/api/contacts', requireLogin, async (req, res) => {
        // console.log('TOKEN=' + googleToken);
        console.log(`user=${JSON.stringify(req.user)}`);
        fetchContacts(googleToken)
            .then((c) => {
                contacts = c;
                contacts.forEach((item, i) => {
                    console.log(`${JSON.stringify(item)}`);
                });
                console.log(`contacts number = ${contacts.length}`);
            })
            .catch((errmsg) => {
                console.log('ERROR:' + errmsg);
            });
        // const contacts = null;
        // try {
        //     contacts = await fetchContacts(googleToken);
        // } catch (err) {
        //     res.status(422).send(err); // Send http code 422 in case of error
        //     return;
        // }
        // res.send(contacts);
    });
};

// async function getContacts() {
//     const contacts = await fetchContacts();
//     return contacts;
// }
