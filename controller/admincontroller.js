const path = require("path");
const Admin = require("../models/admin");
const Slider = require("../models/slider");
const fs = require("fs");
const nodemailer = require("nodemailer");

//Dashbord Page Render
module.exports.dashboard = async (req, res) => {
  return res.render("dashbord");
};

//Login Page Render
module.exports.login = async (req, res) => {
  return res.render("login");
};

//Login Data Match & redirect To Dashbord
module.exports.checkLogin = async (req, res) => {
  return res.redirect("/admin/dashboard");
};

//Add_Admin Page Render
module.exports.addAdminData = async (req, res) => {
  return res.render("add_admin");
};

//Add New Admin
module.exports.insertAdminData = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = Admin.imgModel + "/" + req.file.filename;
      req.body.AdminImage = imagePath;
    } else {
      console.log("Record not found");
      return res.redirect("back");
    }
    if (req.body) {
      req.body.name = req.body.fname + " " + req.body.lname;
      req.body.isActive = true;
      req.body.currentDate = new Date().toLocaleString();
      req.body.updateDate = new Date().toLocaleString();
      let adminData = await Admin.create(req.body);
      return res.redirect("/admin/viewAdminData");
    } else {
      console.log("record Not Found");
      return res.redirect("back");
    }
  } catch (err) {
    console.error(err);
    return res.redirect("back");
  }
};

//View_Admin Page Render
module.exports.viewAdminData = async (req, res) => {
  if (req.user == undefined) {
    return res.redirect("/admin/");
  } else {
    let data = await Admin.find({});
    var adminRecord = req.user;
    return res.render("view_admin", {
      adminData: adminRecord,
      mainAdmin: data,
    });
  }
};

