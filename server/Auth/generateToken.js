const jwt = require("jsonwebtoken");

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5d",
  });
};

module.exports = generateToken;
