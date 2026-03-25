const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: String,        // Income or Expense
  amount: Number,
  description: String
});

module.exports = mongoose.model("Transaction", transactionSchema);