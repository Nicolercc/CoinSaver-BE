//import the express framework
const express = require("express");
//storing the Express application in app variable
const app = express();
//allowws for cross origin resource sharing
const cors = require("cors");

const transactions = require("./controllers/TransactionController");

//middlewear: allows access to req-res obj
app.use(cors());
app.use(express.json());

app.use("/transactions", transactions);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
