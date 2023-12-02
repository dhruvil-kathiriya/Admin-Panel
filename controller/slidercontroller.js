const path = require("path");
const Slider = require("../models/slider");

//Add Slider Page Render
module.exports.addSliderData = async (req, res) => {
  return res.render("Add_slider");
};

//Insert Slider Data
module.exports.InsertSliderData = async (req, res) => {
  let imagePath = "";
  imagePath = Slider.imgModel + "/" + req.file.filename;
  req.body.SliderImage = imagePath;
  req.body.isActive = true;
  req.body.currentDate = new Date().toLocaleString();
  req.body.updateDate = new Date().toLocaleString();
  let SliderData = await Slider.create(req.body);
  return res.redirect('back');
};

//View Slider Page Render
module.exports.viewSliderData = async (req, res) => {
  let SliderData = await Slider.find({});
  return res.render("View_slider", {
    SliderData: SliderData
  });
};

//Active-Deactive Button
module.exports.isActive = async (req, res) => {
  try {
    if (req.params.id) {
      let data = await Slider.findById(req.params.id);
      if (data.isActive) {
        let active = await Slider.findByIdAndUpdate(req.params.id, {
          isActive: false,
        });
        if (active) {
          console.log("Data Deactivate Successfully");
          return res.redirect("back");
        } else {
          console.log("Record Not Deactivate");
          return res.redirect("back");
        }
      } else {
        let Deactive = await Slider.findByIdAndUpdate(req.params.id, {
          isActive: true,
        });
        if (Deactive) {
          console.log("Data activate Successfully");
          return res.redirect("back");
        } else {
          console.log("Record Not activate");
          return res.redirect("back");
        }
      }
    } else {
      console.log("Params Id not Found");
      returnres.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};