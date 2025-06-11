const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token is about to expire (within 1 hour)
    const tokenExp = decoded.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (tokenExp - now < oneHour) {
      // Token is about to expire, set header to notify client
      res.set('X-Token-Expiring', 'true');
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Token expired",
        code: "TOKEN_EXPIRED"
      });
    }
    return res.status(401).json({
      message: "Invalid token",
      code: "TOKEN_INVALID"
    });
  }
};

module.exports = verifyToken;
