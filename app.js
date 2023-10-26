//import the express framework
const express = require("express");
//storing the Express application in app variable
const app = express();
//allowws for cross origin resource sharing
const cors = require("cors");

//middlewear: allows access to req-res obj
app.use(cors());
app.use(express.json());

module.exports = app;