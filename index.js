const path = require('path');

// Global variables before any local 'require'
global.appRoot = path.resolve(__dirname);
global.database = {};

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const connect = require('camo').connect;
const fs = require('fs');
const https = require('https');

const dbURI = `nedb://${appRoot}/db/users`;

// The following files are executed without returing an object
require('./models/User');
require('./services/passport');
// Order matters to the above statements!

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const keys = require('./config/keys');

connect(dbURI).then((db) => {
    database = db;

    // console.log('Deleting: ');
    // const User = require('./models/User').User;
    // // User.findOne({ googleid: '108792367941895914037' }).then((user) => {
    // //     user.delete();
    // //     console.log('Deleted: ' + user.displayname);
    // // });
    // User.deleteMany({ displayname: 'Ioannis Fertakis' }).then((m) => {
    //     console.log('Deleted: ' + m);
    // });

    // process.exit(0);
    // User.deleteOne({ googleid: '108792367941895914037' }).then((m) => {
    //     console.log('Deleted: ' + m);
    // });
});

// In production, take the port number by the env variable PORT
// In development, use 5000
const PORT = process.env.PORT || 5000;
const SSLPORT = process.env.SSLPORT || 5001;

const app = express();

// app.use (..) function iniializes different 'middlewares'.
// Middlewares are functions that have access to the request object (req), the response object (res),
// and the next middleware function in the application’s request-response cycle

app.use(bodyParser());

// Tell Express to use cookies.
// Config cookieSession setting cookies maxAge and encryption keys
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
// passport.initialize() initialises the authentication module
app.use(passport.initialize());

// passport.session() is another middleware that alters the request object and change the 'user' value
// that is currently the session id (from the client cookie) into the true deserialized user object
app.use(passport.session());

// Declare all the app routes (URLs) relative to authorization
authRoutes(app);
apiRoutes(app);

//// DEPLOYMENT TO PRODUCTION CONFIG
// AFTER declaring api routes!!
if (process.env.NODE_ENV === 'production') {
    // serve up production assets
    app.use(express.static('client/build'));
    // let the react app to handle any unknown routes
    // serve up the index.html if express does'nt recognize the route

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// app.listen(PORT);

// Certificate
const privateKey = fs.readFileSync(keys.sslPrivateKey, 'utf8');
const certificate = fs.readFileSync(keys.sslCertificate, 'utf8');
// const ca = fs.readFileSync(config.sslChain, 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    // ca: ca
    rejectUnauthorized: false,
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(SSLPORT, () => {
    console.log(`HTTPS server started on port ${SSLPORT}`);
});

// Only for modules than run directly (e.g. for testing)
// All other modules will inherit this global variable
function getAppRoot() {
    return appRoot;
}

module.exports = {
    getAppRoot,
};
