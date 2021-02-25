const express = require('express');

const AuthService = require('../services/authService')();

const router = express.Router();

router.get('/', (req, res) => {
    if (req.user) {

        //    user 
        AuthService.setUser(req.user);
        const user = JSON.stringify(AuthService.getUser());
        return res.render('index', { user });
    } else {
        //   user isn't...
        return res.render('index');
    }
});

module.exports = router;