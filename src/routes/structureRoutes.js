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

// semeterNames
router.get('/semesterNames/', controller.getAll_SemesterNames);
router.get('/semesterNames/:semesterNum', controller.getSingle_SemesterName);
router.post('/semesterNames/add', controller.adds_SemesterName);
router.patch('/semesterNames/:semesterNum', controller.updates_SemesterName);
router.delete('/semesterNames/:semesterNum', controller.deletes_SemesterName);

// semeterDates
router.get('/semesterDates/', controller.getAll_SemesterDates);
router.get('/semesterDates/:semesterDateCode', controller.getSingle_SemesterDates);
router.post('/semesterDates/add', controller.adds_SemesterDates);
router.patch('/semesterDates/:semesterDateCode', controller.updates_SemesterDates);
router.delete('/semesterDates/:semesterDateCode', controller.deletes_SemesterDates);

// Departments
router.get('/departments/', controller.getAll_Departments);
router.get('/departments/:departCode', controller.getSingle_Department);
router.post('/departments/add', controller.adds_Department);
router.patch('/departments/:departCode', controller.updates_Department);
router.delete('/departments/:departCode', controller.deletes_Department);

// course
router.get('/courses/', controller.getAll_Courses);
router.get('/courses/:courseCode', controller.getSingle_Course);
router.post('/courses/add', controller.adds_Course);
router.patch('/courses/:courseCode', controller.updates_Course);
router.delete('/courses/:courseCode', controller.deletes_Course);


// courseunit
router.get('/courseunits/', controller.getAll_CourseUnits);
router.get('/courseunits/:courseUnitCode', controller.getSingle_CourseUnit);
router.post('/courseunits/add', controller.adds_CourseUnit);
router.patch('/courseunits/:courseUnitCode', controller.updates_CourseUnit);
router.delete('/courseunits/:courseUnitCode', controller.deletes_CourseUnit);

// grade
router.get('/grades/', controller.getAll_Grades);
router.get('/grades/:gradeCode', controller.getSingle_Grade);
router.post('/grades/add', controller.adds_Grade);
router.patch('/grades/:gradeCode', controller.updates_Grade);
router.delete('/grades/:gradeCode', controller.deletes_Grade);

// Class Award
// router.get('/marks/', controller.getAll_Marks);
// router.get('/marks/:markNum', controller.getSingle_Mark);
// router.post('/marks/add', controller.adds_Mark);
// router.patch('/marks/:markNum', controller.updates_Mark);
// router.delete('/marks/:markNum', controller.deletes_Mark);

module.exports = router;
