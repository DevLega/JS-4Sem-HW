const target = document.getElementById('target');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

let score = 0;
let timeLeft = 30;
let gameInterval;

function moveTarget() {
  const area = document.getElementById('game-area');
  const maxX = area.clientWidth - target.clientWidth;
  const maxY = area.clientHeight - target.clientHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}

target.addEventListener('click', () => {
  score++;
  scoreEl.textContent = score;
  moveTarget();
});

function startGame() {
  moveTarget();

  gameInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(moveInterval);
      target.style.display = 'none';
      alert(`Гру завершено! Твій рахунок: ${score}`);
    }
  }, 1000);
}

startGame();