const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userSchema");
const authenticate = require("../middleware/authenticate");

dotenv.config({ path: "./config.env" });

router.get("/", (req, res) => {
  res.send("This is Home page by router");
});

// Register API
router.post("/signup", async (req, res) => {
  const { name, email, number, gender, dob, password, cpassword } = req.body;

  if (!name || !email || !number || !gender || !dob || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
      const user = new User({ name, email, number, gender, dob, password, cpassword });

      await user.save();

      res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Login API
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const userLogin = await User.findOne({ email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      } else {
        // JWT token generation
        const token = await userLogin.generateAuthToken();
        console.log("Generated Token:", token);

        // Store token in cookies
        res.cookie("jwtToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // ensure secure cookies in production
        });

        res.json({ message: "User signed in successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Fetch User Profile Information
router.get("/profile", authenticate, (req, res) => {
  if (!req.rootUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({
    name: req.rootUser.name,
    email: req.rootUser.email,
    posts: req.rootUser.posts.length,
    followers: req.rootUser.followers,
    following: req.rootUser.following,
  });
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwtToken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
