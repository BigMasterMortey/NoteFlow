//1. we grab the buttons from the DOM
const loginBtn = document.getElementById('login-btn');
const registrationBtn = document.getElementById('register-btn');
const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('register-form');
const backButtons = document.querySelectorAll('back-btn');
const landingPage = document.getElementById('landing-page');
const modalOverlay = document.getElementById('modal-overlay');




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

modalOverlay.addEventListener('click', goBack);