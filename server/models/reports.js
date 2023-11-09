const mongoose = require("mongoose");
const users=require("./user");
const { object } = require("webidl-conversions");
const Schema = mongoose.Schema;
const reportSchema = new Schema({
  "reporterId": Object,
  areaName: String,
  pincode: Number,
  reportedDate: Date,
  title: String,
  catogery:String,
  description: String,
  image: [],
  cordinates: { longitude: String, latitude: String },
  status: String,
  assigned_to: {
    name: String,
    id: String,
    date: Date,
  },
  adminComment:String,
  ticketNo:String,
  

});
const report= new mongoose.model("reportDB", reportSchema);
module.exports=report;
