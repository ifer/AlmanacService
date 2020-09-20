const keys = require('../config/keys');
const GoogleContacts = require('google-contacts').GoogleContacts;
// Get User model class from mongoose
const User = require('../models/User').User;

function fetchContacts(accessToken, refreshToken) {
    return new Promise((resolve, reject) => {
        const c = new GoogleContacts({
            token: accessToken,
        });

        c.getContacts(
            (err, contacts) => {
                if (contacts) {
                    contactList = contacts.filter((contact) => {
                        return contact.name != '';
                    });
                    contactList.sort(compareContacts);

                    contactList.forEach((c) => {
                        console.log(`${c.familyName} ${c.givenName} `);
                    });
                    resolve(contactList);
                }
                if (err) {
                    // console.log('err=' + err.message);
                    reject(err);
                }
            },
            { thin: 'thin' }
        );
    });
}

function compareContacts(a, b) {
    if (a.familyName < b.familyName) return -1;
    else if (a.familyName > b.familyName) return 1;
    else {
        if (a.givenName < b.givenName) return -1;
        else if (a.givenName > b.givenName) return 1;
    }
    return 0;
}

module.exports = { fetchContacts };

// contacts.forEach((item, i) => {
//     if (item.name != '') {
//         cnt++;
//         contacts.push(item);
//         // console.log(`[${cnt}] => ${JSON.stringify(item)}`);
//     }
// });
