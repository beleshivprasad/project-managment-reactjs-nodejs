const { check } = require("express-validator");
const {
  isEmailExist,
  isEmailNotExist,
  MatchPassword,
} = require("../../helper/helper");
const registerValidation = [
  check("fname")
    .exists()
    .withMessage("Please Enter First Name")
    .isLength({ min: 3 })
    .withMessage("Minimum Lenght should be 3 characters"),
  check("lname")
    .exists()
    .withMessage("Please Enter First Name")
    .isLength({ min: 3 })
    .withMessage("Minimum Lenght should be 3 characters"),
  check("email")
    .exists()
    .withMessage("Please Enter Email")
    .isEmail()
    .withMessage("Ivalid Email")
    .custom((email) => isEmailExist(email))
    .withMessage("Email Already Exists"),
  check("password")
    .exists()
    .withMessage("Please Enter Email")
    .isLength({ min: 8 })
    .withMessage("Minimum Lenght should be 8 characters")
    .custom((password, { req }) => MatchPassword(password, req)),
];

const loginValidation = [
  check("email")
    .exists()
    .withMessage("Please Enter Email")
    .isEmail()
    .withMessage("Ivalid Email")
    .custom((email) => isEmailNotExist(email))
    .withMessage("User does not Exists"),
  check("password").exists().withMessage("Please Enter Email"),
];
module.exports = { registerValidation, loginValidation };
