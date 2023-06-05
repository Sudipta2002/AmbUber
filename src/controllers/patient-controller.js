const { Patient } = require('../models/index');
const asyncHandler = require('express-async-handler');

const createPatientProfile = asyncHandler(async(req, res) => {
    const { name, email, password, pic, mobile, address } = req.body; //accepting data from front-end
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }
    const userExist = await Patient.findOne({ email }); //query my database whether it exists or not from  user model
    if (userExist) {
        res.status(400);
        throw new Error("User already Exists");
    }
    const user = await Patient.create({
        name,
        email,
        password,
        pic,
        mobile,
        address
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            // token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }
});
const LoginPatient = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await Patient.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            // token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});
const getPatientProfile = asyncHandler(async(req, res) => {
    try {
        const response = await Patient.findOne(req.body);
        return res.status(201).json({
            message: "Successfully fetched profile",
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
const deletePatientProfile = asyncHandler(async(req, res) => {
    try {
        const patientId = req.params.id;
        const response = await Patient.deleteOne({ patientId });
        return res.status(200).json({
            message: "Successfully deleted patient profile",
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
module.exports = { createPatientProfile, LoginPatient, getPatientProfile, deletePatientProfile };