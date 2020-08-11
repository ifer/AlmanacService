// keys.js: determine whether we are in production or development env
// and return the appropriate set of keys

// COMMIT THIS in git!

// The NODE_ENV env variable will be set to 'PRODUCTION' in Heroku
if (process.env.NODE_ENV === 'production') {
    // we are in production
    // export ./prod.js
    module.exports = require('./prod');
} else {
    // we are in development
    // export ./dev.js
    module.exports = require('./dev');
}
