const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');

const passport = require('passport');
const passportLoader = require('./passport');

const config = require('../config');

// routes
const authRouter = require('../routes/auth');

const { auth } = config.routes;

module.exports = (app) => {
    app.set('view engine', 'ejs');

    app.use(express.static('public'));

    app.use(cors({ origin: "http://localhost:/5000" }));

    app.use(cookieParser(config.secrets.cookie));

    app.use(expressSession({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: false
    }));

    passportLoader(passport);
    app.use(passport.initialize());
    app.use(passport.session());


    app.use(auth, authRouter);


    app.use('/', (req, res) => {
        res.render('index');
    })

}