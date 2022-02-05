// const User = require("../Models/userModel");
const models = require("../models");
const User = models.User;
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { logger } = require("../Middleware/Logger/logger");

const Authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //getting id from token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findAll({
        where: { email: decoded.email },
        attributes: ["fname", "lname", "email"],
      });
      next();
    } catch (error) {
      logger.error(`Authentication Error: ${error}`);
      res.status(401);
      throw new Error(error);
    }
  }
  if (!token) {
    res.status(401);
    logger.error(`Authentication Error: Not Authorized , No token : ${error}`);
    throw new Error("Not Authorized , No token");
  }
});

module.exports = Authenticate;
