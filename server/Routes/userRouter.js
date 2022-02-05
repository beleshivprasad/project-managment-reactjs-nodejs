const express = require("express");
const { registerUser, loginUser } = require("../Controller/userController");
const router = express.Router();

const {
  registerValidation,
  loginValidation,
} = require("../Middleware/validation/userValidation");

router.route("/register").post(registerValidation, registerUser);
router.route("/login").post(loginValidation, loginUser);

module.exports = router;
