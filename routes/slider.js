const express = require("express");
const routes = express.Router();
const slidercontroller = require("../controller/slidercontroller");
const Slider = require("../models/slider");
const Gallary = require("../models/gallary");

routes.get("/addSliderData", slidercontroller.addSliderData);

routes.post("/InsertSliderData", Slider.uploadImage, slidercontroller.InsertSliderData
);

routes.get("/viewSliderData", slidercontroller.viewSliderData);

routes.get("/isActive/:id", slidercontroller.isActive);

module.exports = routes;
