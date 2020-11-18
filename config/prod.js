// prod.js -- production keys will be taken by env variables

// COMMIT THIS in git!

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    cookieKey: process.env.COOKIE_KEY,
    sslCertificate: process.env.SSLCERTIFICATE,
    sslPrivateKey: process.env.SSLPRIVATEKEY,
    sslChain: process.env.SSLCHAIN,

    email: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: undefined,
            accessToken: undefined,
        },
    },
};
