//variables

const showLoginBtn = getElement('showloginBtn')
const showSignupBtn = getElement('showSignupBtn')
const loginForm = getElement('loginForm')
const signupForm = getElement('signupForm')
const signupBtn = getElement('signupBtn')
const loginBtn = getElement('loginBtn')
const signupUsername = getElement('signupUsername')
const loginUsername = getElement('loginUsername')
const signupPassword = getElement('signupPassword')
const loginPassword = getElement('loginPassword')
const signupEmail = getElement('signupEmail')

const authErrMsg = getElement('authErrMsg')
const succErrMsg = getElement('succErrMsg')

const BASE_URL = 'https://ecommce-be.herokuapp.com/ecomm/api/v1'








// event listeners

showSignupBtn.addEventListener('click', showSignup)
showLoginBtn.addEventListener('click', showLogin)
loginBtn.addEventListener('click', loginFn)
signupBtn.addEventListener('click', signupFn)




//functions
function showSignup() {

    signupForm.classList.remove('d-none')
    loginForm.classList.add('d-none')

}
function showLogin() {

    signupForm.classList.add('d-none')
    loginForm.classList.remove('d-none')


}

function signupFn() {

    if (signupUsername.value == "") {
        updateAuthErrorMsg('Username should not be empty')
    } else if (signupPassword.value == "") {
        updateAuthErrorMsg('Password should not be empty')
    } else {
        const data = {
            username: signupUsername.value,
            password: signupPassword.value,
            email: signupEmail.value
        }


        fetch(`https://ecommce-be.herokuapp.com/ecomm/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log("data", data)
            updateSuccErrorMsg(data.message)
        }).catch((error) => console.log('Error:', error))



    }

}
function loginFn() {
    console.log('working')
    if (loginUsername.value == "") {
        updateAuthErrorMsg('Username should not be empty')
    } else if (loginPassword.value == "") {
        updateAuthErrorMsg('Password should not be empty')
    } else {
        const data = {
            username: loginUsername.value,
            password: loginPassword.value,
        }


        fetch(`${BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log("data", data)

            if (data.accessToken) {
                localStorage.setItem('username', data.username)
                localStorage.setItem('userId', data.id)
                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('email', data.email)

                redirectToHome()
            } else {
                updateAuthErrorMsg(data.msg)
            }

        }).catch((error) => console.log('Error:', error))

    }
}
function redirectToHome() {
    window.location.href = 'index.html'
}
function updateSuccErrorMsg(msg) {
    succErrMsg.innerText = msg
}
function updateAuthErrorMsg(msg) {
    authErrMsg.innerText = msg
}
function getElement(id) {
    return document.getElementById(id)
}
