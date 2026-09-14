const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ //Schema means the structure of the data that we want to store in the database. It defines the fields and their types, as well as any validation rules or default values that we want to apply to those fields.
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    }
})

const User = mongoose.model("User", userSchema); //Model is a class that we can use to create and read documents from the database. It is created from a schema and provides an interface for interacting with the database.

module.exports = User;