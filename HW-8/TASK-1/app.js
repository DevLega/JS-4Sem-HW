const input = document.getElementById("bookmarkInput")
const button = document.getElementById("addBookmarkBtn")
const list = document.getElementById("bookmarkList");
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function createBookmark(url, index) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = url;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'редагувати';
    editBtn.style.marginLeft = '10px';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'видалити';
    deleteBtn.classList.add('delete');

    editBtn.addEventListener('click', () => editBookmark(index, span));
    deleteBtn.addEventListener('click', () => deleteBookmark(index));

    li.append(span, editBtn, deleteBtn);
    return li;
}

function addBookmark() {
    const url = input.value.trim();
    if (!url) return;
    bookmarks.push(url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    list.append(createBookmark(url, bookmarks.length - 1));
    input.value = '';
}

function renderBookmarks() {
    list.innerHTML = '';
    bookmarks.forEach((url, index) => {
        list.append(createBookmark(url, index));
    });
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
}

function editBookmark(index, spanElement) {
    const currentValue = bookmarks[index];
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentValue;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'зберегти';

    const parent = spanElement.parentElement;
    parent.insertBefore(inputField, spanElement);
    parent.insertBefore(saveBtn, spanElement);
    spanElement.remove();

    saveBtn.addEventListener('click', () => {
        const newValue = inputField.value.trim();
        if (!newValue) return;

        bookmarks[index] = newValue;
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        renderBookmarks();
    });
}

renderBookmarks();
button.addEventListener('click', addBookmark);
