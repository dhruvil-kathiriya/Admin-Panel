const express = require("express");
const routes = express.Router();
const gallarycontroller = require("../controller/gallarycontroller");
const Gallary = require("../models/gallary");

routes.get("/addgallaryData", gallarycontroller.addgallaryData);

routes.post("/InsertgallaryData", Gallary.uploadImage, gallarycontroller.InsertgallaryData);

routes.get("/viewgallaryData", gallarycontroller.viewgallaryData);

//Active Button toggle
routes.get("/isActive/:id", gallarycontroller.isActive);

module.exports = routes;