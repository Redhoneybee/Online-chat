const RoomService = require('./roomService');


module.exports = (socket) => {

    socket.on('join-chat', async (roomCode, userId, peerId) => {

        const RoomServiceInstance = new RoomService();


        const flag = await RoomServiceInstance.searchInDB(roomCode);

        // room is...
        if (flag) {

            if (!(await RoomServiceInstance.checkedAlreadyUser(userId)))
                if (!(await RoomServiceInstance.insertUserInDB(userId)))
                    throw new Error("Couldn't insert user in database");

            socket.join(roomCode);

            socket.to(roomCode).broadcast.emit('user-connected', peerId);

            socket.on('disconnect', async () => {
                await RoomServiceInstance.removeUserInDB(userId);
                socket.to(roomCode).broadcast.emit('user-disconnected', peerId);
            });
        }
        else {
            throw new Error("Couldn't find the room");
        }


    });
}