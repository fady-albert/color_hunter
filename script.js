// IMPORT HTML DATA
const body = document.querySelector('body');
const modeBtn = document.getElementById('mode');
const modeBtnTxt = document.getElementById('modeTxt');

// DEFINE JS VARIABLES
let mode = localStorage.getItem('mode') || '';

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