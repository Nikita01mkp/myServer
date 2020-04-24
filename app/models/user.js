const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
    login: String,
    password: String,
    email: String,
    name: String,
    age: Number,
    gender: String,
    userId: String,
    token: String,
    homes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Home'
    }],
    userRole: String,
});

const User = mongoose.model('User', userScheme);

module.exports = User;