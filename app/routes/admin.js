const express = require("express");
const jsonParser = express.json();
const adminController = require("../controllers/admin.js");
const adminAuth = require("../modules/authAdmin.js");
const adminRouter = express.Router();

adminRouter.get("/users/:token", jsonParser, adminAuth.checkAccess, adminController.getUserList);
adminRouter.post("/deleteUser/:token", jsonParser, adminAuth.checkAccess, adminController.deleteUser)

module.exports = adminRouter;