const express = require("express");
const router = express.Router();
const transactionsArray = require("../models/TransactionsData");
const { v4: uuidv4 } = require("uuid");

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
// router.post("/", (req, res) => {
//   const transactionBody = req.body;
//   if (transactionBody) {
//     transactionsArray.push(transactionBody);
//     res.status(201).send(transactionBody);
//   } else {
//     res
//       .status(404)
//       .send({ message: "Transaction was not created! Try again." });
//   }
// });
// what is the difference why is it not working?
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

//put update
router.delete("/:index ", (req, res) => {
  const { index } = req.params;
  console.log("extracted index:", index);
  const transaction = transactionsArray.find(
    (item) => item.id === parseInt(id)
  );
  const deletedTransaction = transactionsArray.splice(index, 1);
});

module.exports = router;
