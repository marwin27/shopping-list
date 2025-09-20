require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { authenticateToken } = require("./middleware/auth");
const JWT_secret = "secret";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3005;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const ExistingUser = await User.findOne({ email });

    if (ExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ user_id: user._id, email }, JWT_secret, {
      expiresIn: "2h",
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.put("/forget-password", async (req, res) => {
  return res.status(200).json({ message: "Profile updated successfully" });
});

app.put("/update-profile", async (req, res) => {
  return res.status(200).json({ message: "Profile updated successfully" });
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
