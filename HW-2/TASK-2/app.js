const box = document.getElementById('box');

document.addEventListener('mousemove', _.debounce((event) => {
    box.style.left = `${event.clientX}px`;
    box.style.top = `${event.clientY}px`;
}, 100));