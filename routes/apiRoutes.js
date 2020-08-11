const getContacts = require('../services/contactsService').getContacts;

//Wrap all to an exported anonymous function
//so that we can call it from index.js with app as an argument
module.exports = (app) => {
    app.get(
        '/api/contacts', //our URL
        getContacts()
    );
};
