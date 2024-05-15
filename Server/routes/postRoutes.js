// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const Post = require("../models/Post");
const authenticate = require("../middleware/authenticate");

const UPLOADS_DIR = "uploads";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    const { title } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !image) {
      return res
        .status(422)
        .json({ error: "Please provide all required fields" });
    }

    try {
      const post = new Post({
        username: req.rootUser.name,
        userId: req.rootUser._id,
        userImage: req.rootUser.profilePicture,
        image,
        title,
      });

      await post.save();
      res.status(201).json({ message: "Post uploaded successfully", post });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/user-posts", authenticate, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.rootUser._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all posts with pagination
router.get("/posts", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Post.countDocuments();
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
