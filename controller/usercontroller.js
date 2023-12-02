const path = require("path");
const Slider = require("../models/slider");
const Offer = require("../models/offer");
const Gallary = require("../models/gallary");
const fs = require("fs");

//Dashbord Page Render
module.exports.opendashboard = async (req, res) => {
    let SliderData = await Slider.find({});
    let Offerdata = await Offer.find({});
    let gallaryData = await Gallary.find({})
    return res.render("userPages/home", {
        SliderData: SliderData,
        Offerdata: Offerdata,
        gallaryData: gallaryData
    })
};