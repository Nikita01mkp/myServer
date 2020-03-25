const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const jsonParser = express.json();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const userScheme = new Schema({
    login: String,
    password: String,
    email: String,
    name: String,
    age: Number,
    gender: String,
    userId: String
});

const User = mongoose.model("User", userScheme);
app.use(cors())

mongoose.connect("mongodb://localhost:27017/usersdb", {useNewUrlParser: true}, function (err) {
    if (err) return console.log(err);
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if (!req.body) {
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
            console.log('ERRRRR ', err);
            return console.log(err);
        }
        res.send(user);
    });
});


app.put("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(404);
    const getLogin = req.body.userLogin;
    const getPassword = req.body.userPassword;
    User.findOne({login: getLogin}, function (err, user) {

        if (err) return console.log(err);
        if (user === null) {
            console.log('user not found');
            res.status(400).send('User is not exist');
        } else {

            if (bcrypt.hashSync(getPassword, user.userId) === user.password) {
                console.log("совпадение? не думаю");
                res.status(200).send('success')
            } else {
                console.log("совпадение это не падение сов");
                res.status(401).send('Wrong password')
            }
        }
    });

});

app.get("/api/users/:id", function (req, res) {

    const id = req.params.id;

    User.findOne({_id: id}, function (err, user) {

        if (err) {
            return err;
            console.log('aaaaaaaaaaaa');
        }
        res.send(user);
    });

});

app.put("/api/user/change", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(404);

    const id = req.body._id;
    const newUser = req.body;

    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function (err, user) {
        if (err) return console.log(err);
        res.send(user);
    });
});

app.put("/api/user/changePassword", jsonParser, function (req, res) {


    if (req.body === {}) return res.sendStatus(404);
    const id = req.body.id;
    let newUser = {};
    let b = false;

    newUser.password = req.body.newPassword;
    newUser.oldPassword = req.body.oldPassword;
    newUser.salt = req.body.salt;

    User.findOne({_id: id}, function (err, user) {

        if (err) return console.log(err);


        if (bcrypt.hashSync(newUser.oldPassword, newUser.salt) === user.password) {
            console.log("совпадение? не думаю");
            res.status(200).send('success');
            b = true;
        } else {
            console.log("совпадение это не падение сов");
            res.status(401).send('Wrong password');
            b = false;
        }

    });


    if (b) {//комп выполняет эту функцию быстрее т.к. b = false необходимо ввести асинхронные функции
        let text = bcrypt.hashSync(newUser.password, newUser.salt);
        console.log(text);
        console.log("alaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarm");
        User.findByIdAndUpdate(id, {password : text}, function (err, user) {
            if (err) return console.log(err);
            console.log("I'm here");
            // user.password = bcrypt.hashSync(newUser.password, newUser.salt);
            res.status(200).send('success');
            console.log("Обновленный объект", user);
        });
    }else{
        console.log("nam pizda")
    }


});