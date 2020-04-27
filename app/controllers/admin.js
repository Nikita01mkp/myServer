const User = require('../models/user.js');

function getUserList(req,res) {

    User.find({}, function(err, users){

        if(err) return console.log(err);

        const masObj = [];
        console.log(users.length);

        for(let i = 0; i < users.length; i++){
            masObj[i] = {
                login: users[i].login,
                _id: users[i]._id,
            }
            console.log(masObj[i]);
        }

        return res.status(200).send(masObj);
    });

}

function deleteUser(req, res){
    const id = req.body._id;
    User.findOneAndDelete({_id: id}, function (err) {

        if (err){
            return res.status(404).send(err);
        }
        return res.status(200).send('success');

    });
}

module.exports = {
    getUserList,
    deleteUser,
};