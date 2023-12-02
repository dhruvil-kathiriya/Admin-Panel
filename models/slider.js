const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const imagePath = "/uploads/SliderImage";

const sliderSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  SliderImage: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  currentDate: {
    type: String,
    required: true,
  },
  updateDate: {
    type: String,
    required: true,
  },
});

//Multer Image Path Setup
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", imagePath));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now());
  },
});

sliderSchema.statics.uploadImage = multer({ storage: imageStorage }).single(
  "SliderImage"
);

sliderSchema.statics.imgModel = imagePath;
const Slider = mongoose.model("Slider", sliderSchema);

module.exports = Slider;
