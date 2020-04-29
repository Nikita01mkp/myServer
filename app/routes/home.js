const express = require("express");
const jsonParser = express.json();
const homeController = require("../controllers/home.js");
const userAuth = require("../modules/auth.js");
const homeRouter = express.Router();

homeRouter.get("/list/", jsonParser, userAuth.checkToken, homeController.getListofHomes);
homeRouter.post("/rooms/", jsonParser, userAuth.checkToken, homeController.getListofRooms);
homeRouter.post("/addHome/", jsonParser, userAuth.checkToken, homeController.addHome);
homeRouter.post("/addRoom/", jsonParser, userAuth.checkToken, homeController.addRoom);
homeRouter.post("/updateHome/", jsonParser, userAuth.checkToken, homeController.updateHome);
homeRouter.post("/updateRoom/", jsonParser, userAuth.checkToken, homeController.updateRoom);
homeRouter.post("/deleteHome/", jsonParser, userAuth.checkToken, homeController.deleteHome);
homeRouter.post("/deleteRoom/", jsonParser, userAuth.checkToken, homeController.deleteRoom);

module.exports = homeRouter;