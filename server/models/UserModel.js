const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   email: {
    type: String,
    required: true,
    unique: true
   },
   password : {
    type: String,
    required: true,
   },
   role: {
    type: String,
    required: true,
    enum: ["admin","recruiter","jobseeker"],
    default: "jobseeker"
   },
   firstName : {
    type: String,
    required: true
   },
   lastName : {
    type: String,
    required: true
   },
//    createdBy : {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//     required: true
//    },
//    updatedBy : {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User'
//    }
}, { timestamps: true });

const User = new mongoose.model('User',userSchema);
module.exports = User;