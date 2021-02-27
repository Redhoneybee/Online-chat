const express = require('express');

const AuthService = require('../services/authService')();

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.user) {
        //    user 
        // AuthService.setUser(req.user);
        await AuthService.setUserInDB(req.user);
        const user = JSON.stringify(AuthService.getUser());

        console.log(user);
        return res.render('index', { user });
    } else {
        //   user isn't...
        return res.render('index');
    }
});

module.exports = router;