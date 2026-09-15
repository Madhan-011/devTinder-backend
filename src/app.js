const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json()); // Here json is a middleware which is used to convert the incoming dynamic json data to js object and give it to the req.body


//Create a user 
app.post("/signup", async (req, res) => {
  // console.log(req.body)

  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send("Error while saving user: " + error.message);
  }
});

//Get Api for one
app.get("/user", async (req, res) => { //findOne API
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      res.status(404).send("User not found")
    }else{
    res.send(user);
    }
  } catch (err) {
    console.log(err);
  }
});

//Get Api for all 
app.get("/feed",async (req,res) => {
  try{
  const user = await User.find()
  res.send(user)
  }catch(err){
    res.status(400).send("Something went wrong",err)
  }
})

//Delete Api for user
app.delete("/user", async (req,res) => {
  // const userDeleted1 = await User.findByIdAndDelete({id: req.body.id}) // this is equal to only req.body.id below
  try{
  const userDeleted = await User.findByIdAndDelete(req.body.id)
  res.send("User Deleted successfully")
  }catch(err){
    res.status(400).send("Something went wrong")
  }
})

//Update Api using patch
app.patch("/user",async (req,res) => {
  try{
  const user = await User.findByIdAndUpdate(req.body.userId, req.body)
  res.send("User Updated successfully")
  }catch(err){
    res.status(400).send("Something went wrong",err)
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
