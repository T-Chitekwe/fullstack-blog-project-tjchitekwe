const BlogPost = require("../models/BlogPost");

// 🔔 NEW: notification model added (SAFE ADDITION)
const Notification = require("../models/Notification");

// =========================
// GET ALL POSTS
// =========================
const getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// GET SINGLE POST
// =========================
const getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate("author", "username")
      .populate("comments.user", "username");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// CREATE POST
// =========================
const createPost = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;

    const imageUrl = req.file ? req.file.path : "";

    const post = new BlogPost({
      title,
      subtitle,
      content,
      imageUrl,
      author: req.user.id,
      likes: [],
      comments: [],
    });

    await post.save();

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// UPDATE POST
// =========================
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// DELETE POST
// =========================
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// LIKE / UNLIKE + NOTIFICATION
// =========================
const toggleLike = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const userId = req.user.id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);

      // 🔔 NOTIFICATION ADDED (SAFE)
      if (post.author.toString() !== userId) {
        await Notification.create({
          user: post.author,     // receiver
          sender: userId,        // who liked
          type: "like",
          post: post._id,
          message: "Someone liked your post",
        });
      }
    }

    await post.save();

    const updated = await BlogPost.findById(req.params.id)
      .populate("author", "username")
      .populate("comments.user", "username");

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// ADD COMMENT + NOTIFICATION
// =========================
const addComment = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    post.comments.push({
      user: req.user.id,
      text,
    });

    await post.save();

    // 🔔 NOTIFICATION ADDED (SAFE)
    if (post.author.toString() !== req.user.id) {
      await Notification.create({
        user: post.author,
        sender: req.user.id,
        type: "comment",
        post: post._id,
        message: "Someone commented on your post",
      });
    }

    const updated = await BlogPost.findById(req.params.id)
      .populate("author", "username")
      .populate("comments.user", "username");

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
};