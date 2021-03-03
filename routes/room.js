const express = require('express');

const RoomModel = require('../models/room');
const UserModel = require('../models/user');

const AuthService = require('../services/authService');
const RoomService = require('../services/roomService');

const argon2 = require('argon2');

const router = express.Router();


//  create room
router.post('/create', async (req, res, next) => {
    const { password, comparePassword } = req.body;

    try {
        if (req.user) {
            const { provider } = req.user;
            const oauthId = req.user._json.sub;

            const AuthServiceInstance = new AuthService();
            const RoomServiceInstance = new RoomService();

            const result = await AuthServiceInstance.searchOauthInDB(provider, oauthId);

            if (result) RoomServiceInstance.setOwner(AuthServiceInstance.getUser());
            else return res.json({ url: "" });

            await RoomServiceInstance.create(password, comparePassword);

            const roomCode = RoomServiceInstance.getRoomCode();
            if (roomCode) {
                //  roomCode is...
                return res.json({ url: `room/${roomCode}` });
            } else {
                //  roomCode isn't...
                return res.json({ url: "" });
            }

        } else {
            throw new Error("Wrong access path");
        }

    } catch (err) {
        next(err);
    }
});

router.get('/attend', async (req, res) => {
    console.log(req.query);
    const { roomCode } = req.query;

    const RoomServiceInstance = new RoomService();

    const result = await RoomServiceInstance.searchInDB(roomCode);

    if (result) {
        return res.status(201).json({ url: `room/${roomCode}` });
    } else {
        return res.status(204).json({ url: "" });
    }
});

router.get('/:roomCode', async (req, res) => {
    const { roomCode } = req.params;
    const { provider } = req.user;
    const oauthId = req.user._json.sub;

    const AuthServiceInstance = new AuthService();
    const RoomServiceInstance = new RoomService();

    const roomsearchRet = await RoomServiceInstance.searchInDB(roomCode);
    const usersearchRet = await AuthServiceInstance.searchOauthInDB(provider, oauthId);

    if (!roomsearchRet || !usersearchRet) return res.status(204).redirect('/');
    const msg = {
        roomCode: RoomServiceInstance.getRoomCode(),
        owner: RoomServiceInstance.getOwner()._id,
        user: AuthServiceInstance.getUser()._id
    };
    return res.status(200).render('room', msg);

});


router.post('/:roomCode/OK', async (req, res) => {
    const { roomCode } = req.params;
    const { password } = req.body;

    const RoomServiceInstance = new RoomServiceInstance();

    const result = await RoomServiceInstance.searchInDB(roomCode);

    if (result) {
        // room is...

        const isValid = await RoomServiceInstance.isValidNotOwner(password);

        console.log(isValid);

        if (isValid) {
            return res.status(200).json({ message: "res_ok_successed" });
        } else {
            return res.status(204).json({ message: "res_ok_failed_password" });
        }
    } else {
        // room isn't...   
        return res.status(400).json({ message: "res_ok_not_found" });
    }
});

module.exports = router;