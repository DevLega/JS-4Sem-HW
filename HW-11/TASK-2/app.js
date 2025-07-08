const timerOutput = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');

let timer = 30000;

function start() {
  startBtn.disabled = true;
  timer = 30000;
  timerOutput.textContent = (timer / 1000).toFixed(3);

  const interval = setInterval(() => {
    timer -= 10;
    if (timer < 0) timer = 0;

    timerOutput.textContent = (timer / 1000).toFixed(3);

    if (timer <= 10000) {
      timerOutput.classList.add('blink');
    }

    if (timer <= 0) {
      clearInterval(interval);
      startBtn.disabled = false;
      timerOutput.classList.remove('blink');
    }
  }, 10);
}

start();

startBtn.addEventListener('click', start);
