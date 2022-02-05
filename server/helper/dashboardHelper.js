// const Blog = require("../Models/blogModel");
const models = require("../models");
const Blog = models.Blog;

const viewBlogFromDB = async (args) => {
  const res = {
    data: null,
    error: null,
  };
  console.log(args);
  const result = await Blog.findAll({ where: args })
    .then((data) => {
      console.log(data);
      res.data = data;
    })
    .catch((err) => {
      res.error = err;
    });
  return res;
};

const addBlogToDB = async (title, desc, author) => {
  const res = {
    data: null,
    error: null,
  };
  const blog = await Blog.create({
    title,
    desc,
    author,
  });
  const result = await Blog.findAll({
    where: { title, author },
  })
    .then((data) => {
      console.log(data);
      res.data = data[0].dataValues;
    })
    .catch((err) => {
      res.error = err;
    });
  return res;
};

const updateBlogFromDB = async (title, desc,author, id) => {
  const res = {
    error: null,
    data: null,
  };
  const result = await Blog.update({ title, desc }, { where: { id,author } });
  const data = await Blog.findAll({ where: { title, desc } })
    .then((data) => {
      res.data = data[0].dataValues;
    })
    .catch((error) => {
      res.error = error;
    });

  return res;
};

const deleteBlogFromDB = async (title, author) => {
  const res = {
    data: null,
    error: null,
  };
  const user = await Blog.destroy({ where: { author, title } });
  const result = await Blog.findAll({ where: { author, title } })
    .then((data) => {
      if (data.length === 0) {
        res.data = { deleted: true };
      }
    })
    .catch((error) => {
      res.error = error;
    });
  return res;
};

module.exports = {
  viewBlogFromDB,
  addBlogToDB,
  deleteBlogFromDB,
  updateBlogFromDB,
};
