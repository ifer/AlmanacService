const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const keys = require('../config/keys');

const OAuth2 = google.auth.OAuth2;
function sendEmail(message, accessToken, refreshToken) {
    return new Promise((resolve, reject) => {
        const oauth2Client = new OAuth2(
            keys.googleClientID,
            keys.googleClientSecret // Client Secret
            // 'https://developers.google.com/oauthplayground' // Redirect URL
        );

        oauth2Client.setCredentials({
            refresh_token: refreshToken,
        });
        accessToken = oauth2Client.getAccessToken();

        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: message.from,
                clientId: keys.googleClientID,
                clientSecret: keys.googleClientSecret,
                refreshToken: refreshToken,
                accessToken: accessToken,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        smtpTransport.sendMail(message, (error, info) => {
            if (error) {
                return reject(error);
            } else {
                return resolve();
            }
        });
    });
}

// function sendEmail(message, accessToken, refreshToken, callback) {
//     const oauth2Client = new OAuth2(
//         keys.googleClientID,
//         keys.googleClientSecret // Client Secret
//         // 'https://developers.google.com/oauthplayground' // Redirect URL
//     );
//
//     oauth2Client.setCredentials({
//         refresh_token: refreshToken,
//     });
//     accessToken = oauth2Client.getAccessToken();
//
//     const smtpTransport = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             type: 'OAuth2',
//             user: message.from,
//             clientId: keys.googleClientID,
//             clientSecret: keys.googleClientSecret,
//             refreshToken: refreshToken,
//             accessToken: accessToken,
//         },
//         tls: {
//             rejectUnauthorized: false,
//         },
//     });
//
//     smtpTransport.sendMail(message, callback);
//
//
// }

module.exports = { sendEmail };
