const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      maxLength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          // db level validation using validator library
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },

    age: {
      type: Number,
      min: 18,
      max: 100,
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "Gender must be male, female, or others",
      },
    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },

    about: {
      type: String,
      default: "This is a default about of the user!",
      maxLength: 200,
      trim: true,
    },

    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("User cannot have more than 10 skills");
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id },
    "dev@TINDER123",
    { expiresIn: "7d" },
  ); //1st parameter is some data to hide and 2nd is secret/private key

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );

  return isPasswordValid;

};
const User = mongoose.model("User", userSchema);

module.exports = User;
