

const startOnlineChat = () => {
    const socket = io('/');
    const peer = new Peer(undefined, {
        host: '/',
        port: '5001'
    });
    const peers = {};

    const wrap = document.querySelector('.videos_wrap');
    const myVideo = document.createElement('video');


    const ul = document.querySelector('.list_body ul.users');

    // functions

    const getUsers = async () => {
        const { data: { users } } = await axios.get(`/room/${roomCode}/allusers`);
        return users ? users : undefined;
    }

    const drawUserList = (users) => {
        //  inin ul list(owner)
        ul.innerHTML = "";
        console.log(users);
        users.forEach(user => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            if (owner === user.id) {
                // owner
                li.id = "owner";
            }

            li.classList.add("user");
            img.src = user.photo;
            li.append(img);
            li.innerHTML += user.username;


            ul.append(li);
        });
    }
    const drawVideo = (video, stream) => {
        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => video.play());

        wrap.append(video);
    }

    const connectedToUser = (peerId, stream) => {
        const call = peer.call(peerId, stream);

        const video = document.createElement('video');

        call.on('stream', () => drawVideo(video, stream));

        call.on('close', async () => {
            video.remove();
            const users = await getUsers();
            if (users) drawUserList(users);
        });
        peers[peerId] = call;
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
        socket.on('user-connected', async (peerId) => {
            connectedToUser(peerId, stream);
            const users = await getUsers();
            if (users) drawUserList(users);
        });
    })

    peer.on('open', async (peerId) => {
        // user == userId
        socket.emit('join-chat', roomCode, user, peerId);
        const users = await getUsers();
        if (users) drawUserList(users);
    });

    socket.on('user-disconnected', (peerId) => {
        if (peers[peerId]) peers[peerId].close();
    })
}

if (owner === user) startOnlineChat();

