const User = require('../models/user.js');

function getUserList(req,res) {

    console.log("tyty");

    User.find({}, function(err, users){

        if(err) return console.log(err);
        console.log(users);
        return res.sendStatus(200);
    });

}

module.exports = {
    getUserList,
};