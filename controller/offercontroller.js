const path = require("path");
const Offer = require("../models/offer");

//Add Offer Page Render
module.exports.addofferData = async (req, res) => {
    return res.render("Add_offer");
}

//Indert Offer data
module.exports.InsertofferData = async (req, res) => {
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString();
    let OfferData = await Offer.create(req.body);
    return res.redirect('back');
};

//View Slider Page Render
module.exports.viewofferData = async (req, res) => {
    let OfferData = await Offer.find({});
    return res.render("View_offer", {
        OfferData: OfferData
    });
};


//Active-Deactive Button
module.exports.isActive = async (req, res) => {
    try {
        if (req.params.id) {
            let data = await Offer.findById(req.params.id);
            if (data.isActive) {
                let active = await Offer.findByIdAndUpdate(req.params.id, {
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
                let Deactive = await Offer.findByIdAndUpdate(req.params.id, {
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