const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Get User model class from mongoose
const User = require('../models/User').User;

const contactsService = require('../services/contactsService');

// The function passed as argument to 'serializeUser' is used by  Passport
// to create a cookie and send it to the browser.
// We pass to the function a User class instance which is turned into an id
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// This function is called by Passport when user makes a request via browser.
// We take an id and turn it to a User class instance
passport.deserializeUser((id, done) => {
    // Find the user record in the database
    User.findOne({ _id: id }).then((user) => {
        done(null, user);
    });
});

passport.use(
    // Takes 2 args:
    // (1) An object with the options needed
    // (2) A function which will be called when 'callbackURL' provided to Google is called.
    //     In this function we will save the user into our database  (if not already saved)
    new GoogleStrategy(
        {
            // Strategy options
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback', // url where user will be redirected after granting permission
            proxy: true, // This is needed because if missing, GoogleStrategy will use http for callbackURL instead of https that is expected
            // This has to do with the fact that we are using relative path for callbackURL.
        },
        (accessToken, refreshToken, profile, done) => {
            // Function that is called after callback route is executed and google returns access token
            // Check if user already exists
            console.log(`accessToken: ${accessToken}`);
            User.findOne({ googleid: profile.id }).then((existingUser) => {
                if (!existingUser) {
                    let newuser = User.create({
                        googleid: profile.id,
                        displayname: profile.displayName,
                    });
                    newuser.save().then((u) => {
                        console.log(`User ${u.displayname} added`);
                        done(null, newuser);
                    });
                } else {
                    console.log(`User ${existingUser.displayname} already exists`);
                    done(null, existingUser);
                }
            });

            // let contacts;
            //
            // contactsService
            //     .fetchContacts(accessToken)
            //     .then((c) => {
            //         contacts = c;
            //         console.log(`contacts number = ${contacts.length}`);
            //         contacts.forEach((item, i) => {
            //             console.log(`${JSON.stringify(item)}`);
            //         });
            //     })
            //     .catch((errmsg) => {
            //         console.log('ERROR:' + errmsg);
            //     });
        }
    )
);
