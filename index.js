const express = require("express");
const port = 8001;
const path = require("path");
const db = require("./config/mongoose");
const Admin = require("./models/admin");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportlocal = require("./config/passport-local-strategy");

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "Userassets")));
app.use(express.urlencoded());

app.use(
  session({
    name: "Rnw",
    secret: "Rnw",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/user"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is working on port : ${port}`);
});
