const debug = require('debug')('app: reportsConroller');
const db = require('../../db');

function routerController() {
  // /student/intakedate/:intakeDate/studentstatus/:studentStatus
  function getAllStudents(req, res) {
    const intake = req.params.intakeDate;
    const intakedate = escape(intake);
    const studentstatus = req.params.studentStatus;

    const sql = `SELECT studentId, title, fname, mname, lname
                FROM   students 
                WHERE  intakeDate = ? && studentStatus= ? `;
    db.query(sql,
      [`${intakedate}`, `${studentstatus}`],
      (err, result) => {
        if (err) { res.send(err); }
        // debug(intakedate);
        // debug(appstatus);
        return res.send(result);
      });
  }

  function getAllStudentExamCards(req, res) {
    const coursecode = req.params.courseCode;
    // const intakedate = escape(intake);

    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);

    const sql = `SELECT distinct stu.fname, stu.lname, mks.studentId, mks.coursecode,
                    mks.courseUnitCode, mks.semesterDateCode
                FROM marks mks, students stu, courses c, courseUnits cu
                WHERE stu.studentId = mks.studentId
                  && cu.courseCode = stu.courseCode
                  && cu.courseCode = ? 
                  && mks.semesterDateCode =?
                ORDER BY mks.studentId, mks.courseUnitCode`;

    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        // debug(intakedate);
        // debug(appstatus);
        return res.send(result);
      });
  }

  function getSingleStudentExamCard(req, res) {
    const stud = req.params.studentId;
    const studentid = decodeURIComponent(stud);
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);

    const sql = `SELECT distinct stu.fname, stu.lname, mks.studentId, mks.coursecode,
                    mks.courseUnitCode, mks.semesterDateCode
                FROM marks mks, students stu, courses c, courseUnits cu
                WHERE stu.studentId = mks.studentId
                  && cu.courseCode = stu.courseCode
                  && mks.studentId = ?
                  && cu.courseCode = ? 
                  && mks.semesterDateCode =?
                ORDER BY mks.studentId, mks.courseUnitCode`;

    db.query(sql,
      [`${studentid}`, `${coursecode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function getCourseAttendance(req, res) {
    const coursecode = req.params.courseCode;
    const courseunitcode = req.params.courseUnitCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT distinct mks.studentId, stu.fname, stu.lname,cu.courseUnitName
                FROM marks mks, students stu, courses c, courseUnits cu
                WHERE stu.studentId = mks.studentId
                    && cu.courseCode = stu.courseCode
                    && mks.courseUnitCode = cu.courseUnitCode
                    && mks.courseCode = ? 
                    && mks.courseUnitCode = ?                   
                    && mks.semesterDateCode = ?
                ORDER BY mks.studentId, mks.courseUnitCode;`;
    db.query(sql,
      [`${coursecode}`, `${courseunitcode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(coursecode, courseunitcode, semesterdatecode);
        return res.send(result);
      });
  }

  function getCourseAttendanceBothCourseCodes(req, res) {
    const coursecode = req.params.courseCode;
    const coursecode2 = req.params.courseCode2;
    const courseunitcode = req.params.courseUnitCode;
    const courseunitcode2 = req.params.courseUnitCode2;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT distinct mks.studentId, stu.fname, stu.lname,cu.courseUnitName
                  FROM marks mks, students stu, courses c, courseUnits cu
                  WHERE stu.studentId = mks.studentId
                      && cu.courseCode = stu.courseCode
                      && mks.courseUnitCode = cu.courseUnitCode
                      && (mks.courseCode = 'DBT' OR mks.courseCode = 'CCM')
                      && (mks.courseUnitCode = 'DBT1101' OR mks.courseUnitCode = 'CCM1101')
                      && mks.semesterDateCode = '2018/08/06/1/ful/1'
                  ORDER BY mks.courseCode, mks.studentId, mks.courseUnitCode;`;
    db.query(sql,
      [`${coursecode}`, `${coursecode2}`, `${courseunitcode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(coursecode, courseunitcode, semesterdatecode);
        return res.send(result);
      });
  }

  function getCourseUnitReport(req, res) {
    const coursecode = req.params.courseCode;
    const courseunitcode = req.params.courseUnitCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT distinct mks.studentId, stu.fname, stu.lname,cu.courseUnitName,
                      mks.courseUnitCode, mks.semesterDateCode,
                      mks.midExam, mks.courseWork, mks.finalExam, mks.totalmark,
                      mks.gradeCode
                FROM marks mks, students stu, courses c, courseUnits cu
                WHERE stu.studentId = mks.studentId
                    && cu.courseCode = stu.courseCode
                    && mks.courseUnitCode = cu.courseUnitCode
                    && mks.courseCode = ?
                    && mks.courseUnitCode = ?                 
                    && mks.semesterDateCode = ?
                ORDER BY mks.studentId, mks.courseUnitCode;`;
    db.query(sql,
      [`${coursecode}`, `${courseunitcode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(coursecode, courseunitcode, semesterdatecode);
        return res.send(result);
      });
  }

  function getSingleStudentCourseUnitReports(req, res) {
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT distinct mks.studentId, stu.fname, stu.lname,cu.courseUnitName,
                      mks.courseUnitCode, mks.semesterDateCode,
                      mks.midExam, mks.courseWork, mks.finalExam, mks.totalmark,
                      mks.gradeCode
                FROM marks mks, students stu, courses c, courseUnits cu
                WHERE stu.studentId = mks.studentId
                    && cu.courseCode = stu.courseCode
                    && mks.courseCode = ?   
                    && mks.semesterDateCode = ?
                ORDER BY mks.studentId, mks.courseUnitCode;`;
    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(coursecode, semesterdatecode);
        return res.send(result);
      });
  }

  // course report
  // '/coursereport/coursecode/:courseCode/semesterdatecode/:semesterDateCode')
  function getAllStudentCourseReports(req, res) {
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT distinct mks.studentId, stu.fname, stu.lname, mks.semesterDateCode
                FROM marks mks, students stu, courses c, courseUnits cu
                WHERE stu.studentId = mks.studentId
                    && cu.courseCode = stu.courseCode
                    && mks.courseCode = ?   
                    && mks.semesterDateCode = ?
                ORDER BY mks.studentId, mks.courseUnitCode;`;
    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(coursecode, semesterdatecode);
        return res.send(result);
      });
  }

  // coursereport/coursecode/:courseCode/coursecode2/:courseCode2/semesterdatecode/:semesterDateCode
  function getAllStudentCourseReportsBothProgrammes(req, res) {
    const coursecode = req.params.courseCode;
    const coursecode2 = req.params.courseCode2;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT distinct mks.studentId, stu.fname, stu.lname, mks.semesterDateCode
                FROM marks mks, students stu, courses c
                WHERE stu.studentId = mks.studentId
                    && (mks.courseCode = ?  OR  mks.courseCode = ? )
                    && mks.semesterDateCode = ?
                ORDER BY mks.courseCode, mks.studentId`;
    db.query(sql,
      [`${coursecode}`, `${coursecode2}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(coursecode, semesterdatecode);
        return res.send(result);
      });
  }

  // semester report
  // getAllSemesterStudentReports
  function getAllSemesterStudentReports(req, res) {
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT distinct stu.fname, stu.lname, mks.studentId, mks.coursecode,
                    mks.semesterDateCode
                FROM marks mks, students stu, courses c
                WHERE stu.studentId = mks.studentId
                  && c.courseCode = c.courseCode
                  && mks.semesterDateCode = ?
                ORDER BY mks.coursecode, mks.studentId`;
    db.query(sql,
      [`${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(semesterdatecode);
        return res.send(result);
      });
  }


  function getStudentAllSemestersReports(req, res) {
    const coursecode = req.params.courseCode;
    const stud = req.params.studentId;
    const studentid = decodeURIComponent(stud);
    const sql = `SELECT DISTINCT mks.studentId, stu.fname, stu.lname,cu.courseUnitName,
                    mks.courseUnitCode, mks.semesterDateCode,
                    mks.midExam, mks.courseWork, mks.finalExam, mks.totalmark,
                    mks.gradeCode
                FROM marks mks, students stu, courses c, courseUnits cu
                WHERE stu.studentId = mks.studentId
                  && mks.courseUnitcode = cu.courseUnitCode
                && mks.courseCode = stu.courseCode
                  && mks.courseCode = ?   
                  && mks.studentId = ?
                ORDER BY mks.courseUnitCode`;
    db.query(sql,
      [`${coursecode}`, `${studentid}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(coursecode, studentid);
        return res.send(result);
      });
  }

  return {
    getAllStudents,

    // examination cards
    getAllStudentExamCards,
    getSingleStudentExamCard,

    //  course attendance 
    getCourseAttendance,
    getCourseAttendanceBothCourseCodes,

    // course unit report 
    getCourseUnitReport,
    getSingleStudentCourseUnitReports,

    // course report
    getAllStudentCourseReports,
    getAllStudentCourseReportsBothProgrammes,

    // semester report 
    getAllSemesterStudentReports,
    getStudentAllSemestersReports
  };
}
module.exports = routerController();