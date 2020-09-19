const passport = require('passport');

//Wrap all to an exported anonymous function
//so that we can call it from index.js with app as an argument
module.exports = (app) => {
    // Setup route handler for google authentication
    app.get(
        '/auth/google', //our URL
        passport.authenticate('google', {
            accessType: 'offline', // necessary in order to receive Refresh Token
            prompt: 'consent', // necessary in order to receive Refresh Token
            scope: [
                'profile',
                'email',
                'https://www.googleapis.com/auth/contacts.readonly',
                'https://www.googleapis.com/auth/userinfo.email',
            ], // access to user info
        })
    );
    //Read-write contacts scope: 'https://www.googleapis.com/auth/contacts' or 'https://www.google.com/m8/feeds'

    // Setup route handler for google authentication callback
    app.get(
        '/auth/google/callback', //our URL
        passport.authenticate('google'), // authentication
        (req, res) => {
            // after auth, redirect to surveys
            res.redirect('/');
        }
    );

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/'); // after logout, redirect to landing page
    });
};
