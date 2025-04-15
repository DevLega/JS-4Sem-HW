const input = document.querySelector('.slider__input');
const image = document.querySelector('.slider__image');

input.addEventListener('input', _.debounce(() => {
    image.style.width = `${input.value * 3}px`;
    image.style.height = `${input.value * 3}px`;
}, 500));