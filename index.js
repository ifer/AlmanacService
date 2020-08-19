const path = require('path');

// Global variables before any local 'require'
global.appRoot = path.resolve(__dirname);

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

// The following files are executed without returing an object
require('./models/User');
require('./services/passport');
// Order matters to the above statements!

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const keys = require('./config/keys');

// console.log

// In production, take the port number by the env variable PORT
// In development, use 5000
const PORT = process.env.PORT || 5000;

const app = express();

// app.use (..) function iniializes different 'middlewares'.
// Middlewares are functions that have access to the request object (req), the response object (res),
// and the next middleware function in the application’s request-response cycle

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
// apiRoutes(app);

app.listen(PORT);

// Only for modules than run directly (e.g. for testing)
// All other modules will inherit this global variable
function getAppRoot() {
    return appRoot;
}

module.exports = {
    getAppRoot,
};
