const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./Routes/userAuth");
const {redisC} = require("./config/redis");
const problemRouter =require("./Routes/problemCreator")


app.use(express.json());
app.use(cookieParser());
app.use("/user", authRouter);
app.use("/problem",problemRouter);
const run = async () => {
  try {
    await Promise.all([main(), redisC()]);
    console.log("All the server is connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is running at Port : " + process.env.PORT);
    });
  } catch (err) {
    console.log("Error: " + err.message)
  }
};
run();