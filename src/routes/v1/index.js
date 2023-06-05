const express = require('express');
const { PatientController } = require('../../controllers/index');
const router = express.Router();

router.post('/patient', PatientController.createPatientProfile);
router.get('/patientlogin', PatientController.LoginPatient);
router.get('/patient', PatientController.getPatientProfile);
router.delete('/patient/:id', PatientController.deletePatientProfile);

module.exports = router;