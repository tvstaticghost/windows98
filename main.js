/* script to add the current local time */

function displayTime() {
    const time = document.getElementById('time');
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let amOrPm = 'AM';

    if (hour > 12) {
        hour = hour - 12;
    }

    if (minutes < 10) {
        minutes = minutes.toString();
        minutes = `0${minutes}`;
    }

    if (hour >= 12) {
        amOrPm = 'PM';
    }
    else {
        amOrPm = 'AM';
    }

    time.textContent = `${hour}:${minutes} ${amOrPm}`;
}
displayTime();
setInterval(displayTime, 1000);

/* script to add border around applications on click */

const display = document.getElementById('file-explorer');
const notepad = document.getElementById('note-pad');
display.addEventListener('click', () => highlight(display));
notepad.addEventListener('click', () => highlight(notepad));


function highlight(shortcut) {
    if (shortcut.classList.contains('add__border')) {
        shortcut.classList.remove('add__border');
    }
    else {
        shortcut.classList.add('add__border');
    }
}

/* script to open and close applications */

notepad.addEventListener('dblclick', () => openApplication(notepadExe));
display.addEventListener('dblclick', () => openApplication(displayExe));


const notepadExe = document.getElementById('notepad-exe');
const displayExe = document.getElementById('display-exe');
const exit = document.getElementById('exit-btn');
const minimize = document.getElementById('min-btn');
const max = document.getElementById('max-btn');

const displayExit = document.getElementById('display-exit');
const displayMin = document.getElementById('display-min');
const displayMax = document.getElementById('display-max');

const div = document.createElement('div');
const startMenu = document.getElementById('start-menu');
const img = document.createElement('img');
const openWith = document.getElementById('application-tab');

const applicationList = [
    'Untitled.txt - NotePad',
    'Display Properties'
];

let noteListenerAdded = false;
let displayListenerAdded = false;

exit.addEventListener('click', () => closeApplication(notepadExe));
max.addEventListener('click', () => expandWindow(notepadExe));

displayExit.addEventListener('click', () => closeApplication(displayExe));
displayMax.addEventListener('click', () => expandWindow(displayExe));

function openApplication(application) {

    let myEventListner = function () {
        console.log('click');
        if (application.style.display === 'block') {
            minimizeApplication(application, div);
        }
        else {
            maximizeApplication(application, div);
        }
    };

    application.style.display = 'block';
    startMenu.appendChild(div);
    div.setAttribute('id', 'application-tab');

    if (application.classList.contains('notepad__exe')) {
        div.textContent = applicationList[0];
    }
    else {
        div.textContent = applicationList[1];
    }

    div.classList.add('taskbar__add');

    const openWith = document.getElementById('application-tab');

    if (application === notepadExe) {
        minimize.addEventListener('click', () => minimizeApplication(application, div));

        if (!noteListenerAdded) {
            openWith.addEventListener('click', myEventListner);
            noteListenerAdded = true;
        }
    }
    else {
        displayMin.addEventListener('click', () => minimizeApplication(application, div));

        if (!displayListenerAdded) {
            openWith.addEventListener('click', myEventListner);
            displayListenerAdded = true;
        }
    }
}

function closeApplication(application) {
    application.style.display = 'none';
    startMenu.removeChild(document.getElementById('application-tab'));

    if (application.classList.contains('task__expand')) {
        application.classList.remove('task__expand');
        application.classList.add('notepad__exe');
    }
}

function minimizeApplication(application, bar) {
    application.style.display = 'none';
    bar.classList.remove('taskbar__add');
    bar.classList.add('taskbar__min');
}

function maximizeApplication(application, bar) {
    application.style.display = 'block';
    bar.classList.remove('taskbar__min');
    bar.classList.add('taskbar__add');
}

function expandWindow(application) {
    console.log('click');
    if (application.classList.contains('task__expand')) {
        if (application === notepadExe) {
            application.classList.add('notepad__exe');
            application.classList.remove('task__expand');
        }
        else {
            application.classList.add('display__exe');
            application.classList.remove('task__expand');
        }
    }
    else {
        if (application === notepadExe) {
            application.classList.remove('notepad__exe');
            application.classList.add('task__expand');
        }
        else {
            application.classList.remove('display__exe');
            application.classList.add('task__expand');
        }
    }
}

/* application options scripts */

const notepadFile = document.getElementById('notepad-file');
const notepadEdit = document.getElementById('notepad-edit');
const notepadSearch = document.getElementById('notepad-search');
const notepadHelp = document.getElementById('notepad-help');

const colorSlider = document.getElementById('color-slider');
const root = document.querySelector(':root');
const selectedColor = document.getElementById('selected-color');
const setBtn = document.getElementById('set-btn');

colorSlider.addEventListener('input', () => {
    const hue = colorSlider.value;
    selectedColor.style.borderColor = `hsl(${hue},100%,25.1%)`;
    selectedColor.style.backgroundColor = `hsl(${hue},100%,25.1%)`;
});

setBtn.addEventListener('click', setBackgroundColor);

function setBackgroundColor() {
    const hue = colorSlider.value;
    root.style.setProperty('--teal', `hsl(${hue},100%,25.1%)`);
}

/* start button script */

const startBtn = document.getElementById('start-btn');
const menuList = document.getElementById('menu-list');
startBtn.addEventListener('click', renderStartMenu);

function renderStartMenu() {
    if (menuList.classList.contains('start__menu')) {
        menuList.classList.remove('start__menu');
        menuList.classList.add('start__closed');
        startBtn.classList.remove('startbtn__clicked');
        startBtn.classList.add('start__btn');
    }
    else {
        menuList.classList.remove('start__closed');
        menuList.classList.add('start__menu');
        startBtn.classList.remove('start__btn');
        startBtn.classList.add('startbtn__clicked');
    }
}