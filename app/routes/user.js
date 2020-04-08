const express = require("express");
const jsonParser = express.json();
const userController = require("../controllers/user.js");
const userAuth = require("../modules/auth.js");
const userRouter = express.Router();

userRouter.post("/", jsonParser, userController.addUser);
userRouter.put("/", jsonParser, userAuth.createToken, userController.loginUser);

userRouter.get("/:id", jsonParser, userAuth.checkToken, userController.getUser);

userRouter.put("/change", jsonParser, userAuth.checkToken,  userController.changeUser);
userRouter.put("/changePassword", jsonParser, userAuth.checkToken,  userController.changeUserPassword);
userRouter.delete("/:id", jsonParser, userAuth.checkToken, userController.deleteUser);

module.exports = userRouter;
