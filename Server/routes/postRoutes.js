const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
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
      const postId = generatePostId(); // Generate postId
      const post = new Post({
        postId, // Include postId in the post data
        username: req.rootUser.name,
        userId: req.rootUser._id,
        userImage: req.rootUser.profilePicture,
        image,
        title,
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
router.get("/posts/:postId", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post, userId: req.rootUser._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  }
});

// Like a post
router.post("/posts/:postId/like", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(req.rootUser._id)) {
      post.likes.push(req.rootUser._id);
      await post.save();
      return res.status(200).json({ message: "Post liked", post });
    } else {
      return res.status(400).json({ message: "Post already liked" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unlike a post
router.post("/posts/:postId/unlike", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const index = post.likes.indexOf(req.rootUser._id);
    if (index > -1) {
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({ message: "Post unliked", post });
    } else {
      return res.status(400).json({ message: "Post not liked" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a post and its image
router.delete("/posts/:postId", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the image file
    const imagePath = path.join(__dirname, "..", post.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Function to generate unique postId
function generatePostId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

module.exports = router;
