const nodemailer = require('nodemailer');

const keys = require('../config/keys');

function sendEmail(emaildata, accessToken, callback) {
    let transport = nodemailer.createTransport({
        host: keys.email.host,
        port: keys.email.port,
        secure: keys.email.secure,
        auth: {
            type: keys.email.type || undefined,
            user: keys.email.auth.user || emaildata.sender,
            pass: keys.email.auth.pass || undefined,
            accessToken: accessToken || undefined,
        },
    });

    console.log(
        `host=${keys.email.host} port=${keys.email.port} user=${keys.email.auth.user} pass=${keys.email.auth.pass} accessToken=${accessToken}`
    );
    console.log(JSON.stringify(emaildata));
    // process.exit(1);

    const message = {
        from: emaildata.sender, // Sender address
        to: emaildata.recipients, // List of recipients
        subject: emaildata.subject, // Subject line
        text: emaildata.body, // Plain text body
    };

    transport.sendMail(message, callback);

    // transport.sendMail(message, function (err, info) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(info);
    //     }
    // });
}

module.exports = { sendEmail };
