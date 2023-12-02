const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const imagePath = "/uploads/AdminImage";

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: Array,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  hobby: {
    type: Array,
    required: true,
  },
  AdminImage: {
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

adminSchema.statics.uploadImage = multer({ storage: imageStorage }).single(
  "AdminImage"
);

adminSchema.statics.imgModel = imagePath;
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
