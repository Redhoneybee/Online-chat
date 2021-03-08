

const startOnlineChat = () => {
    const socket = io('/');
    const peer = new Peer(undefined, {
        host: '/',
        port: '5001'
    });
    const peers = {};

    const wrap = document.querySelector('.videos_wrap');
    const myVideo = document.createElement('video');

    // functions

    const drawVideo = (video, stream) => {
        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => video.play());

        wrap.append(video);
    }

    const connectedToUser = (userId, stream) => {
        const call = peer.call(userId, stream);

        const video = document.createElement('video');

        call.on('stream', () => drawVideo(video, stream));

        call.on('close', () => video.remove());

        console.log('hello');
        peers[userId] = call;
    }

    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(stream => {
        drawVideo(myVideo, stream);

        peer.on('call', call => {
            call.answer(stream);

            const video = document.createElement('video');

            call.on('stream', userVideoStream => {
                drawVideo(video, userVideoStream);
            });
        });
        socket.on('user-connected', (userId) => connectedToUser(userId, stream));
    })

    peer.on('open', (userId) => {
        socket.emit('join-chat', roomCode, userId);
    });

    socket.on('user-disconnected', (userId) => {
        if (peers[userId]) peers[userId].close();
    })
}

if (owner === user) startOnlineChat();
