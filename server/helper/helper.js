// const User = require("../Models/userModel");
// const Blog = require("../Models/blogModel");
const models = require("../models");
const User = models.User;
const Blog = models.Blog;

const isEmailExist = async (email) => {
  const user = await User.findAll({ where: { email } });
  if (user.length !== 0) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};
const isEmailNotExist = async (email) => {
  const user = await User.findAll({ where: { email } });
  if (user.length === 0) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const MatchPassword = async (password, req) => {
  if (password !== req.body.cnfpass) {
    return Promise.reject("Password Dont Match");
  } else {
    return Promise.resolve();
  }
};

const isBlogExistForEmail = async (email) => {
  const blog = await Blog.findAll({ where: { author: email } });
  if (blog.length !== 0) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const isBlogNotExistForEmail = async (email) => {
  const blog = await Blog.findAll({ where: { author: email } });
  if (blog.length === 0) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const isBlogNotExistForID = async (id) => {
  const blog = await Blog.findAll({ where: { id } });
  if (blog.length === 0) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const isBlogExistForTitle = async (title) => {
  const blog = await Blog.findAll({ where: { title: title } });
  if (blog.length !== 0) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const isBlogNotExistForTitle = async (title) => {
  const blog = await Blog.findAll({ where: { title: title } });
  if (blog.length === 0) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};

module.exports = {
  isEmailExist,
  isEmailNotExist,
  MatchPassword,
  isBlogExistForEmail,
  isBlogNotExistForEmail,
  isBlogExistForTitle,
  isBlogNotExistForTitle,
  isBlogNotExistForID,
};
