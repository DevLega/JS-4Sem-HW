const delayedPromise = (text, delay) => {
    return new Promise(resolve => {
        setTimeout(() => resolve({ text, delay }), delay)
    })
}

const log = ({ text, delay }) => {
    console.log(text, delay)
}

const promises = [
    delayedPromise('firstPromise', 2000).then(log),
    delayedPromise('secondPromise', 1000).then(log),
    delayedPromise('thirdPromise', 1500).then(log),
    delayedPromise('fourthPromise', 500).then(log),
    delayedPromise('fifthPromise', 3000).then(log)
];

Promise.all(promises)