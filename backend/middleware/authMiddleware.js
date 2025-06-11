const jwt = require("jsonwebtoken");

// Middleware to verify JWT from HTTP-only cookie
const verifyToken = (req, res, next) => {
  try {
    // Read token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request
    req.user = decoded;

    next(); // Allow request to proceed
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
