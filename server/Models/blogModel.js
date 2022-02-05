const e = require("express");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      default: Date.now(),
    },
    comments: [
      {
        comment: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
