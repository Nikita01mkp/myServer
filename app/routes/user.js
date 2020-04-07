const express = require("express");
const jsonParser = express.json();
const userController = require("../controllers/user.js");
const userRouter = express.Router();

userRouter.post("/", jsonParser, userController.addUser);
userRouter.put("/", jsonParser, userController.loginUser);
userRouter.get("/:id", userController.getUser);
userRouter.put("/change", jsonParser, userController.changeUser);
userRouter.put("/changePassword", jsonParser, userController.changeUserPassword);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
