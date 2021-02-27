const GoogleStorategy = require('passport-google-oauth20').Strategy;

const config = require('../config');
module.exports = (passport) => {
    passport.use(new GoogleStorategy({
        clientID: config.oauths.google.id,
        clientSecret: config.oauths.google.secret,
        callbackURL: config.oauths.google.callback
    }, (accessToken, refreshToken, profile, done) => {

        return done(null, profile);
    }));
}