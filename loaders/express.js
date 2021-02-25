const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');

const config = require('../config');

module.exports = (app) => {
    app.set('view engine', 'ejs');

    app.use(express.static('public'));

    app.use(cookieParser(config.secrets.cookie));

    app.use(expressSession({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', (req, res) => {
        res.render('index');
    })

}