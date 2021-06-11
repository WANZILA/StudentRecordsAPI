/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const controller = require('../controller/registrarController');

router.get('/marks/', controller.getAll_Marks);
router.get('/marks/:markNum', controller.getSingle_Mark);
router.post('/marks/add', controller.adds_Mark);
router.patch('/marks/:markNum', controller.updates_Mark);
router.delete('/marks/:markNum', controller.deletes_Mark);

module.exports = router;
