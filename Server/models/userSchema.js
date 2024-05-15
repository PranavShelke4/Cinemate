const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
  },
  number: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  tokans: [
    {
      tokan: {
        type: String,
        required: true,
      },
    },
  ],
});

//Password Hashing

userSchema.pre("save", async function (next) {
  console.log("Hii Pranav");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// Toakan generating

userSchema.methods.generateAuthToken = async function () {
  try {
    let tokan = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokans = this.tokans.concat({ tokan: tokan });
    await this.save();
    return tokan;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
