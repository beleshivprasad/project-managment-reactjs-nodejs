const { logger } = require("./Logger/logger");

const ErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  logger.error(`${err} `);
  res.json({
    msg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { ErrorHandler };