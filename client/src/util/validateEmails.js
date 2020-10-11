// HTML5 regex
const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
    const invalidEmails = emails
        .split(',')
        .map((email) => {
            return email.trim();
        })
        .filter((email) => {
            return regex.test(email) === false; // we want to keep only ivalid emails
        });

    if (invalidEmails.length) {
        return `${invalidEmails}`;
    }

    return;
};

//emailregex.com: regex for email validation!
