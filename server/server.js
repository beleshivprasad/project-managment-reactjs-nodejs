console.clear();
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//importing accessStream function for saving log
const { accessStream, logger } = require("./Middleware/Logger/logger");

//importing middlewares
const { ErrorHandler } = require("./Middleware/ErrorHandler");
const { UrlNotFound } = require("./Middleware/UrlNotFound");

//importing enviornment variables
dotenv.config({ path: __dirname + "/utils/.env" });

//import MongoDB connect function
const { ConnectDB } = require("./utils/ConnectDB");
ConnectDB();

//creating express app
const app = express();

//importing routes
const userRoute = require("./Routes/userRouter");
const dashboardRoute = require("./Routes/dashboardRouter");

//Using the moragn Middlware for printing all client request url and method type
app.use(
  morgan(":method :url :status :res[content-length] - :response-time mscl", {
    stream: accessStream,
  })
);

//Middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use("/user", userRoute);
app.use("/dashboard", dashboardRoute);

//ErrorMiddleware
app.use(UrlNotFound);
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  logger.info(`Server Started On PORT : ${process.env.PORT}`);
  console.log(`Server Started On PORT : ${process.env.PORT}`);
});
