const express = require('express');
const registrarController = require('../controller/registrarController');

function registrarRoutes() {
  const registrarRouter = express.Router();
  const controller = registrarController;

  // student apps  /intakedate/:intakeDate/appstatus/:appStatus'
  registrarRouter.route('/student/studentApp/intakedate/:intakeDate/appstatus/:appStatus')
    .get(controller.getAllStudentApplications);

  registrarRouter.route('/student/addApplicaton')
    .post(controller.saveStudentApplication);

  registrarRouter.route('/student/:studentAppId')
    .all(controller.getSingleStudentApp)
    .get((req, res) => {
      res.send(req.studentapps);
    })
    .patch(controller.updateStudentApp)
    .delete((controller.deleteStudentApp));

  // student admissions
  registrarRouter.route('/admission/:intakeDate')
    .get(controller.getAllStudentAdmissions);

  registrarRouter.route('/admissions/addAdmission')
    .post(controller.saveStudentAdmission);

  // registrarRouter.route('/admissions/:studentId')
  //   .all(controller.getSingleStudentAdmission)
  //   .get((req, res) => {
  //     res.send(req.studentapps);
  //   })
  //   .patch(controller.updateStudentAdmission)
  //   .delete((controller.deleteStudentAdmission));

  // courseunitallocations
  // /courseunitallocation/depart/:departCode/course/:courseCode/sem/:semesterDateCode
  registrarRouter.route('/courseunitallocation/course/:courseCode/sem/:semesterDateCode')
    .get(controller.getAllDepartCoursesSemDate);

  registrarRouter.route('/courseunitallocation/coursecode/:courseCode/sem/:semesterDateCode')
    .get(controller.getcourseUnitAllocations);

  registrarRouter.route('/courseunitallocation/addCourseUnitAllocation')
    .post(controller.postCourseUnitAllocation);

  registrarRouter.route('/courseunitallocation/sem/:semesterDateCode/courseunitcode/:courseUnitCode')
    .all(controller.getSingleCourseUnitAllocation)
    .get((req, res) => {
      res.send(req.courseunitallocation);
    })
    .patch(controller.updateCourseUnitAllocation)
    .delete((controller.deleteCourseUnitAllocation));


  // Enroll Students 
  registrarRouter.route('/enrollstudent/course/:courseCode/sem/:semesterDateCode')
    .get(controller.getAllEnrolledStudents);

  registrarRouter.route('/enrollstudent/addEnrollStudent')
    .post(controller.postEnrollStudent);

  registrarRouter.route('/enrollstudent/studentid/:studentId/course/:courseCode/sem/:semesterDateCode')
    .all(controller.getSingleEnrolledStudent)
    .get((req, res) => {
      res.send(req.enrolledstudent);
    })
    .patch(controller.updateEnrolledStudent)
    .delete((controller.deleteEnrolledStudent));

  // Unenrolled students
  registrarRouter.route('/unenrolledstudent/course/:courseCode/sem/:semesterDateCode')
    .get(controller.getAllUnEnrolledStudents);


  // Marks
  registrarRouter.route('/marks/coursecode/:courseCode/courseunit/:courseUnitCode/sem/:semesterDateCode')
    .get(controller.getMarks);

  registrarRouter.route('/marks/studentid/:studentId/course/:courseCode/sem/:semesterDateCode')
    .all(controller.getSingleStudentMark)
    .get((req, res) => {
      res.send(req.studentMark);
    });

  // eslint-disable-next-line quotes
  registrarRouter.route(`/marks/studentid/:studentId/coursecode/:courseCode/courseunit/:courseUnitCode/sem/:semesterDateCode/midexam/:midExam/coursework/:courseWork/finalexam/:finalExam/totalmark/:totalMark/gradecode/:gradeCode`)
    .patch(controller.updateStudentMark);

  // nb no deleting of student marks
  // using patch to act as if deleting the student marks

  // registrarRouter.route('/marks/studentid/:studentId/course/:courseCode/courseunit/:courseUnitCode/sem/:semesterDateCode')
  //   .patch((controller.deleteStudentMark));

  return registrarRouter;
}
module.exports = registrarRoutes;
