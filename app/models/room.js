const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomScheme = new Schema({
    roomName: String,
});

const Room = mongoose.model('Room', roomScheme);

module.exports = Room;