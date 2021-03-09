const AuthService = require('./authService');

const { v4: uuidV4 } = require('uuid');
const { randomBytes } = require('crypto');
const argon2 = require('argon2');

const RoomModel = require('../models/room');

class roomService {
    #owner;
    #room;

    constructor() {
        this.#owner = null;
        this.#room = null;
    };

    setOwner(user) {
        this.#owner = user;
    }
    getOwner = () => this.#owner;
    setRoom(room) {
        this.#room = room;
    }
    getRoom = () => this.#room;
    getRoomCode = () => this.#room.roomCode;


    // is...
    isRoom = () => this.#room ? true : false;

    static isValiedPassword(password, compare) {
        if (!password || !compare) return false;
        else if (typeof password !== "string" || typeof compare !== "string") return false;
        else if (password !== compare) return false;
        else return true;
    };

    async create(password, compare) {
        if (roomService.isValiedPassword(password, compare)) {
            const salt = randomBytes(32);
            const passwordHash = await argon2.hash(password, salt);

            const roomCode = uuidV4();
            const { _id } = this.#owner;

            const recode = await RoomModel.create({
                roomCode,
                password: passwordHash,
                salt: salt.toString('hex'),
                owner: _id
            });
            this.#room = recode;
        } else {
            throw new Error("Couldn't create new room");
        }
    };

    async isValidNotOwner(password) {
        return await argon2.verify(this.#room.password, password);
    }

    async searchInDB(roomCode) {
        const AuthServiceInstance = new AuthService();
        const room = await RoomModel.findOne({ roomCode });
        if (!room) return false;
        else this.setRoom(room);

        const result = await AuthServiceInstance.searchIdInDB(this.#room.owner);

        if (result) this.setOwner(AuthServiceInstance.getUser());
        else return false;

        return true;
    };


    async insertUserInDB(userId) {
        if (this.isRoom()) {
            // room is...
            const room = this.#room;

            await room.addUser(userId);

            return true;
        } else {
            return false;
        }
    };


    async removeUserInDB(userId) {
        if (this.isRoom()) {
            // room is...

            const room = this.#room;

            await room.removeUser(userId);

            return true;

        } else {
            return false;
        }
    }
}

module.exports = roomService;