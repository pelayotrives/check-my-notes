//! -----> Installation
//? Command ---> npm init -y (To install node on our repository).
//? Command ---> npm i express (To install express on our repository).
//? Command ---> npm i nodemon -D (To install nodemon as a development dependency on our repository).
//? Command ---> npm i mongoose (To connect our app to MongoDB Atlas).
//? Command ---> npm i dotenv (To make our private keys invisible).
//? Command ---> npm i axios (To request information).
//? Command ---> npm i cors (To enable CORS).
//? Command ---> npm i -g concurrently (To run multiple scripts at the same time. Syntax is: concurrently "script1" "script2" ... "script...n").
//? Command ---> npm i opener (To open localhost easily and test our content).
//? Command ---> "scripts": { "start": "nodemon src/index.js" } (To enable npm run start).
//? Command ---> "scripts": { "test": "opener http://localhost:9000" } (To test our app. It is mandatory to run it on a different terminal).
//? Command ---> npm run start (To execute our main file).

//! -----> Requirements
// First, we require express, mongoose... and destructure console.log().
const { log } = console;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// We assign the variable "express" to "app". We require our app to use express.json and cors.
const app = express();
app.use(cors());
app.use(express.json());

// This will make our app to listen to a port on a hosting service or port 9000 on a local environment.
const port = process.env.PORT || 9000;

//! -----> MongoDB
// MongoDB connection method to MongoDB Compass (with Mongo Atlas is the same but changing .env value).
const mongoCompassConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_COMPASS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log("Connected to MongoDB successfully!");
  } catch (error) {
    mongoose.disconnect();
    log("Error connecting to MongoDB: ", error);
    throw error;
  }
};

// Now we invoke the function to connect.¡
mongoCompassConnect();

// We require our Notes model.
const Notes = require("../models/Notes.model");

//! -----> Routes
// 1. -----> Testing route.
app.get("/", (req, res) => {
  res.send("NodeJS working!");
});

// 2. -----> Create our database route.
app.get("/notes", async (req, res) => {
  const notes = await Notes.find();
  res.json(notes);
});

// 3. -----> Create new notes.
app.post("/notes/new", async (req, res) => {
  //* Destructure the main field.
  const { text } = req.body;
  //* Create new Notes object.
  const notes = new Notes({
    text,
  });

  //* Save the result.
  notes.save();
  res.json(notes);
});

// 4. -----> Delete notes.
app.delete("/notes/delete/:id", async (req, res) => {
  //* Destructure the main field.
  const { id } = req.params;
  const notes = await Notes.findByIdAndDelete(id);

  res.json(notes);
});

//! -----> Port listening
// We make app to listen to the port.
app.listen(port, () => log(`Server is listening on port ${port}!`));
