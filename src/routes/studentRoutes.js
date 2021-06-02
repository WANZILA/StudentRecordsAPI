/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const studentsController = require('../controller/studentsController2');

// Student Routes
// router.get('studentAPI/student/', studentsController.student_get_all);
// router.get('studentAPI/student/:studentId', studentsController.student_get_One);
// router.post('studentAPI/student/add', studentsController.student_post);
// router.delete('studentAPI/student/:studentId', studentsController.student_delete);
router.get('/', studentsController.student_get_all);
router.get('/:studentId', studentsController.student_get_One);
router.post('/add', studentsController.student_post);
// router.put('/update', studentsController.student_update);
// router.patch('/update/:studentId', studentsController.student_update);
router.patch('/:studentId', studentsController.student_update);
router.delete('/:studentId', studentsController.student_delete);

module.exports = router;
