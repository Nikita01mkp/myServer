const User = require('../models/user.js');
const Home = require('../models/home.js');
const Room = require('../models/room.js');


function getListofHomes(req, res) {

    console.log("Tuk tuk from home");
    User.findOne({_id: req.body.id}).populate('homes').exec(function (err, user) {

        if (err) {
            return res.status(405).send("bad req");
        }

        return res.status(200).send(user.homes);

    })

}

function getListofRooms(req, res) {

    Home.findOne({_id: req.body.homeId}).populate('rooms').exec(function (err, home) {

        if (err) {
            return res.status(405);
        }

        return res.status(200).send(home.rooms);

    })

}

function addHome(req, res) {

    User.findOne({_id: req.body.id}, function (err, user) {

        if (err) {
            return res.status(405);
        }

        const home = new Home({
            homeName: req.body.homeName,
        })

        home.save(function (err, home) {
            if (err) {
                return res.status(405)
            }

            user.homes[user.homes.length] = home;
        })

        user.save(function (err) {
            if (err) {
                return res.status(406)
            }
            return res.status(200);
        })

    })

}

function addRoom(req, res) {

    Home.findOne({_id: req.body.homeId}, function (err, home) {

        if (err) {
            return res.status(405);
        }

        const room = new Room({
            homeName: req.body.roomName,
        })

        room.save(function (err, room) {

            if (err) {
                return res.status(405)
            }

            home.rooms[home.rooms.length] = room;
        })

        home.save(function (err) {
            if (err) {
                return res.status(406)
            }
            return res.status(200);
        })

    })

}

function updateHome(req, res) {

    Home.findOne({_id: req.body.homeId}, function (err, home) {

        if (err) {
            return res.status(405);
        }

        home.homeName = req.body.homeName;
        home.save(function (err) {

            if (err) {
                return res.status(405)
            }
            return res.status(200)

        })


    })

}

function updateRoom(req, res) {

    Room.findOne({_id: req.body.roomId}, function (err, room) {

        if (err) {
            return res.status(405);
        }

        room.roomName = req.body.roomName;
        room.save(function (err) {

            if (err) {
                return res.status(405)
            }
            return res.status(200)

        })


    })

}

module.exports = {

    getListofHomes,
    getListofRooms,
    addHome,
    addRoom,
    updateHome,
    updateRoom,

}