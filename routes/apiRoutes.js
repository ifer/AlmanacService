const getContacts = require('../services/contactsService').getContacts;
const calendarService = require('../services/calendarService');

//Wrap all to an exported anonymous function
//so that we can call it from index.js with app as an argument
module.exports = (app) => {
    app.get('/api/goto/:where/:basedate', (req, res) => {
        console.log(`where=${req.params.where} basedate=${req.params.basedate}`);
        switch (req.params.where) {
            case 'next':
                const date = calendarService.nextDay(req.params.basedate);
                console.log(`date returned: ${date.format('DDMMYYYY')}`);
                res.send(date.format('DDMMYYYY'));
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
