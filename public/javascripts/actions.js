const actionCreateBtn = document.getElementById('action_create');
const actionAttendBtn = document.getElementById('action_attend');
const actionOKBtn = document.getElementById('action_OK')
const createAction = async (e) => {
    e.preventDefault();

    const password = passwordInput.value;
    const comparePassword = passwordInvalidInput.value;

    const { data: { url } } = await axios.post('/room/create', { password, comparePassword });

    window.location.href += url;
}

const attendAction = async (e) => {
    e.preventDefault();

    const roomCode = document.querySelector('.roomcode').value;

    const { data: { url } } = await axios.get('/room/attend', { params: { roomCode } });

    if (url) {
        window.location.href += url;
    }

}

const okAction = async (e) => {
    e.preventDefault();

    const password = document.querySelector('#room_OK .password').value;

    const { data } = await axios.post(`/room/${roomCode}/ok`, { password });


    if (data) {
        const { message } = data;
        if (message === RES_OK_SUCCESSED) {
            initInputs();
            initRealTimer();
        }
    }

}

if (actionCreateBtn) actionCreateBtn.addEventListener('click', createAction);
if (actionAttendBtn) actionAttendBtn.addEventListener('click', attendAction);
if (actionOKBtn) actionOKBtn.addEventListener('click', okAction);