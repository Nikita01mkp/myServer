const express = require("express");
const cors = require('cors');
const app = express();

const mongoose = require("mongoose");

const userRouter = require("./routes/user.js");

app.use(cors());

app.use("/api/users", userRouter);

mongoose.connect("mongodb://localhost:27017/usersdb", {useNewUrlParser: true}, function (err) {
    if (err) return console.log(err);
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });
});
mongoose.set('useFindAndModify', false);