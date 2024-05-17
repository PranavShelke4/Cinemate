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
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !image || !content) {
      return res
        .status(422)
        .json({ error: "Please provide all required fields" });
    }

    try {
      const postId = generatePostId(); // Generate postId
      const post = new Post({
        postId, // Include postId in the post data
        username: req.rootUser.name,
        userId: req.rootUser._id,
        userImage: req.rootUser.profilePicture,
        image,
        title,
        content,
        likes: 0,
        comments: [],
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

// Get a single post with comments
router.get("/posts/:postId", async (req, res) => {
  console.log("postId:", req.params.postId);

  try {
    const post = await Post.findById(req.params.postId);
    console.log(post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

// Add a comment to a post
router.post("/posts/:postId/comments", authenticate, async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(422).json({ error: "Content is required" });
  }

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      username: req.rootUser.name,
      content,
    };

    post.comments.push(comment);
    await post.save();
    res.status(201).json({ message: "Comment added successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

// Function to generate unique postId
function generatePostId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

module.exports = router;
