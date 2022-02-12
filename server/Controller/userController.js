const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { logger } = require("../Middleware/Logger/logger");
const { register, login } = require("../Services/userServices");

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    logger.error(`${await JSON.stringify(errors.errors)}`);
    res.json({ errors: errors.errors, userData: {} });
  } else {
    register(req, res);
  }
});

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    logger.error(`${await JSON.stringify(errors.errors)}`);
    res.json({ errors: errors.errors, userData: {} });
  } else {
    login(req, res);
  }
};

module.exports = { registerUser, loginUser };
