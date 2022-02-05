const mongoose = require("mongoose");
const { logger } = require("../Middleware/Logger/logger");

const ConnectDB = async () => {
  try {
    const conn = mongoose
      .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
      })
      .then((conn) => {
        if (conn) {
          logger.info(
            `Database Connected Succesfully : ${conn.connection.host}`
          );
          console.log(`MongoDB Connect : ${conn.connection.host}`);
        }
      })
      .catch((error) => {
        logger.error(`Database Connection Failed `);
        console.error("Error : ", error);
      });
  } catch (error) {
    logger.error(`Database Connection Failed  `);
    throw new Error(error);
  }
};

module.exports = { ConnectDB };
