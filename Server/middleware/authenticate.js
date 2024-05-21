const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const rootUser = await User.findOne({ _id: verifiedToken._id, "tokens.token": token });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    console.error("Error in authenticate middleware:", err);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticate;
