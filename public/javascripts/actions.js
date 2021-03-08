const actionCreateBtn = document.getElementById('action_create');
const actionAttendBtn = document.getElementById('action_attend');
const actionOKBtn = document.getElementById('action_OK')
const actionCopyBtn = document.getElementById("action_copy");
const actionListBtn = document.getElementById("action_list");
const actionListCloseBtn = document.getElementById('action_list_close');

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
            console.log(message);
            initInputs();
            initRealTimer();
            startOnlineChat();
        }
    }

}

const roomCodeCopyAction = () => document.execCommand('copy');
const sideListViewAction = (e) => {
    e.preventDefault();

    document.querySelector('.header').classList.remove(VISIBLE);
    setTimeout(() => document.querySelector('.users_list').classList.add(VISIBLE), 200);
}
const sideListCloseAction = (e) => {
    e.preventDefault();
    document.querySelector('.users_list').classList.remove(VISIBLE);
    setTimeout(() => document.querySelector('.header').classList.add(VISIBLE), 200);
}

if (actionCreateBtn) actionCreateBtn.addEventListener('click', createAction);
if (actionAttendBtn) actionAttendBtn.addEventListener('click', attendAction);
if (actionOKBtn) actionOKBtn.addEventListener('click', okAction);
if (actionCopyBtn) actionCopyBtn.addEventListener('click', roomCodeCopyAction);
if (actionListBtn) actionListBtn.addEventListener('click', sideListViewAction);
if (actionListCloseBtn) actionListCloseBtn.addEventListener('click', sideListCloseAction);