const bcrypt = require("bcryptjs");

const encryptPassword = async (givenPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(givenPassword, salt);
  return hashPass;
};

module.exports = encryptPassword;
