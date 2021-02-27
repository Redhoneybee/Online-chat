const GoogleStorategy = require('passport-google-oauth20').Strategy;

const config = require('../config');
module.exports = (passport) => {
    passport.use(new GoogleStorategy({
        clientID: config.oauths.google.id,
        clientSecret: config.oauths.google.secret,
        callbackURL: config.oauths.google.callback
    }, (accessToken, refreshToken, profile, done) => {

        const user = {
            accessToken,
            refreshToken,
            profile
        }
        return done(null, user);
    }));
}