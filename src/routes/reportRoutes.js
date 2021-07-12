const express = require('express');
const reportController = require('../controller/reportsController');

function reportRoutes() {
  const reportRouter = express.Router();
  const controller = reportController;

  // intakeDate = '2018-08-06' && studentStatus='active';
  reportRouter.route('/student/intakedate/:intakeDate/studentstatus/:studentStatus')
    .get(controller.getAllStudents);

  // examination cards
  reportRouter.route('/exams/coursecode/:courseCode/semesterdatecode/:semesterDateCode')
    .get(controller.getAllStudentExamCards);
  // for a single student 
  reportRouter.route('/exams/studentid/:studentId/coursecode/:courseCode/semesterdatecode/:semesterDateCode')
    .get(controller.getSingleStudentExamCard);

  // attendance sheet  getCourseAttendanceBothCourseCodes
  reportRouter.route('/courseattendance/coursecode/:courseCode/courseunitcode/:courseUnitCode/semesterdatecode/:semesterDateCode')
    .get(controller.getCourseAttendance);
  reportRouter.route('/courseattendance/coursecode/:courseCode/coursecode2/:courseCode2/courseunitcode/:courseUnitCode/courseunitcode2/:courseUnitCode2/semesterdatecode/:semesterDateCode')
    .get(controller.getCourseAttendanceBothCourseCodes);

  // Course Unit Report
  reportRouter.route('/courseunitreport/coursecode/:courseCode/courseunitcode/:courseUnitCode/semesterdatecode/:semesterDateCode')
    .get(controller.getCourseUnitReport);
  // single student
  reportRouter.route('/courseunitreport/studentid/:studentId/coursecode/:courseCode/semesterdatecode/:semesterDateCode')
    .get(controller.getSingleStudentCourseUnitReports);

  // Course Report
  reportRouter.route('/coursereport/coursecode/:courseCode/semesterdatecode/:semesterDateCode')
    .get(controller.getAllStudentCourseReports);
  // for both certificate and diploma programme
  reportRouter.route('/coursereport/coursecode/:courseCode/coursecode2/:courseCode2/semesterdatecode/:semesterDateCode')
    .get(controller.getAllStudentCourseReportsBothProgrammes);


  // semester Report
  reportRouter.route('/semesterreport/semesterdatecode/:semesterDateCode')
    .get(controller.getAllSemesterStudentReports);
  // student all semester results
  reportRouter.route('/studentallsemestersreport/studentid/:studentId/coursecode/:courseCode')
    .get(controller.getStudentAllSemestersReports);

  return reportRouter;
}
module.exports = reportRoutes;