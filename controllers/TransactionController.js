const express = require("express");
const router = express.Router();
const transactionsArray = require("../models/TransactionsData");

//get all (index)
router.get("/", (req, res, next) => {
  //error handling technique
  if (transactionsArray && transactionsArray.length > 0) {
    res.status(200).send(transactionsArray);
  } else {
    res.status(404).send({ message: "Transactions were not found." });
  }
});

//get one (show)
router.get("/:id", (req, res, next) => {
  const { id } = req.params.id;
  //find the id
  const transaction = transactionsArray.find(
    (item) => item.id === parseInt(id)
  );
  if (transaction) {
    res.status(200).send(transaction);
  } else {
    res.status(404).send({ message: "Could not find transaction" });
  }
});

//post (Create)
router.post("/", (req, res) => {
  const transactionBody = req.body;
  if (transactionBody) {
    transactionsArray.push(transactionBody);
    res.status(201).send(transactionBody);
  } else {
    res
      .status(404)
      .send({ message: "Transaction was not created! Try again." });
  }
});

module.exports = router;
