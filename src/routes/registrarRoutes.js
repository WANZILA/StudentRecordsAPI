/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const controller = require('../controller/registrarController');

// allocations
router.get('/courseunitallocations/', controller.getAll_CourseUnitAllocations);
router.get('/courseunitallocations/:allocationNum', controller.getSingle_CourseUnitAllocation);
router.get('/courseunitallocations/semesterdatecode/:semesterDateCode/coursecode/:courseCode/semesternum/:semesterNum', controller.getSemester_CourseUnitAllocation);
router.post('/courseunitallocations/add', controller.adds_CourseUnitAllocation);
router.patch('/courseunitallocations/:allocationNum', controller.updates_CourseUnitAllocation);
router.delete('/courseunitallocations/:allocationNum', controller.deletes_CourseUnitAllocation);

// enroll

// gets enrolled students from marks table 
router.get('/enrolls/semesterdatecode/:semesterDateCode/semesternum/:semesterNum/coursecode/:courseCode', controller.getAll_Enrolls);
// eslint-disable-next-line max-len
/* router.get('/enrolls/semesterdatecode/:semesterDateCode/coursecode/:courseCode', controller.getAll_Enrolls_SemDate_Course); */

// search for students to enroll
router.get('/enrolls/intakedate/:intakeDate/studyprogramme/:studyProgramme/coursecode/:courseCode', controller.getAll_Search_Student_Enroll);
router.get('/enrolls/:markNum', controller.getSingle_Enroll);
router.post('/enrolls/add', controller.adds_Enroll);
// router.patch('/enrolls/:markNum', controller.updates_Enroll);
router.delete('/enrolls/:markNum', controller.deletes_Enroll);

// marks
router.get('/marks/semesterdatecode/:semesterDateCode/courseunitcode/:courseUnitCode', controller.getAll_Marks);
router.get('/marks/:markNum', controller.getSingle_Mark);
router.post('/marks/add', controller.adds_Mark);
router.patch('/marks/:markNum', controller.updates_Mark);
router.delete('/marks/:markNum', controller.deletes_Mark);

module.exports = router;
