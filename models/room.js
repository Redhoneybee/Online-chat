const mongoose = require('mongoose');

const Room = new mongoose.Schema({
    roomCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    users: [new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    }, {
        _id: false
    })]

}, {
    timestamps: true
});


Room.methods.addUser = function (userId) {
    console.log(this);
    console.log(userId);
    this.users.push({ userId })
    return this.save();
}

Room.methods.removeUser = function (userId) {
    this.users.pull({ userId });
    return this.save();
}


module.exports = mongoose.model("Room", Room);