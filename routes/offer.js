const express = require("express");
const routes = express.Router();
const offerController = require("../controller/offercontroller");

routes.get("/addofferData", offerController.addofferData);

routes.post("/InsertofferData", offerController.InsertofferData);

routes.get("/viewofferData", offerController.viewofferData);

//Active Button toggle
routes.get("/isActive/:id", offerController.isActive);

module.exports = routes;
