const actionCreateBtn = document.getElementById('action_create');
const actionAttendBtn = document.getElementById('action_attend');

const createAction = async (e) => {
    e.preventDefault();

    const password = passwordInput.value;
    const comparePassword = passwordInvalidInput.value;

    const { data: { url } } = await axios.post('/room/create', { password, comparePassword });

    window.location.href += url;
}

const attendAction = async (e) => {

}

actionCreateBtn.addEventListener('click', createAction);
actionAttendBtn.addEventListener('click', attendAction);
