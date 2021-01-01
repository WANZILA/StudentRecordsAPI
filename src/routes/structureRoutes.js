const express = require('express');
const structuresController = require('../controller/structuresController');

function structureRoutes() {
  const structureRouter = express.Router();
  const controller = structuresController;

  structureRouter.route('/semesterdates')
    .get(controller.getAllSemesterDates);

  structureRouter.route('/semesterdates/addSemesterDate')
    .post(controller.addSemesterDate);

  structureRouter.route('/semesterdates/:semesterDateCode')
    // .all() is a default router middleware fn
    .all(controller.getSingleSemester)
    .get((req, res) => {
      res.send(req.semester);
    })
    .patch(controller.semesterUpdate)
    .delete(controller.semesterDelete);

  // department
  structureRouter.route('/department')
    .get(controller.getAllDepartments);

  // add a department
  structureRouter.route('/department/addDepartment')
    .post(controller.addDepartment);
  // editing a single department
  structureRouter.route('/department/:departCode')
    .all(controller.getSingleDepartment)
    .get((req, res) => {
      res.send(req.departCode);
    })
    .patch(controller.updateDepartment)
    .delete(controller.deleteDepartment);

  // course
  structureRouter.route('/course')
    .get(controller.getAllCourses);
  // add a course
  structureRouter.route('/course/addCourse')
    .post(controller.addCourse);
  // editing a single course
  structureRouter.route('/course/:courseCode')
    .all(controller.getSingleCourse)
    .get((req, res) => {
      res.send(req.course);
    })
    .patch(controller.updateCourse)
    .delete(controller.deleteCourse);

  // courseUnits
  structureRouter.route('/courseUnit/:courseCode')
    .get(controller.getAllCourseUnits);
  // add a courseUnit
  structureRouter.route('/courseUnit/addCourseUnit')
    .post(controller.addCourseUnit);
  // editing a single courseUnit
  structureRouter.route('/courseUnit/:courseUnitCode')
    .all(controller.getSingleCourseUnit)
    .get((req, res) => {
      res.send(req.courseUnit);
    })
    .patch(controller.updateCourseUnit)
    .delete(controller.deleteCourseUnit);

  // Grade
  structureRouter.route('/grade')
    .get(controller.getAllGrades);
  // add a Grade
  structureRouter.route('/grade/addGrade')
    .post(controller.addGrade);
  // editing a single Grade
  structureRouter.route('/grade/:gradeCode')
    .all(controller.getSingleGrade)
    .get((req, res) => {
      res.send(req.grade);
    })
    .patch(controller.updateGrade)
    .delete(controller.deleteGrade);

  // Class Award 
  structureRouter.route('/classAward')
    .get(controller.getAllClassAwards);
  // add a Grade
  structureRouter.route('/classAward/addClassAward')
    .post(controller.addClassAward);
  // editing a single Grade
  structureRouter.route('/classAward/:classAwardCode')
    .all(controller.getSingleClassAward)
    .get((req, res) => {
      res.send(req.classaward);
    })
    .patch(controller.updateClassAward)
    .delete(controller.deleteClassAward);

  return structureRouter;
}

module.exports = structureRoutes;
