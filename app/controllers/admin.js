const User = require('../models/user.js');
const Auth = require('../models/auth.js');
const Home = require('../models/home.js');
const Room = require('../models/room.js');

function getUserList(req,res) {

    User.find({}, function(err, users){

        if(err){
            return res.status(404).send('Error of get users');
        }

        const masObj = [];

        for(let i = 0; i < users.length; i++){
            masObj[i] = {
                login: users[i].login,
                _id: users[i]._id,
            }
        }

        return res.status(200).send(masObj);
    });

}

function deleteUser(req, res){

    const id = req.query._id;

    User.findOne({_id: id}, function (err, user) {

        if (err){
            return res.status(404).send(err);
        }

        for(let i = 0; i < user.homes.length; i++){
            Home.findOne({_id: user.homes[i]}, function (err, home) {

                if (err) {
                    return res.status(405);
                }

                for (let i = 0; i < home.rooms.length; i++) {

                    Room.findOne({_id: home.rooms[i]}, function (err, room) {

                        if (err) {
                            return res.status(405);
                        }

                        room.remove();

                    })
                }

                home.remove();
            })
        }

        Auth.findOneAndDelete({user_id: id}, function (err) {
            if (err){
                return res.status(404).send("Error of delete tokens");
            }
        })

        user.remove();
        return res.status(200).send('success');

    });

}

module.exports = {
    getUserList,
    deleteUser,
};