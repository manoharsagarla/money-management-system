const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
// Test route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/login", (req, res) => {
  res.json({ message: "Login successful from backend" });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});
app.post("/add", async (req, res) => {
  const { type, amount, description } = req.body;

  const newTransaction = new Transaction({
    type,
    amount,
    description
  });

  await newTransaction.save();

  res.json({ message: "Transaction saved" });
});
app.get("/transactions", async (req, res) => {
  try {
    const data = await Transaction.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});