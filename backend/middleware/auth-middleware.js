const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token format.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!decodedToken.userId) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token.",
      });
    }

    req.userInfo = decodedToken;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token expired.",
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Access denied. Authentication failed.",
    });
  }
};

module.exports = authMiddleware;
