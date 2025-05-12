const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w'];
let currentKeyIndex = 0;

const keyDisplay = document.getElementById('key');
const newGameBtn = document.getElementById('newGame');

function setNewKey() {
    currentKeyIndex = Math.floor(Math.random() * keys.length);
    keyDisplay.textContent = keys[currentKeyIndex];
}

newGameBtn.addEventListener('click', () => {
    setNewKey();
    PNotify.success({
        text: 'Нова гра почата!',
        delay: 1000
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === keys[currentKeyIndex]) {
        PNotify.success({
            text: `Правильно! Натиснуто "${e.key}"`,
            delay: 1000
        });
        setNewKey();
    } else {
        PNotify.error({
            text: `Неправильно! Ви натиснули "${e.key}", а потрібно "${keys[currentKeyIndex]}"`,
            delay: 2000
        });
    }
});

document.addEventListener('keypress', (e) => {
    e.preventDefault();
});

setNewKey();