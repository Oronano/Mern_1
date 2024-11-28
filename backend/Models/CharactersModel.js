const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./UsersModel");

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
    },
    category: {
        type: String,
        enum: ["Mage", "Marksman", "Assassin", "Tank", "Fighter", "Support"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Character", CharacterSchema);
