const express = require("express");
const {
  viewBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  getMyprofile,
} = require("../Controller/dashboardController");
const router = express.Router();

const {
  blogValidation,
  blogValidationForEmail,
  blogValidationForTitle,
  paramValidationForTitle,
  blogValidationForID,
} = require("../Middleware/validation/blogValidation");

const Authenticate = require("../Auth/Auth");

router.route("/blog").get(Authenticate, viewBlog);
router.route("/blog/add").post(Authenticate, blogValidation, createBlog);
router
  .route("/blog/:email")
  .get(Authenticate, blogValidationForEmail, viewBlog);
router
  .route("/blog/:title")
  .delete(Authenticate, blogValidationForTitle, deleteBlog);

router
  .route("/blog/update/:id")
  .put(Authenticate, blogValidationForID, updateBlog);
router.route("/myprofile").get(Authenticate, getMyprofile);

module.exports = router;
//get data 200
//creating data 201
//
