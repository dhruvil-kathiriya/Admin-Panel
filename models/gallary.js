const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const imagePath = "/uploads/Gallaryimage";

const gallarySchema = mongoose.Schema({
  gallaryImage: {
    type: String,
    required: true,
  },
  img_header: {
    type: String,
    required: true,
  },
  img_title: {
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

gallarySchema.statics.uploadImage = multer({ storage: imageStorage }).single(
  "gallaryImage"
);

gallarySchema.statics.imgModel = imagePath;
const Gallary = mongoose.model("Gallary", gallarySchema);

module.exports = Gallary;
