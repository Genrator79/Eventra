const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // fix spelling here
  console.log('Auth Header:', authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
    });
  }

  try {
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Decoded Token:', decodeTokenInfo);
    req.userInfo = decodeTokenInfo;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "No token provided, access denied"
    });
  }
};

module.exports = authMiddleware;
