const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const multerStorageCloudinary = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config (FIXED)
const storage = multerStorageCloudinary({
  cloudinary: cloudinary,
  params: {
    folder: "blog-posts",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer setup
const upload = multer({
  storage,
});

module.exports = upload;