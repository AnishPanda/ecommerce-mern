const ErrorHandler = require("../utils/errorHandler");
const cachAsyncError = require("./cachAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = cachAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resources", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodeData.id) {
    return new ErrorHandler("Login again to access the page");
  }

  req.user = await User.findById(decodeData.id);

  next();
});

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to acess this resource`,
          403
        )
      );
    }
    next();
  };
};
module.exports = { isAuthenticatedUser, authorizeRole };
