const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    oauthprovider: {
        type: String,
        required: true
    },
    oauthid: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String
    },
    role: {
        type: String,
        default: 'User',
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', User); 