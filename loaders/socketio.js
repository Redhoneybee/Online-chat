
module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        socket.on('join-chat', (roomCode, userId) => {
            socket.join(roomCode);

            socket.to(roomCode).broadcast.emit('user-connected', userId);

            socket.on('disconnect', () => {
                socket.to(roomCode).broadcast.emit('user-disconnected', userId);
            })
        });
    });

    console.log('Complated set socket.io')
}