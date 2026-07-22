// IMPORT HTML DATA
const body = document.querySelector('body');
const modeBtn = document.getElementById('mode');
const modeBtnTxt = document.getElementById('modeTxt');
const container = document.getElementById('main-con');

// DEFINE JS VARIABLES
let mode = localStorage.getItem('mode') || '';
let size = 2;
let max = 500;

// CHANGE MODE BETWEEN LIGHT AND DARK
function darkMode() {
    body.classList.toggle('dark');

    setTimeout(() => {
        modeBtnTxt.textContent = modeBtnTxt.textContent === 'light_mode' ? 'dark_mode' : 'light_mode';
    }, 500);
}

modeBtn.addEventListener('click', () => {
    darkMode()

    localStorage.setItem('mode', mode === 'dark' ? 'light' : 'dark');
})

if(mode === 'dark') {
    darkMode()
}

// ADD HTML SQUARES
function addSquares() {
    for(let i = 0; i < (size * size); i++) {
        const div = document.createElement('div');
        div.style.width = max/size + 'px';
        div.style.height = max/size + 'px';
        div.classList = 'square'
        container.appendChild(div);
        container.style.gridTemplateColumns = `repeat(${size}, auto)`
    }
}

addSquares()