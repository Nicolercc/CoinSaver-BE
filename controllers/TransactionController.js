const express = require("express");
const router = express.Router();
let transactionsArray = require("../models/TransactionsData");
const { v4: uuidv4 } = require("uuid");

//get all (index)
router.get("/", (req, res, next) => {
  if (transactionsArray && transactionsArray.length > 0) {
    res.status(200).send(transactionsArray);
  } else {
    res.status(404).send({ message: "Transactions were not found." });
  }
});

//get one (show)
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

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
  const { item_name, amount, date, from } = req.body;

  if (!item_name || !amount || !date || !from) {
    res.status(400).json({
      status: false,
      message: "You cannot create an empty transaction",
    });
  } else {
    const newTransaction = {
      id: uuidv4(),
      item_name,
      amount,
      date,
      from,
    };
    transactionsArray.push(newTransaction);
    res.json({ status: true, data: newTransaction });
  }
});

//delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  let foundIndex = transactionsArray.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (foundIndex === -1) {
    res.status(404).json({ status: false, message: "Id not found" });
  } else {
    let foundTransaction = transactionsArray[foundIndex];
    let newTransactionArray = transactionsArray.filter(
      (item) => item.id !== parseInt(id)
    );

    transactionsArray = newTransactionArray;
    res.json({
      status: true,
      message: "success",
      data: foundTransaction,
    });
  }
});

//put
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const foundIndex = transactionsArray.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (foundIndex === -1) {
    res.status(404).json({ status: false, message: "ID does not exist" });
  } else {
    const updatedData = {
      id: uuidv4(),
      ...req.body,
    };
    transactionsArray.splice(foundIndex, 1, updatedData);
    res.json({
      message: "success",
      status: true,
      data: updatedData,
    });
  }
});

module.exports = router;
