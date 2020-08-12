const keys = require('../config/keys');

const GoogleContacts = require('google-contacts').GoogleContacts;

// function fetchContacts(accessToken, cb) {
//     var c = new GoogleContacts({
//         token: accessToken,
//     });
//
//     // let cnt = 0;
//     c.getContacts(
//         function (err, contacts) {
//             if (err) {
//                 console.log('ERROR: ' + err);
//                 cb(null, err);
//             }
//             if (contacts) {
//                 cb(contacts, null);
//             }
//         },
//         { thin: 'full' }
//     );
// }

function fetchContacts(accessToken) {
    return new Promise((resolve, reject) => {
        const c = new GoogleContacts({
            token: accessToken,
        });
        c.getContacts(
            (err, contacts) => {
                if (contacts) {
                    filtered = contacts.filter((contact) => {
                        return contact.name != '';
                    });
                    resolve(filtered);
                }
                if (err) {
                    reject('ERROR:' + err);
                }
            },
            { thin: 'full' }
        );
    });
}

module.exports = { fetchContacts };

// contacts.forEach((item, i) => {
//     if (item.name != '') {
//         cnt++;
//         contacts.push(item);
//         // console.log(`[${cnt}] => ${JSON.stringify(item)}`);
//     }
// });
