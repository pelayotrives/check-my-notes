//! -----> Requirements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//! -----> Schema
// Each element of the schema (as an object).
const NotesSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
  },
});

//! -----> Export
const Notes = mongoose.model("Notes", NotesSchema);
module.exports = Notes;
