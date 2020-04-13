const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const userAuth = require("../modules/auth.js");

const addUser = function (req, res) {
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log('WARNN ', req.body);

        return res.send("no body");
    }

    const userLogin = req.body.userLogin;
    let saltRounds = bcrypt.genSaltSync(10);
    const userPassword = bcrypt.hashSync(req.body.userPassword, saltRounds);
    const userEmail = req.body.userEmail;
    const userName = req.body.userName;
    const userAge = req.body.userAge;

    const user = new User({
        login: userLogin,
        password: userPassword,
        email: userEmail,
        name: userName,
        age: userAge,
        userId: saltRounds
    });

    user.save(function (err) {
        if (err) {
            return console.log(err);
        }
        res.status(200).send("Success");
    });
};

const getUser = function (req, res) {
    if(Object.keys(req.body).length === 0){
        console.log(req.body);
        return res.status(403).send("Object is empty")
    }
    const id = req.body.id;
    let copyUser = {};

    User.findOne({_id: id}, function (err, user) {

        if (err) {
            return res.status(403).send("bad req");
        }

        copyUser.name = user.name;
        copyUser.age = user.age;
        copyUser.gender = user.gender;

        res.send(copyUser);
    });
};

const loginUser = function (req, res) {
    if (!req.body){
        return res.sendStatus(404);
    }

    const getLogin = req.body.userLogin;
    const getPassword = req.body.userPassword;
    User.findOne({login: getLogin}, function (err, user) {

        if (err) return console.log(err);
        if (user === null) {
            console.log('user not found');
            res.status(400).send('User is not exist');
        } else {

            if (bcrypt.hashSync(getPassword, user.userId) === user.password) {
                console.log(user._id);
                const tokens = userAuth.createToken(user._id);
                res.status(200).send(tokens)
            } else {
                res.status(401).send('Wrong password')
            }
        }
    });
};
const changeUser = function (req, res) {
    if(Object.keys(req.body).length === 0){
        return res.status(403).send("Object is empty")
    }

    const id = req.body.id;

    const newUser = req.body;

    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function (err, user) {
        if (err){
            return console.log(err);
        }
        res.send(user);
    });
};
const changeUserPassword = function (req, res) {
    if (req.body === {}) {
        return res.sendStatus(404);
    }
    const id = req.body.id;
    let newUser = {};

    newUser.password = req.body.newPassword;
    newUser.oldPassword = req.body.oldPassword;
    newUser.salt = req.body.salt;

    User.findOne({_id: id}, function (err, user) {

        if (err) {
            return console.log(err);
        }

        if (bcrypt.hashSync(newUser.oldPassword, user.userId) === user.password) {
            res.status(200).send('success');
            user.password = bcrypt.hashSync(newUser.password, user.userId);
            user.save(function (err) {

                if (err) return console.log(err);
            });
        } else {
            res.status(403).send('Wrong password');
        }
    });
};
const deleteUser = function (req, res) {
    const id = req.body.id;
    User.findOneAndDelete({_id: id}, function (err, user) {

        if (err){
            return console.log(err);
        }
        res.status(200).send('success');

    });
};

module.exports = {
    addUser,
    changeUserPassword,
    loginUser,
    getUser,
    changeUser,
    deleteUser,
}