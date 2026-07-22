// IMPORT HTML DATA
const body = document.querySelector('body');
const modeBtn = document.getElementById('mode');
const modeBtnTxt = document.getElementById('modeTxt');
const container = document.getElementById('main-con');

// DEFINE JS VARIABLES
let mode = localStorage.getItem('mode') || '';
let size = 2;
let diff = 20;
let max = 500;
let  color;
let diffColor;
let winSquare;

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

function addColor() {
    const con = document.querySelectorAll('.square');

    winSquare = con[Math.floor(Math.random()  * (size * size))];

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    color = `${r}, ${g}, ${b}`;

    const dr = Math.min(r + diff, 255);
    const dg = Math.min(g + diff, 255);
    const db = Math.min(b + diff, 255);

    diffColor = `${dr}, ${dg}, ${db}`;

    con.forEach(box => {
        box.style.background = `rgb(${color})`;
    });

    winSquare.style.background = `rgb(${diffColor})`;
}

addSquares()
addColor()