const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedData = jwt.verify(token, "dev@TINDER123");

    const { _id } = decodedData;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exists");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = { userAuth };
