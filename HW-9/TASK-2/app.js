const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const saveButton = document.getElementById('saveBtn');

window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername) usernameInput.value = savedUsername;
    if (savedPassword) passwordInput.value = savedPassword;
});

saveButton.addEventListener('click', () => {
    localStorage.setItem('username', usernameInput.value);
    localStorage.setItem('password', passwordInput.value);
});