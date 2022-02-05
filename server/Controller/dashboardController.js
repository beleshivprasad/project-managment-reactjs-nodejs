const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { logger } = require("../Middleware/Logger/logger");

const {
  view,
  create,
  update,
  delet,
} = require("../Services/dashboardServices");

const viewBlog = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    logger.error(`${await JSON.stringify(errors.errors)}`);
    res.status(400).json(errors);
  } else {
    view(req, res);
  }
});
const createBlog = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    logger.error(`${await JSON.stringify(errors.errors)}`);
    res.status(400).json(errors);
  } else {
    create(req, res);
  }
});
const updateBlog = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    logger.error(`${await JSON.stringify(errors.errors)}`);
    res.status(400).json(errors);
  } else {
    update(req, res);
  }
});
const deleteBlog = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    logger.error(`${await JSON.stringify(errors.errors)}`);
    res.status(400).json(errors);
  } else {
    delet(req, res);
  }
});

const getMyprofile = asyncHandler(async (req, res) => {});

module.exports = { viewBlog, createBlog, updateBlog, deleteBlog, getMyprofile };
