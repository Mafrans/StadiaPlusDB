var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var router = express.Router();
var User = require('../User');
var config = require('../config.json')

passport.use(
    new GoogleStrategy(
        {
            clientID: config.clientID,
            // clientSecret: config.clientSecret,
            callbackURL: config.callbackURL,
        },
        function (accessToken, refreshToken, profile, done) {
            User.login(profile, function (err, user) {
                return done(err, user);
            });
        },
    ),
);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get(
    '/google',
    function(req, res, next) {
        console.log('auth route')
        req.session.redirect = req.query.redirect;
        next();
    },
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ],
    })
    
);

passport.serializeUser(function (user, done) {
    console.log('serializing user')
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    User.login(id, function (user) {
        console.log('deserializing user')
        done(null, user);
    });
});

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('callback route', req.user)
        res.redirect(req.session.redirect + '#' + req.user.authToken);
    },
);
module.exports = router;
