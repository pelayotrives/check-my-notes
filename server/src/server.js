//! -----> Installation
//? Command ---> npm init -y (To install node on our repository).
//? Command ---> npm i express (To install express on our repository).
//? Command ---> npm i nodemon -D (To install nodemon as a development dependency on our repository).
//? Command ---> npm i mongoose (To connect our app to MongoDB Atlas).
//? Command ---> npm i dotenv (To make our private keys invisible).
//? Command ---> npm i axios (To request information).
//? Command ---> npm i cors (To enable CORS).
//? Command ---> npm i morgan (To make HTTP requests).
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
// Last const will make our app to listen to a port on a hosting service or port 9000 on a local environment.
const app = express();
app.use(express.json);
app.use(cors());
const port = process.env.PORT || 9000;

//! -----> MongoDB
// MongoDB connection method to MongoDB Atlas.
// const mongoAtlasConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_ATLAS_URI);
//     log("Connected to MongoDB successfully!");
//   } catch (error) {
//     log("Error connecting to MongoDB: ", error);
//     throw error;
//   }
// };

// MongoDB connection method to MongoDB Compass.
const mongoCompassConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_COMPASS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    log("Connected to MongoDB successfully!");
  } catch (error) {
    log("Error connecting to MongoDB: ", error);
    throw error;
  }
};

// Now we invoke the function to connect.
// mongoAtlasConnect();
mongoCompassConnect();

//! -----> Routes
app.get("/", (req, res) => {
  res.send("Test.");
});

//! -----> Port listening
// We make app to listen to the port.
app.listen(process.env.PORT, () =>
  log("Server is listening on port", `${process.env.PORT}`)
);
