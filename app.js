const express = require("express");
const app = express();
const cors = require("cors");
const transactions = require("./controllers/TransactionController");

app.use(cors());
app.use(express.json());

app.use("/transactions", transactions);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
