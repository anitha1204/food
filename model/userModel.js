const mongoose = require ('mongoose');
const userData = new mongoose.Schema({
    Username:{
        type:String,
    },
    Useremail:{
        type:String,
        required: [true, "Email is Required"],
        unique: true,
    },
    Password:{
        type:String,
        required:[true, "Password is Required"]
    },
    Useraddress:String

});

const userDB = mongoose.model("tablename",userData)
module.exports = userDB;