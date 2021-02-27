const mongoose, { Schema } = require('mongoose');

const User = new Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    oauthpath: {
        type: String,
        required: true
    },
    oauthid: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'User',
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', User); 