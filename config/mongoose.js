const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/AdminPanel');

const db = mongoose.connection;

db.once('open', function (err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("dataBase is Connected");
})

module.exports = db;