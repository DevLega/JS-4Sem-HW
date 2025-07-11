const randomDelay = (text) => {
    const delay = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
    return new Promise(resolve => {
        setTimeout(() => resolve({text, delay}), delay)
    })
}

const log = ({ text, delay }) => {
    console.log(`Найшвидший проміс: ${text}, затримка: ${delay}мс`);
}

const promises = [
    randomDelay('firstPromise'),
    randomDelay('secondPromise'),
    randomDelay('thirdPromise'),
    randomDelay('fourthPromise'),
    randomDelay('fifthPromise')
]

Promise.race(promises).then(log);