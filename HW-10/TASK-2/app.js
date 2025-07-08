const boxes = document.querySelectorAll('.box');

let step = 0;

setInterval(() => {
  step++;

  boxes.forEach((box, index) => {
    const size = 50 + 20 * Math.abs(Math.sin(step / 10 + index));
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
  });
}, 100);
