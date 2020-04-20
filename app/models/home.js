const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeScheme = new Schema({
    homeName: String,
    rooms: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Room'
    }],
});

const Home = mongoose.model('Home', homeScheme);

module.exports = Home;