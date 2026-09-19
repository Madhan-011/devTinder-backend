const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body)

  try {
    //Validation of data using helper function from utils
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    //Encrypt Password using bcrypt and salt rounds
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("Created User Successfully");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid) {
      //Create a JWT Token

      //Ad the token to the cookie and send the response back to the user
      const token = await user.getJWT()

      res.cookie("token", token, {expires: new Date(Date.now()+ 8 + 3600000)}); // res.cookie given by express - expires = 8h

      res.send("Login Successful...");
      
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    }).send("Logout Successful")
})

module.exports = authRouter