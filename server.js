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
    age: Number
});

const User = mongoose.model("User", userScheme);
app.use(cors())

mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) {
        console.log('WARNN ', req.body);

        return res.send("no body");
    }

    const userLogin = req.body.userLogin;
    const saltRounds = 10;
    const userPassword = bcrypt.hashSync(req.body.userPassword, saltRounds);
    const userEmail = req.body.userEmail;
    const userName = req.body.userName;
    const userAge = req.body.userAge;

    const user = new User({
        login:userLogin,
        password: userPassword,
        email: userEmail,
        name: userName,
        age: userAge
    });

    user.save(function(err){
        if(err){
            console.log('ERRRRR ', err);
            return console.log(err);
        }
        res.send(user);
    });
});
