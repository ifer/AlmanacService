const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const keys = require('../config/keys');

const OAuth2 = google.auth.OAuth2;

function sendEmail(message, accessToken, refreshToken, callback) {
    // let transport = nodemailer.createTransport({
    //     host: keys.email.host,
    //     port: keys.email.port,
    //     secure: keys.email.secure,
    //     auth: {
    //         type: keys.email.type || undefined,
    //         user: keys.email.auth.user || message.from,
    //         pass: keys.email.auth.pass || undefined,
    //         accessToken: accessToken || undefined,
    //     },
    // });

    // console.log(message);

    // console.log(
    //     `host=${keys.email.host} port=${keys.email.port} user=${message.from} pass=${keys.email.auth.pass} accessToken=${accessToken} refreshToken=${refreshToken}`
    // );
    // console.log('sendEmail: message=' + JSON.stringify(message));

    let trasporterArgs = {
        host: 'smtp.gmail.com',
        port: 465,
        // secure: true,
        auth: {
            type: 'OAuth2',
            user: message.from,
            accessToken: accessToken,
            clientId: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            // refreshToken: refreshToken,
        },
    };

    let transporter = nodemailer.createTransport(trasporterArgs);

    transporter.sendMail(message, callback);
}

module.exports = { sendEmail };
