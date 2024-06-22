const mongoose = require ('mongoose');
const bcrypt = require("bcrypt");
const userData = new mongoose.Schema({
    Username:{
        type:String,
        // required:[true, "UserName is Required"]
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
    Useraddress:{
        type:String
    },

});

userData.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
});

userData.statics.login = async function (Useremail, Password) {
    const user = await this.findOne({ Useremail });
    if (user) {
      const auth = await bcrypt.compare(Password, user.Password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };

const userDB = mongoose.model("tablename",userData)
module.exports = userDB;