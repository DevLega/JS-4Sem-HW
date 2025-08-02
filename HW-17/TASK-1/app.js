const list = document.getElementById("list")
const btn = document.getElementById("btn")
const PHOTOS_PER_PAGE = 4
let page = 1

function getData() {
    const url = `https://pixabay.com/api/?key=51231125-b28d57524b499c5bb4eac00c0&per_page=${PHOTOS_PER_PAGE}&page=${page}`

    fetch(url)
    .then((value) => value.json())
    .then((data) => {
        render(data)
        page++
    })
}

function render(data) {
    const dataArr = data.hits
    console.log(dataArr);
    const markUp = dataArr.map(e => `<li><img src=${e.webformatURL}></li>`).join('')
    list.innerHTML += markUp
}

btn.addEventListener('click', () => {
    getData()
})

getData()