//Active-Deactive Button
module.exports.isActive = async (req, res) => {
  try {
    if (req.params.id) {
      let data = await Admin.findById(req.params.id);
      if (data.isActive) {
        let active = await Admin.findByIdAndUpdate(req.params.id, {
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
        let Deactive = await Admin.findByIdAndUpdate(req.params.id, {
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

//Change Password Page Render
module.exports.changePassword = async (req, res) => {
  let data = await Admin.find({});
  if (req.user == undefined) {
    return res.redirect("/admin/");
  } else {
    var adminRecord = req.user;
    return res.render("changepassword", {
      //adminData: data,
      adminData: adminRecord,
    });
  }
};

//Change Password
module.exports.modifyPassword = async (req, res) => {
  let adminRecord = req.user;
  if (adminRecord.password == req.body.cpass) {
    if (req.body.cpass != req.body.npass) {
      if (req.body.npass == req.body.copass) {
        let alladmin = await Admin.findById(adminRecord._id);
        if (alladmin) {
          let editPass = await Admin.findByIdAndUpdate(alladmin.id, {
            password: req.body.npass,
          });
          if (editPass) {
            return res.redirect("/admin/logoutAdmin/");
          } else {
            console.log("Password Not Updated");
          }
        } else {
          console.log("Record not Found");
        }
      } else {
        console.log("Confirm Password does Not match");
      }
    } else {
      console.log("Confirm and New password are not same ");
      return res.redirect("back");
    }
  } else {
    console.log("Password Does not Match to current Password");
    return res.redirect("back");
  }
};

//Profile Page
module.exports.profile = (req, res) => {
  if (req.user == undefined) {
    return res.redirect("/admin/");
  } else {
    var adminRecord = req.user;
    var sname = adminRecord.name.split(" ");
    return res.render("view_profile", {
      adminData: adminRecord,
      sname: sname,
    });
  }
};

//Update Admin Data
module.exports.updateAdminData = async (req, res) => {
  let record = await Admin.findById(req.params.id);
  var adminrecord = req.user;
  return res.render("update_admin", {
    up: record,
    adminData: adminrecord,
  });
};

//Edit Admin Data
module.exports.EditAdminData = async (req, res) => {
  let oldData = await Admin.findById(req.body.EditId);
  req.body.name = req.body.fname + " " + req.body.lname;
  req.body.isActive = true;
  req.body.update_date = new Date().toLocaleString();
  console.log(oldData);
  if (req.file) {
    if (oldData.AdminImage) {
      let FullPath = path.join(__dirname, "..", oldData.AdminImage);
      await fs.unlinkSync(FullPath);
    }
    var imagePath = "";
    imagePath = Admin.imgModel + "/" + req.file.filename;
    req.body.AdminImage = imagePath;
  } else {
    req.body.AdminImage = imagePath;
  }
  await Admin.findByIdAndUpdate(req.body.EditId, req.body);
  return res.redirect("/admin/viewAdminData");
};

//Delete Admin Data
module.exports.deleteAdminData = async (req, res) => {
  try {
    let oldData = await Admin.findById(req.params.id);
    if (oldData) {
      var oldImage = oldData.adminImage;
      if (oldImage) {
        let FullPath = path.join(__dirname, "..", oldData.adminImage);
        await fs.unlinkSync(FullPath);
      }
    } else {
      console.log("Image Path is Worng");
      return res.redirect("back");
    }
    await Admin.findByIdAndDelete(req.params.id);
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

//Update Profile Page Render
module.exports.updateprofile = async (req, res) => {
  let record = await Admin.findById(req.params.id);
  var adminrecord = req.user;
  return res.render("update_profile", {
    up: record,
    adminData: adminrecord,
  });
};

//EditProfile Page Render
module.exports.Editprofile = async (req, res) => {
  let oldData = await Admin.findById(req.body.EditId);
  req.body.name = req.body.fname + " " + req.body.lname;
  req.body.isActive = true;
  req.body.update_date = new Date().toLocaleString();
  console.log(oldData);
  if (req.file) {
    try {
      if (oldData.AdminImage) {
        let FullPath = path.join(__dirname, "..", oldData.AdminImage);
        await fs.unlinkSync(FullPath);
      }
    } catch (err) {}
    var imagePath = "";
    imagePath = Admin.imgModel + "/" + req.file.filename;
    req.body.AdminImage = imagePath;
  } else {
    req.body.AdminImage = imagePath;
  }
  await Admin.findByIdAndUpdate(req.body.EditId, req.body);
  return res.redirect("/admin/viewAdminData");
};

//Check Email (ForgotPass)
module.exports.VerifyEmail = async (req, res) => {
  try {
    let checkmailData = await Admin.findOne({ email: req.body.email });
    if (checkmailData) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "dskathiriya156@gmail.com",
          pass: "ekfencgjllklokpy",
        },
      });

      // let otp = '';
      // for (let i = 0; i < 6; i++) {
      //     otp += Math.floor(Math.random() * 10);
      // };

      var otp = Math.floor(100000 + Math.random() * 900000);
      res.cookie("otp", otp);
      res.cookie("email", req.body.email);
      const info = await transporter.sendMail({
        from: "dskathiriya156@gmail.com", // sender address
        to: "dskathiriya156@gmail.com", // list of receivers
        subject: "OTP Verification", // Subject line
        html: `<p>Your Login Code is : <b>${otp}</b></p>`, // html body
      });
      if (info) {
        console.log("Otp Sent SuccessFully");
        return res.redirect("/admin/checkOtp");
      } else {
        console.log("Email is not valid");
        return res.redirect("back");
      }
    } else {
      console.log("Email Does Not Match");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err.message);
    return res.redirect("/admin/");
  }
};
module.exports.verifyOtp = async (req, res) => {
  if (req.body.otp == req.cookies.otp) {
    return res.redirect("/admin/setNewPass");
  } else {
    console.log("Otp Does Not Match");
    return res.redirect("back");
  }
};

module.exports.UpdateotpData = async (req, res) => {
  if (req.body.npass == req.body.cpass) {
    let email = req.cookies.email;
    let checkEmail = await Admin.findOne({ email: email });
    if (checkEmail) {
      let resetPassword = await Admin.findByIdAndUpdate(checkEmail.id, {
        password: req.body.npass,
      });
      if (resetPassword) {
        res.clearCookie("otp");
        res.clearCookie("email");
        return res.redirect("/admin/");
      } else {
        console.log("Password Not Changed");
        return res.redirect("back");
      }
    } else {
      console.log("Email Not Found");
      return res.redirect("back");
    }
  } else {
    console.log("Password Not Matched");
    return res.redirect("back");
  }
};
