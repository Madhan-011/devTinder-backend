const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");
const bcrypt = require("bcrypt")

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;

  res.send(user);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try{
        const { currentPassword, newPassword} = req.body;

        const user= req.user;

        const isPasswordValid = await user.validatePassword(currentPassword)

        if(!isPasswordValid){
            throw new Error("Current password is incorrect")
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        user.password = passwordHash

        await user.save();

        res.send("Password updated successfully")

    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = profileRouter;
