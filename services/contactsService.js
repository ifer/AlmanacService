const keys = require('../config/keys');

const { google } = require('googleapis');

function getContacts() {
    const authObj = new google.auth.OAuth2({
        access_type: 'offline',
        clientId: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
    });

    // This is to refresh the tokens and set the new tokens to auth object:
    authObj.on('tokens', (tokens) => {
        const access_token = tokens.access_token;
        if (tokens.refresh_token) {
            this.myTokens.refreshToken = tokens.refresh_token;
            // save refresh token in the database if it exists
        }
        this.myTokens.accessToken = tokens.access_token;
        // save new access token (tokens.access_token)
    });

    authObj.setCredentials({
        access_token: this.myTokens.accessToken,
        refresh_token: this.myTokens.refreshToken,
    });

    //That's the request call you need to make to access Google Contacts API v3 if you're using the googleapi nodejs library:
    authObj
        .request({
            headers: {
                'GData-Version': 3.0,
            },
            params: {
                alt: 'json',
                //"q":"OPTIONAL SEARCH QUERY",
                //"startindex":0
                orderby: 'lastmodified',
                sortorder: 'descending',
            },
            url: 'https://www.google.com/m8/feeds/contacts/default/full',
        })
        .then((response) => {
            console.log(response); // extracted contacts
        });
}

module.exports = { getContacts };
