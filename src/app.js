const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Anandhu",
    lastName: "Aji",
    email: "anandhu@gmail.com",
    password: "987654",
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send("Error while saving user: " + error.message);
  }
});

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
