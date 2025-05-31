const input = document.getElementById("bookmarkInput")
const button = document.getElementById("addBookmarkBtn")
const list = document.getElementById("bookmarkList");
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function createBookmark(url) {
    const li = document.createElement('li');
    li.textContent = url;
    const btn = document.createElement('button')
    btn.textContent = 'delete'
    li.append(btn);
    return li;
}

function addBookmark() {
    const url = input.value;
    if(!url) return;
    bookmarks.push(url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    list.append(createBookmark(url))
    input.value = ''
}

function renderBookmarks() {
    bookmarks.forEach((url) => {
        list.append(createBookmark(url))
    })
}

function deleteTask(event) {
    if (event.target.tagName === 'BUTTON') {
        const li = event.target.parentElement;
        const url = li.firstChild.textContent;
        const index = bookmarks.indexOf(url);

        if (index > -1) {
            bookmarks.splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }

        li.remove();
    }
}

renderBookmarks()
list.addEventListener('click', deleteTask)
button.addEventListener('click', addBookmark)