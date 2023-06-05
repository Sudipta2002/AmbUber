const { Patient } = require('../models/index');
const asyncHandler = require('express-async-handler');

const createPatientProfile = asyncHandler(async(req, res) => {
    try {
        const response = await Patient.create(req.body);
        return res.status(201).json({
            message: "Successfully created profile",
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
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
module.exports = { createPatientProfile, getPatientProfile, deletePatientProfile };