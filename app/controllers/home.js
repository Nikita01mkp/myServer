const User = require('../models/user.js');
const Home = require('../models/home.js');
const Room = require('../models/room.js');


function getListofHomes(req, res) {

    if (Object.keys(req.body).length === 0){
        return res.sendStatus(405);
    }

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

    if (req.body.homeName === undefined){
        console.log("Name is empty");
        return res.status(400).send("Home name is empty");
    }

    User.findOne({_id: req.body.id}, function (err, user) {

        if (err) {
            return res.status(405);
        }

        const newHome = new Home({
            homeName: req.body.homeName,
        })

        newHome.save(function (err, home) {
            if (err) {
                return res.status(405)
            }

            user.homes.push(home._id);
            user.save(function (err, user1) {
                if (err) {
                    return res.status(406)
                }
                return res.status(200).send("Success");
            })
        })


    })

}

function addRoom(req, res) {

    Home.findOne({_id: req.body.homeId}, function (err, home) {

        if (err) {
            return res.status(405);
        }

        const room = new Room({
            roomName: req.body.roomName,
        })

        room.save(function (err, room) {

            if (err) {
                return res.status(405)
            }

            home.rooms.push(room);

            home.save(function (err) {
                if (err) {
                    return res.status(406)
                }
                return res.status(200).send('Success');
            })
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
            return res.status(200).send("success");

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
            return res.status(200).send("success")

        })


    })

}

function deleteHome(req, res) {

    Home.findOne({_id: req.body.homeId}).populate("homes").exec(function (err, home) {

        if (err) {
            return res.status(405);
        }

        for (let i = 0; i < home.rooms.length; i++) {

            Room.findOne({_id: home.rooms[i]._id}, function (err, room) {

                if (err) {
                    return res.status(405);
                }

                room.remove();

            })
        }

        home.remove();
        return res.status(200).send("success");

    })

}

function deleteRoom(req, res) {

    Room.findOne({_id: req.body.roomId}, function (err, room) {

        if (err) {
            return res.status(405);
        }

        room.remove();
        return res.status(200).send("success");

    })

}

module.exports = {

    getListofHomes,
    getListofRooms,
    addHome,
    addRoom,
    updateHome,
    updateRoom,
    deleteHome,
    deleteRoom,

}