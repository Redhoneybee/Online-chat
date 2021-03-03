const modal_title = {
    create: "방 생성",
    attend: "방 참여",
};

const create = document.getElementById(CREATE);
const attend = document.getElementById(ATTEND);

const inputs = document.querySelectorAll('input');
const closes = document.querySelectorAll('#close');

//  실시간 체크 
let realtimeId = undefined;

const passwordInput = document.querySelector('#room_create .password');
const passwordInvalidInput = document.querySelector('.password_invalid');
const passwordChecked = document.querySelector('.password_checked');

const roomOK = document.getElementById('room_OK');

const changeActionBtn = (id, flag) => {
    const btn = document.querySelector(`#room_${id} .action_btn`);
    if (flag) btn.disabled = false;
    else btn.disabled = true;
}

const drawChecker = (flag) => {
    if (flag) {
        passwordChecked.innerHTML = FACHECKCIRCLE;
    } else {
        passwordChecked.innerHTML = FATIMESCIRCLE;
    }
}

const invalidPassword = (password, comparePassword) => {
    if (password !== comparePassword) return false;
    else if (typeof password !== "string" || typeof comparePassword !== "string") return false;
    else if (password === "" || comparePassword === "") return false;
    else return true;
}

const checkedInput = (id, done) => {
    const inputs = document.querySelectorAll(`#room_${id} input`);

    let flag = true;

    inputs.forEach(input => {
        if (!input.value) flag = false;
    });

    // callback 
    if (done) {
        flag = done(passwordInput.value, passwordInvalidInput.value);
        drawChecker(flag);
    }
    changeActionBtn(id, flag);

}


const drawModal = (e) => {
    e.preventDefault();

    const { id } = e.target;

    document.querySelectorAll('.modal_contents .active_form').forEach(e => e.classList.remove(ACTIVE));

    document.querySelector('.modal_title .string').innerHTML = modal_title[id];

    document.getElementById(`room_${id}`).classList.add(ACTIVE);

    document.querySelector('.modal_wrap').classList.add(VISIBLE);

    if (id === CREATE) {
        realtimeId = setInterval(() => checkedInput(id, invalidPassword), 100);
    } else if (id === ATTEND) {
        realtimeId = setInterval(() => checkedInput(id), 100)
    }
}

const focusInput = (e) => {
    const label = e.target.previousSibling.previousSibling;

    label.classList.add(VISIBLE);
}
const focusoutInput = (e) => {
    const label = e.target.previousSibling.previousSibling;
    const { value } = e.target;

    if (!value) label.classList.remove(VISIBLE);
}

const initRealTimer = () => {
    if (realtimeId !== undefined) {
        clearInterval(realtimeId);
        realtimeId = undefined;
    }
}

const initInputs = () => {
    document.querySelector('.modal_wrap').classList.remove(VISIBLE);
    inputs.forEach(input => input.value = "");
    document.querySelectorAll('.textbox_label').forEach(label => label.classList.remove(VISIBLE));
}

const eraseModal = (e) => {
    e.preventDefault();

    const modalID = e.target.parentNode.parentNode.parentNode.getAttribute('id');

    if (modalID === "room_OK") {
        window.location.href = "/";
        initRealTimer();
    }
    initInputs();
    initRealTimer();
}


if (create) create.addEventListener('click', drawModal);
if (attend) attend.addEventListener('click', drawModal);

if (inputs) inputs.forEach(input => input.addEventListener('focus', focusInput));
if (inputs) inputs.forEach(input => input.addEventListener('focusout', focusoutInput));
if (closes) closes.forEach(close => close.addEventListener('click', eraseModal));

if (roomOK) {
    (function (id) {
        realtimeId = setInterval(() => checkedInput(id), 100)
    })(OK);
}