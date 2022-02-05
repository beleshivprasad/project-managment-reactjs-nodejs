const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { logger } = require("../Middleware/Logger/logger");
const { register, login } = require("../Services/userServices");

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    logger.error(`${await JSON.stringify(errors.errors)}`);
    res.status(400).json(errors);
  } else {
    register(req, res);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    logger.error(`${await JSON.stringify(errors.errors)}`);
    res.status(400).json(errors);
  } else {
    login(req, res);
  }
});

module.exports = { registerUser, loginUser };
