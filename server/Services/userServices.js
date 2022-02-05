const bcrypt = require("bcryptjs");
const { addUserToDB, findUserFromDB } = require("../helper/userHelper");
const generateToken = require("../Auth/generateToken");

const { logger } = require("../Middleware/Logger/logger");

const register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const user = await addUserToDB(fname, lname, email, password);
  if (user) {
    logger.log("info", `Successfully Registerd : ${user.email}`);
    res.status(201).json(user);
  } else {
    logger.log("error", `Registraion Error : ${user.email}`);
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserFromDB({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    logger.log("info", `Successfully Logged In : ${user.email}`);
    res.json({
      id: user.id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      token: generateToken(user.email),
      isAdmin: user.isAdmin,
    });
  } else {
    logger.log("error", `Invalid Email or Password : ${user.email}`);
    res.status(400).json({ error: "Invalid Email or Password" });
  }
};

module.exports = { register, login };
