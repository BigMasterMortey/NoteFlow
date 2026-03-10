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
const searchInput = document.getElementById('note-search'); // EDITED
const filterBtn = document.getElementById('filter-btn'); // EDITED
const lockBtn = document.getElementById('editor-lock-btn'); // EDITED
const starBtn = document.getElementById('editor-star-btn'); // EDITED
const tasksList = document.getElementById('tasks-list'); // EDITED
const addTaskBtn = document.getElementById('add-task-btn'); // EDITED
const toolbar = document.getElementById('text-toolbar'); // EDITED
const saveTick = document.getElementById('editor-save-btn'); // EDITED
const backBtn = document.getElementById('editor-back-btn'); // EDITED
const darkModeToggle = document.getElementById('dark-mode-toggle'); // EDITED
const compactViewToggle = document.getElementById('compact-view-toggle'); // EDITED
const clearDataBtn = document.getElementById('clear-data-btn'); // EDITED
let notes = [];
let tasks = JSON.parse(localStorage.getItem('noteflow_tasks')) || []; // EDITED

// Task Management Logic /EDITED
function renderTasks() {
    if (!tasksList) return;
    tasksList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <div class="task-checkbox" onclick="toggleTask(${index})">
                ${task.completed ? '✓' : ''}
            </div>
            <span>${task.text}</span>
            <button class="delete-note-btn" onclick="deleteTask(${index})" style="margin-left: auto;">×</button>
        `;
        tasksList.appendChild(taskItem);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('noteflow_tasks', JSON.stringify(tasks));
}



// Settings Logic /EDITED
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
        localStorage.setItem('noteflow_dark_mode', darkModeToggle.checked);
    });
}

if (compactViewToggle) {
    compactViewToggle.addEventListener('change', () => {
        document.body.classList.toggle('compact-view', compactViewToggle.checked);
        localStorage.setItem('noteflow_compact_view', compactViewToggle.checked);
    });
}

if (clearDataBtn) {
    clearDataBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete ALL notes and tasks? This cannot be undone.')) {
            localStorage.removeItem('notes');
            localStorage.removeItem('noteflow_tasks');
            notes = [];
            tasks = [];
            renderNotes();
            renderTasks();
            alert('All data has been cleared.');
        }
    });
}

// Function to load settings on startup /EDITED
function loadSettings() {
    const isDarkMode = localStorage.getItem('noteflow_dark_mode') === 'true';
    if (darkModeToggle) darkModeToggle.checked = isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);

    const isCompactView = localStorage.getItem('noteflow_compact_view') === 'true';
    if (compactViewToggle) compactViewToggle.checked = isCompactView;
    document.body.classList.toggle('compact-view', isCompactView);
}

// Search Logic /EDITED
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        renderNotes(query);
    });
}

// Filter Logic /EDITED
let filterMode = 'date'; // 'date' or 'starred'
if (filterBtn) {
    filterBtn.addEventListener('click', () => {
        filterMode = filterMode === 'date' ? 'starred' : 'date';
        alert(`Sorting by: ${filterMode === 'date' ? 'Date' : 'Importance (Starred)'}`);
        renderNotes(searchInput ? searchInput.value.toLowerCase() : '');
    });
}

// Rich Text Formatting /EDITED
function formatText(command, value = null) {
    document.execCommand(command, false, value);
    contentInput.focus();
}

// Floating Toolbar Logic /EDITED
if (contentInput) {
    document.addEventListener('selectionchange', () => {
        const selection = window.getSelection();
        if (selection.toString().length > 0 && document.activeElement === contentInput) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            toolbar.style.display = 'flex';
            toolbar.style.top = `${rect.top - 40 + window.scrollY}px`;
            toolbar.style.left = `${rect.left + window.scrollX}px`;
        } else {
            toolbar.style.display = 'none';
        }
    });
}

// Note Star Logic /EDITED
let isStarred = false;
if (starBtn) {
    starBtn.addEventListener('click', () => {
        isStarred = !isStarred;
        starBtn.classList.toggle('active', isStarred);
    });
}

// Note Locking Logic /EDITED
let currentNotePin = null;
if (lockBtn) {
    lockBtn.addEventListener('click', () => {
        const pin = prompt('Enter 4-digit PIN to lock/unlock:');
        if (pin && pin.length === 4) {
            currentNotePin = pin;
            alert('Note PIN set! Save to apply.');
        } else {
            alert('Invalid PIN. Must be 4 digits.');
        }
    });
}

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
    verifyBtn.addEventListener('click',(e) => { // EDITED
        e.preventDefault(); // EDITED
        const codeInput = document.getElementById('verify-code'); // EDITED
        if (codeInput && codeInput.value === '1234') { // EDITED: Basic validation logic
            window.location.href = 'pages/dashboard.html';
        } else {
            alert('Incorrect verification code! Hint: Try 1234'); // EDITED: Added feedback
        }
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
        loadSettings(); // EDITED: Load user settings
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

            // Render specific content based on tab /EDITED
            if (target === 'tasks') renderTasks();

            // Show/hide FAB based on the active section /EDITED
            if (target === 'notes' || target === 'tasks') {
                fabPen.style.display = 'flex';
            } else {
                fabPen.style.display = 'none';
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
    currentNotePin = null; // Reset PIN for current session
    isStarred = false; // EDITED
    if (starBtn) starBtn.classList.remove('active'); // EDITED
    
    if (index !== null) {
        const note = notes[index];
        // If note is locked, ask for PIN /EDITED
        if (note.pin) {
            const pin = prompt('This note is locked. Enter 4-digit PIN:');
            if (pin !== note.pin) {
                alert('Incorrect PIN!');
                closedEditor();
                return;
            }
        }
        //if editing existing: fill inputs with saved data
        titleInput.value = note.title;
        contentInput.innerHTML = note.content; // EDITED: Use innerHTML for rich text
        isStarred = !!note.starred; // EDITED
        if (starBtn) starBtn.classList.toggle('active', isStarred); // EDITED
    } else {
        //if new note: clear the inputs
        titleInput.value = '';
        contentInput.innerHTML = ''; // EDITED: Use innerHTML for rich text
    }

    listView.classList.add('view-hidden'); // EDITED: Use class for smooth transition
    editView.classList.remove('view-hidden'); // EDITED: Use class for smooth transition
};

//Function to close the writing page and return to the list view /EDITED
const closedEditor = () => { // EDITED
    // bring the sidebar and Logo back /EDITED
    document.body.classList.remove('focus-mode'); // EDITED

    editView.classList.add('view-hidden'); // EDITED: Use class for smooth transition
    listView.classList.remove('view-hidden'); // EDITED: Use class for smooth transition
    renderNotes(); //refresh the list to show the new/updated note
};

//EVENT LISTENERS

//when the pen icon is clicked: open the editor for a new note
const fabPen = document.getElementById('fab-pen'); // EDITED
if (fabPen) { // EDITED
    fabPen.addEventListener('click', () => {
        const notesSection = document.getElementById('notes');
        const isNotesActive = notesSection.style.display === 'block';
        const isEditing = !editView.classList.contains('view-hidden');

        if (isNotesActive && !isEditing) {
            openEditor();
        } else if (isNotesActive && isEditing) {
            // Already editing, maybe do nothing or save?
        } else {
            const text = prompt('Enter task description:');
            if (text) {
                tasks.push({ text, completed: false });
                saveTasks();
                renderTasks();
            }
        }
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
            content: contentInput.innerHTML, // EDITED: Use innerHTML for rich text
            pin: currentNotePin || (currentNoteIndex !== null ? notes[currentNoteIndex].pin : null), // EDITED: Keep or update PIN
            starred: isStarred, // EDITED: Store importance
            date: new Date().toISOString() // EDITED: Store date for filtering
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
function renderNotes(query = '') { // EDITED: Added query parameter
    const notesList = document.getElementById('notes-list');
    if (!notesList) return; // EDITED: Safety check

    notesList.innerHTML = ''; 

    // Filter notes based on search query /EDITED
    let filteredNotes = notes.filter(note => 
        (note.title && note.title.toLowerCase().includes(query)) || 
        (note.content && note.content.toLowerCase().includes(query))
    );

    // Apply sorting based on filter mode /EDITED
    if (filterMode === 'starred') {
        filteredNotes.sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));
    } else {
        filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (filteredNotes.length === 0) { // EDITED
        notesList.innerHTML = '<p>No matching notes found</p>'; // EDITED
        return;
    }

    filteredNotes.forEach((note, index) => { // EDITED
        const originalIndex = notes.indexOf(note); // Get real index for editing /EDITED
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <div class="note-content-wrapper" onclick="openEditor(${originalIndex})"> <!-- EDITED -->
                <h3>${note.starred ? '⭐ ' : ''}${note.pin ? '🔒 ' : ''}${note.title || 'Untitled'}</h3> <!-- EDITED: Show star and lock icon -->
                <p>${note.content.replace(/<[^>]*>/g, '').substring(0, 30)}...</p> <!-- EDITED: Strip HTML for preview -->
            </div>
            <button class="delete-note-btn" onclick="deleteNote(${originalIndex})">×</button> <!-- EDITED -->
        `;
        notesList.appendChild(noteItem);
    });
}

// Function to delete a note /EDITED
function deleteNote(index) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1);
        saveToLocalStorage();
        renderNotes();
    }
}
