//1. we grab the buttons/container from the DOM
const loginBtn = document.getElementById('login-btn');
const registrationBtn = document.getElementById('register-btn');
const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('register-form');
const backButtons = document.querySelectorAll('.back-btn');
const landingPage = document.getElementById('landing-page');
const modalOverlay = document.getElementById('modal-overlay');
const verificationPage = document.getElementById('verification-form');
const registrationSubmitBtn = document.getElementById('registration-submit-btn');
const verifyBtn = document.getElementById('verify-btn');
const loginSubmitBtn = document.getElementById('login-submit-btn');
const navButtons = document.querySelectorAll('.nav-btn')
const sections = document.querySelectorAll('main section')
const listView = document.getElementById('notes-list-view')
const editView = document.getElementById('notes-editor-view')
const titleInput = document.getElementById('note-title-input')
const contentInput = document.getElementById('note-content-input')
const saveTick = document.getElementById('editor-save-btn'); // EDITED
const backBtn = document.getElementById('editor-back-btn'); // EDITED
 let notes = [];



//2. we introduce event listenenrs into the systen
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        landingPage.style.display = 'none'; // this hides the splash main and makes the Login form visible
        loginForm.style.display = 'block';  // shows the login form
        modalOverlay.style.display = 'block'; // shows the modal overlay
    })
}

if (registrationBtn) {
    registrationBtn.addEventListener('click', () => {
        landingPage.style.display = 'none'; // this hides the splash main and makes the Registration form visible
        registrationForm.style.display = 'block'; // shows the registration form
        modalOverlay.style.display = 'block'; // shows the modal overlay
    })
}

if (backButtons) {
    backButtons.forEach(button => {
        button.addEventListener('click', () => {//this takes the user back to the landing page
            landingPage.style.display = 'block'; // this makes the landing page more visible
            loginForm.style.display = 'none'; // this makes the login form clear for the landing page to show
            registrationForm.style.display = 'none'; // this makes the registration form clear for the landing page to show
            modalOverlay.style.display = 'none'; // this makes the modal overlay clear for the landing page to show
        });
    });
}

if (registrationSubmitBtn) {
    registrationSubmitBtn.addEventListener('click', e =>{
        e.preventDefault();
        registrationForm.style.display = 'none';
        verificationPage.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', e => {
        e.preventDefault();
        loginForm.style.display = 'none';
        verificationPage.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

if (verifyBtn) {
    verifyBtn.addEventListener('click',() => {
        //this is where we will introduce the logic for verifying the user's email
        window.location.href = 'pages/dashboard.html';//if the code is correct we will redirect the user to the dashboard
        //if the code is incorrect we will display an error message
    });
}

//this is the intialisation logic for the dashboard//

//defines what happens as soon as the window finishes loading
window.onload = () => {
    const notesSection = document.getElementById('notes');
    if (notesSection) {
        // LOAD SAVED DATA HERE
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            notes = JSON.parse(savedNotes);
        }
        
        notesSection.style.display = 'block';
        handleNavigation();
        renderNotes(); // Show the notes immediately!
    }
};



//this is the function that handles the navigation between the different sections of the dashboard
function handleNavigation() { // EDITED
    navButtons.forEach(button => { // Loop through all sidebar buttons /EDITED
        button.addEventListener('click', () => { // when one is clicked ... /EDITED
            // 1. clear all active states /EDITED
            navButtons.forEach(btn => btn.classList.remove('active')); // EDITED
            // 2. add active state to clicked button /EDITED
            button.classList.add('active'); // EDITED
            
            const target = button.getAttribute('data-target'); // get the target section id /EDITED
            
            if (target === 'logout') {
                window.location.href = 'index.html';
                return;
            }

            // 3. Hide all sections /EDITED
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // 4. Show the target section /EDITED
            const activeSection = document.getElementById(target);
            if (activeSection) {
                activeSection.style.display = 'block';
            }
        });
    });
}


//STATE MANAGEMENT FOR NOTES
let currentNoteIndex = null; //this will track/store which note is currently being edited(null means its a new note)

//VIEW TOOLING
/* --- THE FOCUS MODE LOGIC (FOR WRITING) --- */ // EDITED
const openEditor = (index = null) => { // EDITED
    // add the focus-mode class to the body /EDITED
    document.body.classList.add('focus-mode'); // EDITED

    currentNoteIndex = index; // Store if we are editing an old note or new /EDITED
    
    if (index !== null) {
        //if editing existing: fill inputs with saved data
        titleInput.value = notes[index].title;
        contentInput.value = notes[index].content;
    } else {
        //if new note: clear the inputs
        titleInput.value = '';
        contentInput.value = '';
    }

    listView.style.display = 'none'; //hide the list view
    editView.style.display = 'block'; //show the editor view
};

//Function to close the writing page and return to the list view /EDITED
const closedEditor = () => { // EDITED
    // bring the sidebar and Logo back /EDITED
    document.body.classList.remove('focus-mode'); // EDITED

    editView.style.display = 'none'; //hide the editor view 
    listView.style.display = 'block'; //show the list view
    renderNotes(); //refresh the list to show the new/updated note
};

//EVENT LISTENERS

//when the pen icon is clicked: open the editor for a new note
const fabPen = document.getElementById('fab-pen'); // EDITED
if (fabPen) { // EDITED
    fabPen.addEventListener('click', () => {
        openEditor();
    });
}

//When the back arrow is clicked: close the editor and return to the list view
if (backBtn) { // EDITED
    backBtn.addEventListener('click', () => {
        closedEditor();
    });
}

//when the save button is clicked: save the note and return to the list view
if (saveTick) { // EDITED
    saveTick.addEventListener('click', () => {
        const newNote = {
            title: titleInput.value, //gets the value of the title input
            content: contentInput.value //gets the value of the content input
        };   
        
        if (currentNoteIndex !== null) {
            //update existing note
            notes[currentNoteIndex] = newNote; // EDITED
        } else {
            //add new note to the top /EDITED
            notes.unshift(newNote); // EDITED
        }
        //save to local storage
        saveToLocalStorage(); //Saves the note to the local storage
        closedEditor(); //Closes the editor and returns to the list view
    });
}

// This saves the data to the browser
function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// This draws the notes on the screen
function renderNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; 

    if (notes.length === 0) {
        notesList.innerHTML = '<p>Your saved notes will appear here</p>';
        return;
    }

    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <h3>${note.title || 'Untitled'}</h3>
            <p>${note.content.substring(0, 30)}...</p>
        `;
        noteItem.onclick = () => openEditor(index); // This makes them clickable!
        notesList.appendChild(noteItem);
    });
}
