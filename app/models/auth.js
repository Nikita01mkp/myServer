const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authScheme = new Schema({
    token: String,
});

const Auth = mongoose.model('Auth', authScheme);

module.exports = Auth;