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


Room.methods.addUser = function (_userId) {
    this.users.push({ userId: _userId })
    return this.save();
}

Room.methods.removeUser = function (_userId) {
    this.users.pull({ userId: _userId });
    return this.save();
}

Room.methods.checkedAlreadyUser = function (_userId) {
    for (user of this.users) {
        const { userId } = user;
        if (userId === _userId) return true;
    }
    return false;
}


module.exports = mongoose.model("Room", Room);