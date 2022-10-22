//? Command ---> npm init -y (to install node on our repository).
//? Command ---> npm i express (to install express on our repository).
//? Command ---> npm i nodemon -D (to install nodemon as a development dependency on our repository).
//? Command ---> npm i mongoose (to connect our app to MongoDB Atlas).
//? Command ---> npm i dotenv (to make our private keys invisible).
//? Command ---> "scripts": { "start": "nodemon src/index.js"} (to enable npm run start).
//? Command ---> npm run start (to execute our main file).

// First, we require express, mongoose, our dotenv file and destructure console.log().
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { log } = console;

// We assign the variable "express" to "app" and the port to "port".
const app = express();
// This would make our app to listen to a port on a hosting service or port 9000 on a local environment.
const port = process.env.PORT || 9000;

// MongoDB connection method.
mongoose.connect()

// We make app to listen to the port.
app.listen(9000, () => log("Server is listening on port", port));
