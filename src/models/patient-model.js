const mongoose = require('mongoose');
const bcrypt = require('bcryptjs/dist/bcrypt');


const patientSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    mobile: { type: String, require: true },
    address: { type: String, require: true },
}, { timestamps: true });

patientSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
patientSchema.pre("save", async function(next) {
    if (!this.isModified) {
        next();
    }
    //encrypting password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
const PatientAuth = mongoose.model("PatientAuth", patientSchema);
module.exports = PatientAuth;