const express = require("express");
const routes = express.Router();
const usercontroller = require("../controller/usercontroller");
const Admin = require("../models/admin");

routes.get("/", usercontroller.opendashboard);


module.exports = routes;
