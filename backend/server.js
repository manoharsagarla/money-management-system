const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/moneyDB")
.then(() => console.log("MongoDB Connected"))
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