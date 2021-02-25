const GoogleStorategy = require('passport-google-oauth20').Strategy;

const config = require('../config');
module.exports = (passport) => {
    console.log(config.oauths.google.id);
    console.log(config.oauths.google.secret);
    passport.use(new GoogleStorategy({
        clientID: config.oauths.google.id,
        clientSecret: config.oauths.google.secret,
        callbackURL: config.oauths.google.callback
    }, (accessToekn, refreshToken, profile, cb) => {

        return cb(null, profile);
    }));
}