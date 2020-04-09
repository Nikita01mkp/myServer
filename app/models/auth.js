const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authScheme = new Schema({
    user_id: String,
    token: String,
    refreshToken: String,
});

const Auth = mongoose.model('Auth', authScheme);

module.exports = Auth;