
const userIntro = document.getElementById('userIntro')
const logoutBtn = document.getElementById('logoutBtn')

const BASE_URL = 'https://ecommce-be.herokuapp.com/ecomm/api/v1'


logoutBtn.addEventListener('click', logoutFn)

function logoutFn() {
    localStorage.removeItem('username')
    window.location.href = 'login.html'
}

if (!localStorage.getItem('username')) {
    window.location.href = 'login.html'
} else {
    userIntro.innerText = 'Hi ' + localStorage.getItem('username')
}