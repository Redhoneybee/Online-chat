const express = require('express');

module.exports = (app) => {
    app.set('view engine', 'ejs');

    app.use(express.static('public'));

}