// // index.js
//
// // подключаем bcrypt
 var bcrypt = require('bcrypt');
//
// // пароль пользователя
// var passwordFromUser = "test_user_pass";
//
// // создаем соль

// var saltq = bcrypt.genSaltSync(10);
// // шифруем пароль
// var passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
//
// // выводим результат
// console.log(salt);
// console.log(saltq);
// console.log(passwordFromUser);
// console.log(passwordToSave);
//
// if (bcrypt.hashSync(passwordFromUser, saltq) === passwordToSave) {
//     console.log("It's working")
// }else {
//     console.log("mistake")
// }
//
//
//
// // const getLogin = req.body.userLogin;
// // const getPassword = req.body.userPassword;
// // User.findOne({login: getLogin}, function(err, user){
// //
// //     if(err) return console.log(err);
// //
// //     res.send(user)
// //
// // });
// //
// // if (bcrypt.hashSync(user.userPassword, user.userId) === getPassword) {
// //     console.log("It's working")
// // }else {
// //     console.log("mistake")
// // }

