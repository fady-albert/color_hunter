// IMPORT HTML DATA
const body = document.querySelector('body');
const modeBtn = document.getElementById('mode');
const modeBtnTxt = document.getElementById('modeTxt');
const container = document.getElementById('main-con');
const counter = document.getElementById('counter');
const countCon = document.getElementById('countCon');
const startBtn = document.getElementById('start');
const text =  document.getElementById('text');
const high = document.getElementById('highScore');
const score = document.getElementById('score');
const btn = document.getElementById('btn');

// DEFINE JS VARIABLES
let mode = localStorage.getItem('mode') || '';
let size = 2;
let diff = 23;
let max = 500;
let count = 0;
let newLevel = 15;
let highcore = localStorage.getItem('high') || 0;

// IMPORT SOUNDS
const clickSound = new Audio('./sounds/click.mp3');
const endSound = new Audio('./sounds/end.mp3');

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

        container.innerHTML = '';

    for(let i = 0; i < (size * size); i++) {
        const div = document.createElement('button');
        div.style.width = max/size + 'px';
        div.style.height = max/size + 'px';
        div.classList = 'square'
        container.appendChild(div);
        container.style.gridTemplateColumns = `repeat(${size}, auto)`
    }
}

function addColor() {
    const con = document.querySelectorAll('.square');

    // GET RANDOM SQUARE
    const winSquare = con[Math.floor(Math.random()  * (size * size))];

    // CREATE MAIN COLOR
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const color = `${r}, ${g}, ${b}`;

    // CREATE DIFFERENT COLOR
    const dr = Math.min(r + diff, 255);
    const dg = Math.min(g + diff, 255);
    const db = Math.min(b + diff, 255);

    const diffColor = `${dr}, ${dg}, ${db}`;

    // ADD MAIN COLOR TO ALL SQUARES
    con.forEach(box => {
        box.style.background = `rgb(${color})`;

        box.addEventListener('click', sound(clickSound));

        // THE WRONG SQUARE FUNCTION
        if(box !== winSquare) {
            box.addEventListener('click', () => {
                lose()
            })
        }
    });

    // ADD DIFFERENT COLOR TO WIN SQUARE
    winSquare.style.background = `rgb(${diffColor})`;

    // THE RIGHT SQUARE FUNCTION
    winSquare.addEventListener('click', () => {
        // EDIT COUNTER
        count++
        countTrue()

        // REPLACE THE SQUARES and create new color
        addSquares()
        addColor()

        // UPDATE HIGHSCORE
        getHighScore()
    })

    if(size < 20) {
        if(count >= newLevel) {
            levels()
        }
    } else {
        size = 20;
        diff = 5;
    }
}

// SHOW COUNTER
function countTrue() {
    counter.textContent = count;
}

// GAME LEVEL
function levels() {
    size++;
    diff--;
    newLevel = newLevel + 15;
}

function start() {
    startBtn.classList.add('hide');
    countCon.classList.add('show');
    // RUN THE MAIN FUNCTIONS
    addSquares()
    addColor()
    countTrue()
}

function getHighScore() {
    if(highcore < count) {
        highcore = count;
        localStorage.setItem('high', count)
    }

    const msg = 'highcore: ' + highcore;

    return msg;
}

// SHOW HIGH SCORE
high.textContent = getHighScore();

// LOSE FUNCTION
function lose() {
    container.innerHTML = '';
    startBtn.classList.remove('hide');
    countCon.classList.remove('show');
    text.textContent = 'game over';
    score.textContent = 'score: ' + count;
    btn.textContent = 'play again';

    count = 0;
    size = 2;
    diff = 23;
    newLevel = 15;

    high.textContent = getHighScore()
    sound(endSound)
}

function sound(e) {
    e.currentTime = 0;
    e.play()
}