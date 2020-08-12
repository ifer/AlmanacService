const keys = require('../config/keys');

const GoogleContacts = require('google-contacts').GoogleContacts;

function fetchContacts(accessToken, cb) {
    var c = new GoogleContacts({
        token: accessToken,
    });

    let cnt = 0;
    c.getContacts(
        function (err, contacts) {
            if (err) {
                console.log('ERROR: ' + err);
                cb(null, err);
            }
            if (contacts) {
                cb(contacts, null);
                // contacts.forEach((item, i) => {
                //     if (item.name != '') {
                //         cnt++;
                //         contacts.push(item);
                //         // console.log(`[${cnt}] => ${JSON.stringify(item)}`);
                //     }
                // });
            }
        },
        { thin: 'full' }
    );
}

module.exports = { fetchContacts };
