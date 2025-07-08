let timer = 6;
const interval1 = setInterval(() => {
    timer--;
    if (timer <= 0) {
        clearInterval(interval1);
    } else {
        console.log(timer);
    }
}, 1000);
