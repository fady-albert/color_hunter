// IMPORT HTML DATA
const body = document.querySelector('body');
const modeBtn = document.getElementById('mode');
const modeBtnTxt = document.getElementById('modeTxt');

// CHANGE MODE BETWEEN LIGHT AND DARK
modeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    setTimeout(() => {
        modeBtnTxt.textContent = modeBtnTxt.textContent === 'light_mode' ? 'dark_mode' : 'light_mode';
    }, 500);
})