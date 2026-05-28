const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Malformed token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ✅ SAFE NORMALIZATION (prevents undefined bugs)
    req.user = {
      id: decoded.id || decoded.userId || decoded._id,
    };

    if (!req.user.id) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;