// index.js

// подключаем bcrypt
var bcrypt = require('bcrypt');

// пароль пользователя
var passwordFromUser = "test_user_pass";

// создаем соль
var salt = bcrypt.genSaltSync(10);

// шифруем пароль
var passwordToSave = bcrypt.hashSync(passwordFromUser, salt);

// выводим результат
console.log(salt);
console.log(passwordFromUser);
console.log(passwordToSave);