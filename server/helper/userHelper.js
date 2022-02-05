// const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");

const models = require("../models");

const addUserToDB = async (fname, lname, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await models.User.create({
    fname,
    lname,
    email,
    password: hashPassword,
  });
  if (user) {
    return user;
  } else {
    return { error: "Could Not Create User" };
  }
};

const findUserFromDB = async (args) => {
  const result = await models.User.findAll({ where: args });
  if (result.length !== 0) {
    return result[0].dataValues;
  } else {
    return { error: "Something Went Wrong" };
  }
};
module.exports = { addUserToDB, findUserFromDB };
