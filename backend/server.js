const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const ExistingUser = await User.findOne({ email });

    if (ExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

const start = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/");
    console.log("Connected to MongoDB");

    app.listen(3005, () => {
      console.log("Server started on port 3005");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
