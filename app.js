//1. we grab the buttons/container from the DOM
const loginBtn = document.getElementById('login-btn');
const registrationBtn = document.getElementById('register-btn');
const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('register-form');
const backButtons = document.querySelectorAll('back-btn');
const landingPage = document.getElementById('landing-page');
const modalOverlay = document.getElementById('modal-overlay');
const verificationPage = document.getElementById('verification-form');
const registrationSubmitBtn = document.getElementById('registration-submit-btn');
const verifyBtn = document.getElementById('verify-btn');
const loginSubmitBtn = document.getElementById('login-submit-btn');




//2. we introduce event listenenrs into the systen
loginBtn.addEventListener('click', () => {
    landingPage.style.display = 'none'; // this hides the splash main and makes the Login form visible
    loginForm.style.display = 'block';  // shows the login form
    modalOverlay.style.display = 'block'; // shows the modal overlay
})

registrationBtn.addEventListener('click', () => {
    landingPage.style.display = 'none'; // this hides the splash main and makes the Registration form visible
    registrationForm.style.display = 'block'; // shows the registration form
    modalOverlay.style.display = 'block'; // shows the modal overlay
})

backButtons.forEach(button => {
    button.addEventListener('click', () => {//this takes the user back to the landing page
        landingPage.style.display = 'block'; // this makes the landing page more visible
        loginForm.style.display = 'none'; // this makes the login form clear for the landing page to show
        registrationForm.style.display = 'none'; // this makes the registration form clear for the landing page to show
        modalOverlay.style.display = 'none'; // this makes the modal overlay clear for the landing page to show
    });
});

registrationSubmitBtn.addEventListener('click', e =>{
    e.preventDefault();
    registrationForm.style.display = 'none';
    verificationPage.style.display = 'block';
    modalOverlay.style.display = 'block';
})

loginSubmitBtn.addEventListener('click', e => {
    e.preventDefault();
    loginForm.style.display = 'none';
    verificationPage.style.display = 'block';
    modalOverlay.style.display = 'block';
})
verifyBtn.addEventListener('click',() => {
    //this is where we will introduce the logic for verifying the user's email
    windows.location.href = 'pages/dashboard.html';//if the code is correct we will redirect the user to the dashboard
    //if the code is incorrect we will display an error message
})
