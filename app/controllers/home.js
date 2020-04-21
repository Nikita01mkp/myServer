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

    console.log("ADD HOME    " + "Home name is " + req.body.homeName);

    User.findOne({_id: req.body.id}, function (err, user) {

        if (err) {
            console.log("ADD HOME ERR1");
            return res.status(405);
        }

        const newHome = new Home({
            homeName: req.body.homeName,
        })

        newHome.save(function (err, home) {
            if (err) {
                console.log("ADD HOME ERR2");
                return res.status(405)
            }

            console.log("Home is: " + home);

            user.homes.push(home._id);
            // user.homes[user.homes.length] = '5e9ef4d4e6fcb541141cb3a7';
            user.save(function (err, user1) {
                if (err) {
                    console.log("ADD HOME ERR3");
                    return res.status(406)
                }
                console.log("User is: " + user1);
                return res.status(200);
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

function deleteHome(req, res) {

    Home.findOne({_id: req.body.homeId}).populate.exec( function (err, home) {

        if (err) {
            return res.status(405);
        }

        for(let i = 0; i < home.rooms.length; i++){
            home.rooms[i].remove();
        }

        home.remove();
        return res.status(200);

    })

}

function deleteRoom(req, res) {

    Room.findOne({_id: req.body.roomId}, function (err, room) {

        if (err) {
            return res.status(405);
        }

        room.remove();
        return res.status(200);

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