//! Global variables
const inputField = document.getElementById("input_field");
const addButton = document.getElementById("add_button");
const clearButton = document.getElementById("clear_button");
const notesList = document.getElementById("notes_list");

/**
 * Show a toast notification with custom message and background color.
 * @param {string} message - The message to be displayed.
 * @param {string} color - The background color for the toast.
 */
const showToast = (message, color) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: color,
      borderRadius: "5px",
      font: "500 14px 'Inter', sans-serif",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
    },
  }).showToast();
};

/**
 * The `addNote` function adds a note to a list if the input field is not empty, and displays
 * corresponding alerts.
 */
const addNote = () => {
  if (inputField.value.trim().length === 0) {
    showToast("Empty string! Add your note!", "#FF9966");
  } else {
    //! We create a new note using createNoteElement with the text and state Unchecked.
    const note = createNoteElement(inputField.value, false);
    //! We add the new note to the list of notes.
    notesList.appendChild(note);
    //! We clean the input field, save the note, update its visibility and send an alert.
    inputField.value = "";
    saveNotes();
    updateNotesVisibility();
    showToast("Note added!", "#008000");
  }
};

/**
 * The `createNoteElement` function creates a note element with specified content and checked status,
 * and adds event listeners for deleting and toggling the note.
 * @param noteContent - The content of the note that will be displayed in the li element.
 * @param isChecked - The `isChecked` parameter is a boolean value that determines whether the note
 * element should be initially checked or unchecked. If `isChecked` is `true`, the note element will
 * have the class "checked" added to it, otherwise it will have the class "unchecked" added to it.
 * @returns The function `createNoteElement` returns a newly created `li` element with the specified
 * note content and checked status.
 */
const createNoteElement = (noteContent, isChecked) => {
  //! An element <li> is created
  const note = document.createElement("li");
  //! We add the class list-element and depending its state, checked or unchecked
  note.classList.add(isChecked ? "checked" : "unchecked", "list-element");
  note.style.cursor = "pointer";
  //! We create a text string from the specified input value.
  note.appendChild(document.createTextNode(noteContent));

  //! We create a <span> element and we insert an icon into it. Then we add a special id and we append it to each <li> element.
  const cross = document.createElement("span");
  cross.innerHTML =
    '<i class="fa-solid fa-x fa-sm" style="color: #46009d;"></i>';
  cross.setAttribute("id", "delete_button");
  note.appendChild(cross);

  /* Adds a click event listener to the `cross` element, which is a delete button for a note. When the delete button is clicked, the
  callback function is executed. It updates the visibility of <ul>, saves how many <li> are in the <ul> and shows an alert. */
  cross.addEventListener("click", () => {
    note.remove();
    updateNotesVisibility();
    saveNotes();
    showToast("Note deleted!", "#FF0000");
  });

  /* Adds a click event listener to each note element in the list. When a note is clicked, the
  callback function is executed and saves if the <li> is checked or unchecked in localStorage. */
  note.addEventListener("click", () => {
    note.classList.toggle("checked");
    note.classList.toggle("unchecked");
    saveNotes();
  });

  //! After this process, we return the full note.
  return note;
};

/**
 * The function `clearNote` clears the content of an input field and displays a toast message
 * indicating whether the content was cleared or if there was nothing to clear.
 */
const clearNote = () => {
  //! If there's no string to clear, an alert is sent.
  if (inputField.value.trim().length === 0) {
    showToast("Nothing to clear!", "#FF9966");
  } else {
    //! If there's a string, an alert is sent and <input> is cleared.
    inputField.value = "";
    showToast("Content cleared!", "#008000");
  }
};

/**
 * The function `saveNotes` saves the notes from a list into the browser's local storage.
 */
const saveNotes = () => {
  //! We initialize the array as empty.
  const notes = [];
  //! This will iterate along the notes.
  document.querySelectorAll("#notes_list li").forEach((note) => {
    //! This will ignore the delete icon when saving
    const text = note.textContent.replace(/×$/, "").trim();
    //! This verifies if the note is checked when saved.
    const isChecked = note.classList.contains("checked");
    //! Then the 2 variables are pushed into the array.
    notes.push({ text, isChecked });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

/**
 * The `loadNotes` function retrieves saved notes from local storage and creates note elements for each
 * saved note.
 */
const loadNotes = () => {
  //! The array is pared to be later on iterated.
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  //! Each note is appended into the noteList with its own text and checked state.
  savedNotes.forEach((noteObj) => {
    const note = createNoteElement(noteObj.text, noteObj.isChecked);
    notesList.appendChild(note);
  });
  updateNotesVisibility();
};

/**
 * The function updates the visibility of a list of notes based on whether there are any notes present
 * or not.
 */
const updateNotesVisibility = () => {
  notesList.style.display = notesList.children.length === 0 ? "none" : "flex";
};

//! Event listener that updates the <ul> visibility when the users get into the page and shows the notes saved in localStorage.
document.addEventListener("DOMContentLoaded", function () {
  loadNotes();
  updateNotesVisibility();
});
//! Event listener that makes the button add work.
addButton.addEventListener("click", addNote);
//! Event listener that listens for the "keyup" event, triggered when a key is released and adds a note if you hit enter.
inputField.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addNote();
  }
});
