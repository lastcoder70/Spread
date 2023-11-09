const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const singnUp = new Schema({
Name:String,
email:{type:String,unqiue:true},
password:String




})
const registerdUser = new mongoose.model("Alluser", singnUp);
module.exports=registerdUser;