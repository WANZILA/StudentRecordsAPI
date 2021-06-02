/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const controller = require('../controller/structuresController');

// intakes
router.get('/intakes/', controller.getAll_Intakes);
router.get('/intakes/:intakeDate', controller.getSingle_Intake);
router.post('/intakes/add', controller.adds_Intake);
router.patch('/intakes/:intakeDate', controller.updates_Intake);
router.delete('/intakes/:intakeDate', controller.deletes_Intake);

module.exports = router;
