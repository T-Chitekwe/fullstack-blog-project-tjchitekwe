const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const multerStorageCloudinary = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config
const storage = multerStorageCloudinary({
  cloudinary: cloudinary,
  folder: "blog-posts",
  allowedFormats: ["jpg", "jpeg", "png"],
});

// Multer setup
const upload = multer({
  storage,
});

module.exports = upload;