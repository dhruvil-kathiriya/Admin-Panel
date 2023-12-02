const express = require("express");
const routes = express.Router();
const admincontroller = require("../controller/admincontroller");
const Admin = require("../models/admin");
const passport = require("passport");
//login Page
routes.get("/", admincontroller.login);

//dashboard Page
routes.get("/dashboard", passport.checkAuth, admincontroller.dashboard);

//Add Admin Data
routes.get("/addAdminData", admincontroller.addAdminData);

//Insert Admin Data
routes.post(
  "/insertAdminData",
  Admin.uploadImage,
  admincontroller.insertAdminData
);

//View Admin data
routes.get("/viewAdminData", admincontroller.viewAdminData);

//Update Admin Data
routes.get("/updateAdminData/:id", admincontroller.updateAdminData);

//Edit Admin Data
routes.post("/EditAdminData", Admin.uploadImage, admincontroller.EditAdminData);

//Delete Admin Data
routes.get("/deleteAdminData/:id", admincontroller.deleteAdminData);

//CheckLogin Info
routes.post(
  "/checkLogin",
  passport.authenticate("local", { failureRedirect: "/admin/" }),
  admincontroller.checkLogin
);

//Active Button toggle
routes.get("/isActive/:id", admincontroller.isActive);

//Show Profile
routes.get("/profile", admincontroller.profile);

//Update Profile Data
routes.get("/updateprofile/:id", admincontroller.updateprofile);

//Edit Profile Data
routes.post("/Editprofile", Admin.uploadImage, admincontroller.Editprofile);

//Logout From Profile
routes.get("/logoutAdmin", async (req, res) => {
  res.clearCookie("admin");
  return res.redirect("/admin/");
});

//Change Password
routes.get("/changePassword", admincontroller.changePassword);

//Edit Password
routes.post("/modifyPassword", admincontroller.modifyPassword);

//Check Email Page(ForgotPassWord)
routes.get("/forgotpass", async (req, res) => {
  return res.render("forgotpass/checkMail");
});

//Verify Email(FOrgot Password)
routes.post("/VerifyEmail", admincontroller.VerifyEmail);

//Check Otp Page(ForgotPassword)
routes.get("/checkOtp", async (req, res) => {
  return res.render("forgotpass/checkOtp");
});

//Verify Otp(FOrgot Password)
routes.post("/verifyOtp", admincontroller.verifyOtp);

routes.get("/setnewpass", (req, res) => {
  return res.render("forgotpass/setNewPass");
});

routes.post("/UpdateotpData", admincontroller.UpdateotpData);

routes.use("/slider", passport.checkAuth, require("./slider"));
routes.use("/offer", passport.checkAuth, require("./offer"));
routes.use("/gallary", passport.checkAuth, require("./gallary"));

module.exports = routes;
