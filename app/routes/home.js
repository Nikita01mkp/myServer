const express = require("express");
const jsonParser = express.json();
const homeController = require("../controllers/home.js");
const userAuth = require("../modules/auth.js");
const homeRouter = express.Router();

homeRouter.get("/list/:token", jsonParser, userAuth.checkToken, homeController.getListofHomes);
homeRouter.post("/rooms/:token", jsonParser, userAuth.checkToken, homeController.getListofRooms);
homeRouter.post("/addHome/:token", jsonParser, userAuth.checkToken, homeController.addHome);
homeRouter.post("/addRoom/:token", jsonParser, userAuth.checkToken, homeController.addRoom);
homeRouter.post("/updateHome/:token", jsonParser, userAuth.checkToken, homeController.updateHome);
homeRouter.post("/updateRoom/:token", jsonParser, userAuth.checkToken, homeController.updateRoom);
homeRouter.post("/deleteHome/:token", jsonParser, userAuth.checkToken, homeController.deleteHome);
homeRouter.post("/deleteRoom/:token", jsonParser, userAuth.checkToken, homeController.deleteRoom);

module.exports = homeRouter;