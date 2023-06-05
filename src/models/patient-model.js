const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    mobile: { type: String, require: true },
    address: { type: String, require: true },
}, { timestamps: true });

const PatientAuth = mongoose.model("PatientAuth", patientSchema);
module.exports = PatientAuth;