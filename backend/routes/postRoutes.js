const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// =========================
// POSTS
// =========================
router.get("/", getPosts);
router.get("/:id", getPostById);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);

router.put("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePost);

// =========================
// ❤️ LIKE
// =========================
router.put("/:id/like", authMiddleware, toggleLike);

// =========================
// 💬 COMMENT
// =========================
router.post(
  "/:id/comment",
  authMiddleware,
  addComment
);

module.exports = router;