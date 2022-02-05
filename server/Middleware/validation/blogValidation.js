const { check, param, query } = require("express-validator");
const {
  isEmailNotExist,
  isBlogExistForEmail,
  isBlogNotExistForID,
  isBlogExistForTitle,
  isBlogNotExistForTitle,
  isBlogNotExistForEmail,
} = require("../../helper/helper");

const blogValidation = [
  check("title")
    .exists()
    .withMessage("Please Enter Title of Blog")
    .custom((title) => isBlogExistForTitle(title))
    .withMessage("Blog Already Posted")
    .isLength({ min: 5 })
    .withMessage("Please Enter Title Easy to Understand"),

  check("desc")
    .exists()
    .withMessage("Please Add  Description")
    .isLength({ min: 10 })
    .withMessage("Please Add More Description About Blog"),
];

const blogValidationForEmail = [
  param("email")
    .isEmail()
    .withMessage("Invalid Email ID")
    .custom((email) => isBlogNotExistForEmail(email))
    .withMessage("Not Blog Exists with Such Author"),
];

const blogValidationForTitle = [
  param("title")
    .custom((title) => isBlogNotExistForTitle(title))
    .withMessage("Not Blog Exists with this Title"),
];

const blogValidationForID = [
  param("id")
    .isNumeric()
    .withMessage("Invalid Blog ID")
    .custom((id) => isBlogNotExistForID(id))
    .withMessage("Not Blog Exists with this Title"),
];

const paramValidationForTitle = [
  query("title")
    .custom((title) => isBlogNotExistForTitle(title))
    .withMessage("Not Blog Exists with this Title"),
];

module.exports = {
  blogValidation,
  blogValidationForEmail,
  blogValidationForTitle,
  paramValidationForTitle,
  blogValidationForID,
};
