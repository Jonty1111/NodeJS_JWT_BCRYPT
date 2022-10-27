// need to install: npm install mongoose (npm i mongoose)
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

// Creating a Schema on type of data communicating to mongodb

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    hash_password:{type:String,required:true}
})

UserSchema.methods.comparePassword = function (pswd) {
    return bcrypt.compareSync(pswd,this.hash_password)
}


// var a =10;
// module.export = a -> can be used everywhere
module.exports = mongoose.model("users",UserSchema)