const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

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
    console.log(passwordHash);

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
app.post("/login", async (req,res) => {
  try{
    const {email,password} = req.body
    
    const user = await User.findOne({email:email})
    if(!user){
      throw new Error("Invalid Credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(isPasswordValid){
      res.send("Login Successful...")
    }else{
      throw new Error("Invalid Credentials")
    }
  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
})

//Get Api for one
app.get("/user", async (req, res) => {
  //findOne API
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.log(err);
  }
});

//Get Api for all
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong", err);
  }
});

//Delete Api for user
app.delete("/user", async (req, res) => {
  // const userDeleted1 = await User.findByIdAndDelete({id: req.body.id}) // this is equal to only req.body.id below
  try {
    const userDeleted = await User.findByIdAndDelete(req.body.id);
    res.send("User Deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Update Api using patch
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    ); //api level validation

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
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
