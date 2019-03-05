const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 4, 
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
});

module.exports = mongoose.model("User", userSchema)