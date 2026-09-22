const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser()); // It is mainly for parsing/reading cookies
app.use(express.json()); // Here json is a middleware which is used to convert the incoming dynamic json data to js object and give it to the req.body


const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");


app.use("/", authRouter)

app.use("/", profileRouter)

app.use("/", requestRouter)

app.use("/", userRouter)


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("DataBase not connected", err);
  });
