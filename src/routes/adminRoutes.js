/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const adminController = require('../controller/adminController');

router.get('/', adminController.getAll);
router.get('/:adminId', adminController.getSingle);
router.post('/add', adminController.adds);
router.patch('/:adminId', adminController.updateOne);
router.delete('/:adminId', adminController.deletes);

module.exports = router;
