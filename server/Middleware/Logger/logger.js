const path = require("path");
const fs = require("fs");

const { createLogger, transports, format, level } = require("winston");
require("dotenv").config({ path: path.join(__dirname, "../../utils/.env") });

const logger = createLogger({
  transports:
    process.env.NODE_ENV === "development"
      ? [
          new transports.File({
            filename: path.join(__dirname, "/logs/info.log"),
            level: "info",
            format: format.combine(format.timestamp(), format.simple()),
          }),
          new transports.File({
            filename: path.join(__dirname, "/logs/error.log"),
            level: "error",
            format: format.combine(format.timestamp(), format.simple()),
          }),
        ]
      : [
          new transports.Console({
            filename: path.join(__dirname, "/logs/info.log"),
            level: "info",
            format: format.combine(format.timestamp(), format.simple()),
          }),
          new transports.Console({
            filename: path.join(__dirname, "/logs/error.log"),
            level: "error",
            format: format.combine(format.timestamp(), format.simple()),
          }),
        ],
});

const accessStream = fs.createWriteStream(
  path.join(__dirname, "/logs/request.log"),
  {
    flags: "a",
  }
);

module.exports = { accessStream, logger };
