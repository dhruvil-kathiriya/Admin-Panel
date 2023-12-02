const path = require("path");
const Gallary = require("../models/gallary");

//Add gallary Page Render
module.exports.addgallaryData = async (req, res) => {
    return res.render("Add_gallary");
};

//Insert Gallary Page Data
module.exports.InsertgallaryData = async (req, res) => {
    let imagePath = "";
    imagePath = Gallary.imgModel + "/" + req.file.filename;
    req.body.gallaryImage = imagePath;
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString();
    let GallaryData = await Gallary.create(req.body);
    return res.redirect('back');
};

//View Gallary Page Render
module.exports.viewgallaryData = async (req, res) => {
    let GallaryData = await Gallary.find({});
    return res.render("View_gallary", {
        GallaryData: GallaryData
    });
};

//Active-Deactive Button
module.exports.isActive = async (req, res) => {
    try {
        if (req.params.id) {
            let data = await Gallary.findById(req.params.id);
            if (data.isActive) {
                let active = await Gallary.findByIdAndUpdate(req.params.id, {
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
                let Deactive = await Gallary.findByIdAndUpdate(req.params.id, {
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