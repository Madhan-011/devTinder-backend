const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(cookieParser()); // It is mainly for parsing/reading cookies
app.use(express.json()); // Here json is a middleware which is used to convert the incoming dynamic json data to js object and give it to the req.body

//Create a user
app.post("/signup", async (req, res) => {
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

//Login Api
app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {

 
    const user = req.user;

    res.send(user);
 
});

app.post("/sendConnectionRequest", userAuth, async (req,res) => {
  try{
  const user = req.user
  console.log("Sending a connection request")
  res.send(user.firstName+" "+"sent the conection request!!!")
  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
})


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
