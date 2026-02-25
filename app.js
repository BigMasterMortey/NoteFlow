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
function handleNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            
            if (target === 'logout') {
                window.location.href = 'index.html';
                return;
            }

            // 1. Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // 2. Show the target section
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
const openEditor = (index = null) => {
    currentNoteIndex = index; //set the index to the note we want to edit or null if its a new note
    
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

//Function to go back to the list view 
const closedEditor = () => {
    editView.style.display = 'none'; //hide the editor view 
    listView.style.display = 'block'; //show the list view
    renderNotes(); //refresh the list to show the new/updated note
};

//EVENT LISTENERS

//when the pen icon is clicked: open the editor for a new note
document.getElementById('fab-pen').addEventListener('click', () => {
    openEditor();
});

//When the back arrow is clicked: close the editor and return to the list view
document.getElementById('editor-back-btn').addEventListener('click', () => {
    closedEditor();
});

//when the save button is clicked: save the note and return to the list view
document.getElementById('editor-save-btn').addEventListener('click', () => {
    const newNote = {
        title: titleInput.value, //gets the value of the title input
        content: contentInput.value //gets the value of the content input
    };   
    
    if (currentNoteIndex !== null) {
        //update existing note
        notes[currentNoteIndex] = newNote;
    } else {
        //add new note
        notes.push(newNote);
    }
    //save to local storage
    saveToLocalStorage(); //Saves the note to the local storage
    closedEditor(); //Closes the editor and returns to the list view
})

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
