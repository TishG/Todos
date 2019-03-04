const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    purchased: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Item", itemSchema)