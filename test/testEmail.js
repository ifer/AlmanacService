const emailService = require('../services/emailService');

const emaildata = {
    recipients: 'ifertakis@gmail.com,yannis.fertakis@gmail.com',
    sender: 'ifertakis@gmail.com',
    subject: 'My first email',
    body: 'This is test1',
};

emailService.sendEmail(emaildata, null, (err, info) => {
    if (err) {
        console.log(err);
    } else {
        console.log(info);
    }
});
