const inputSeconds = document.getElementById('inputSeconds')
const start = document.getElementById('start')

start.addEventListener('click', () => {
    const inputValue = inputSeconds.value * 1000
    setTimeout(() => {
        console.log("Час вийшов")
    }, inputValue)
})