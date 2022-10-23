//! -----> Installation
//? Command ---> npm init -y (To install node on our repository).
//? Command ---> npm i express (To install express on our repository).
//? Command ---> npm i nodemon -D (To install nodemon as a development dependency on our repository).
//? Command ---> npm i mongoose (To connect our app to MongoDB Atlas).
//? Command ---> npm i dotenv (To make our private keys invisible).
//? Command ---> npm i opener (To open lcoalhost easily and test our content).
//? Command ---> "scripts": { "start": "nodemon src/index.js" } (To enable npm run start).
//? Command ---> "scripts": { "test": "opener http://localhost:9000" } (To test our app. It is mandatory to run it on a different terminal).
//? Command ---> npm run start (To execute our main file).

//! -----> Requirements
// First, we require express, mongoose, our dotenv file and destructure console.log().
// We assign the variable "express" to "app" and the port to "port".
// Last const will make our app to listen to a port on a hosting service or port 9000 on a local environment.
const { log } = console;
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

//! -----> MongoDB
// MongoDB connection method.
const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    log("Connected to MongoDB successfully!");
  } catch (error) {
    log("Error connecting to MongoDB: ", error);
    throw error;
  }
};
// Now we invoke the function to connect.
mongoDBConnect();

//! -----> Routes
app.get("/", (req, res) => {
    res.send("Test.");
})

//! -----> Port listening
// We make app to listen to the port.
app.listen(9000, () => log("Server is listening on port", port));
