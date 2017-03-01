// 連接MongoDB
var dbObj = {};
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/teaTime");
db.connection.on("error", function(error) {
    console.log("connect mongodb error, error message:" + error);
});

db.connection.on("open", function() {
    console.log("connect mongodb success");
});

// 新增資料
var UserSchema = new mongoose.Schema({
    name: {type:String},
    age: {type:Number, default:0},
    email: {type:String},
    time: {type:Date, default:Date.now()}
});

var userModel = db.model("user", UserSchema);
dbObj.userModel = userModel;

module.exports = dbObj;

