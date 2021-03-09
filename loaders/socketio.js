const chatService = require('../services/chatService');

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        // chat service
        chatService(socket);
    });

    console.log('Complated set socket.io')
}