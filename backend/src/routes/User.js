const express = require("express");
const app = express.Router();
const userController = require("../controller/User")

app.post("/register", userController.registerController)

app.post("/login",userController.loginController)

module.exports = app