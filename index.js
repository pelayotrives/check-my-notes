//! Global variables
const inputField = document.getElementById("input_field");
const addButton = document.getElementById("add_button");
const clearButton = document.getElementById("clear_button");
const notesList = document.getElementById("notes_list");

/**
 * The `addNote` function adds a note to a list if the input field is not empty, and displays
 * corresponding alerts.
 */
const addNote = () => {
  if (inputField.value.length === 0) {
    //! If there's no string, an alert is sent.
    Toastify({
      text: "Empty string! Add your note!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#FF9966",
        borderRadius: "5px",
        font: "500 14px 'Inter', sans-serif",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      },
    }).showToast();
  } else {
    //! DOM manipulation. <li> is created, classes are added, value is appended.
    const note = document.createElement("li");
    note.classList.add("unchecked", "list-element");
    note.style.cursor = "pointer";
    const noteContent = document.createTextNode(inputField.value);
    note.appendChild(noteContent);
    //! DOM manipulation. <span> is created, innerHTML is appended, id is added.
    //! Then, the <span> is appended to the <li>.
    //! Then, the <li> is appended to the <ul>
    //! Then, the <input> is cleared.
    const cross = document.createElement("span");
    cross.innerHTML = '<i class="fa-solid fa-x fa-sm" style="color: #46009d;"></i>';
    cross.setAttribute("id", "delete_button");
    note.appendChild(cross);
    notesList.appendChild(note);
    inputField.value = "";
    updateNotesVisibility();

    //! If the string is created, an alert is sent.
    Toastify({
      text: "Note added!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#008000",
        borderRadius: "5px",
        font: "500 14px 'Inter', sans-serif",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      },
    }).showToast();

    cross.addEventListener("click", function () {
      //! DOM manipulation. <li> is removed.
      note.remove();
      updateNotesVisibility();
      //! If the string is deleted, an alert is sent.
      Toastify({
        text: "Note deleted!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
          borderRadius: "5px",
          font: "500 14px 'Inter', sans-serif",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        },
      }).showToast();
    });

    note.addEventListener("click", function () {
      //! If <li> is clicked and it is unchecked, it turns into checked.
      if (note.classList.contains("unchecked")) {
        note.classList.remove("unchecked");
        note.classList.add("checked");
        //! If <li> is clicked and it is checked, it turns into unchecked.
      } else {
        note.classList.remove("checked");
        note.classList.add("unchecked");
      }
    });
  }
};

/**
 * The function `clearNote` clears the content of an input field and displays a toast message
 * indicating whether the content was cleared or if there was nothing to clear.
 */
const clearNote = () => {
  //! If there's no string to clear, an alert is sent.
  if (inputField.value.length === 0) {
    Toastify({
      text: "Nothing to clear!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#FF9966",
        borderRadius: "5px",
        font: "500 14px 'Inter', sans-serif",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      },
    }).showToast();
    //! If there's a string, an alert is sent and <input> is cleared.
  } else {
    inputField.value = "";
    Toastify({
      text: "Content cleared!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#008000",
        borderRadius: "5px",
        font: "500 14px 'Inter', sans-serif",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      },
    }).showToast();
  }
};

/**
 * The function updates the visibility of a list of notes based on whether there are any notes present
 * or not.
 */
const updateNotesVisibility = () => {
  const notes = document.querySelectorAll("#notes_list li");
  if (notes.length === 0) {
    notesList.style.display = "none";
  } else {
    notesList.style.display = "flex";
  }
}

//! Event listener that makes the button add work.
//! Event listener that updates the <ul> visibility when the users get into the page.
document.addEventListener("DOMContentLoaded", function () {
  updateNotesVisibility();
});
addButton.addEventListener("click", addNote);
//! Event listener that listens for the "keyup" event, triggered when a key is released and adds a note if you hit enter.
inputField.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addNote();
  }
});

