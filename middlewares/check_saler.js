const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (req.userData.isSaler) {
      next();
    } else {
      return res.status(403).json({
        message: "Auth Failed"
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: "Auth Failed"
    });
  }
};
