const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "insights-blog",

    // ✅ FIX: required for modern cloudinary compatibility
    resource_type: "image",

    // keep formats safe
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});

const upload = multer({
  storage
});

module.exports = upload;