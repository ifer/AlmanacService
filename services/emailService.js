const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const axios = require('axios');

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

function sendEmailGoogleAPI(message, accessToken, refreshToken) {
    return new Promise((resolve, reject) => {
        // Base64-encode the mail and make it URL-safe
        // (replace all "+" with "-" and all "/" with "_")

        const utf8Subject = `=?utf-8?B?${Buffer.from(message.subject).toString('base64')}?=`;

        const email =
            `Content-Type: text/plain; charset="UTF-8"\n` +
            `MIME-Version: 1.0\n` +
            `Content-Transfer-Encoding: 7bit\n` +
            `to: ${message.to} \n` +
            `from: ${message.from} \n` +
            `subject: ${utf8Subject}\n\n` +
            `${message.text}`;

        // console.log(email);

        const encodedMail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

        const options = {
            method: 'POST',
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages/send',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                raw: encodedMail,
            }),
        };

        axios(options)
            .then((response) => {
                if (response.status === 200) {
                    return resolve();
                } else {
                    return reject(response.statusText);
                }
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    // console.log('1: ');
                    return reject(error.response.data.error.message);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    return reject(error.message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                    return reject(error.message);
                }
            });
    });
}

module.exports = { sendEmail, sendEmailGoogleAPI };
