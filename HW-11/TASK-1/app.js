const timerOutput = document.getElementById('timer')
let timer = 60;

const interval1 = setInterval(() => {
    timer--
    timerOutput.textContent = timer
    if (timer == 30) {
        alert('Залишилось менше половини часу.');
    }

    if (timer <= 0) clearInterval(interval1);
}, 60000)