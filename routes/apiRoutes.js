const getContacts = require('../services/contactsService').getContacts;
const getDayInfo = require('../services/dayinfo').getDayInfo;
const calendarService = require('../services/calendarService');

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

    // app.get(
    //     '/api/contacts', //our URL
    //     getContacts()
    // );
};
