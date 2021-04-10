// const SqlString = require('mysql/lib/protocol/SqlString');
const debug = require('debug')('app:structuresController');
const db = require('../../db');

function structuresController() {
  /* **** branches  */
  function getAllBranches(req, res) {
    const sql = 'SELECT * FROM branches';

    db.query(sql,
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  /************ intakes **/

  function getAllIntakes(req, res) {
    // const sql = `SELECT intakeDate, YEAR(intakeDate) AS Year, MONTHName(intakeDate) as Month,
    // intakeName, updateTimestamp 
    // FROM intakes 
    // intake ORDER BY intakeDate DESC`;

    const sql = `SELECT intakeDate, intakeName FROM intakes
                ORDER BY intakeDate DESC`;
    db.query(sql,
      (err, result) => {
        if (err) { res.send(err); }
        // debug(result);
        return res.send(result);
      });
  }

  function getAllSemesterDates(req, res) {
    const sql = 'SELECT * FROM  semesterdates ORDER BY startDate DESC';
    db.query(sql,
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function addSemesterDate(req, res) {
    const sql = `INSERT INTO semesterDates(
      semesterDateCode, 
      semesterDateName,
      startDate,
      endDate, 
      intakeDate,
      branchNum ,
      studyProgramme,
      semesterNum
      ) VALUES (?)`;
    const intakedates = req.body.intakeDate;

    // rs on replacing all the '-' characters in a string
    // replace('-', '/') only replaces the first occurrency
    const intake = intakedates.replace('-', '/');
    const intakeFinal = intake.replace('-', '/');
    // eslint-disable-next-line max-len
    const sem = `${intakeFinal}/${req.body.branchNum}/${req.body.studyProgramme}/${req.body.semesterNum}`;
    const semesterDateCode = sem;
    debug(sem);
    const values = [
      semesterDateCode,
      req.body.semesterDateName,
      req.body.startDate,
      req.body.endDate,
      req.body.intakeDate,
      req.body.branchNum,
      req.body.studyProgramme,
      req.body.semesterNum
    ];

    db.query(sql,
      [values],
      (err, result) => {
        if (err) { res.send(err); }
        debug(result);
        return res.send(result);
      });
  }

  function getSingleSemester(req, res, next) {
    const sem = req.params.semesterDateCode;
    const semester = decodeURIComponent(sem);
    debug(semester);
    const sql = 'SELECT * FROM semesterdates WHERE semesterDateCode LIKE "(?)"';
    // `${studentId}`
    db.query(sql,
      [`${semester}`],
      (err, result) => {
        if (err) { return res.send(err); }
        // debug(result);
        req.semester = result;
        return next();
      });
  }

  function semesterUpdate(req, res) {
    const sem = req.params.semesterDateCode;
    const semester = decodeURIComponent(sem);
    const sql = `UPDATE semesterDates SET
        semesterDateName = '${req.body.semesterDateName}',
        startDate = '${req.body.startDate}',
        endDate = '${req.body.endDate}',
        intakeDate = '${req.body.intakeDate}',
        branchNum = '${req.body.branchNum}',
        studyProgramme = '${req.body.studyProgramme}',
        semesterNum = '${req.body.semesterNum}'
        WHERE semesterDateCode = ?`;
    debug(req.semester);
    db.query(sql,
      [`${semester}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function semesterDelete(req, res) {
    const sem = req.params.semesterDateCode;
    const semester = decodeURIComponent(sem);

    const sql = 'DELETE  FROM semesterDates WHERE semesterDateCode =?';

    db.query(sql,
      [`${semester}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(`${result} has been deleted`);
      });
  }

  // department controllers
  function queryErr(err, res) {
    if (err) { res.send(err); }
  }

  function getAllDepartments(req, res) {
    const sql = 'SELECT * FROM departments';

    db.query(sql,
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }
  // adding a department
  function addDepartment(req, res) {
    const sql = `INSERT INTO departments(
      departCode,
      departName,
      description
      ) VALUES (?)`;
    // rs on extracting only a string 
    // let departCode = ``; 
    // stri.toUpperCase

    const values = [
      req.body.departCode,
      req.body.departName,
      req.body.description
    ];

    db.query(sql,
      [values],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function getSingleDepartment(req, res, next) {
    const departcode = req.params.departCode;
    const sql = 'SELECT * FROM departments WHERE departCode = ?';

    db.query(sql,
      [`${departcode}`],
      (err, result) => {
        queryErr(err, res);
        req.departcode = result;
        return next();
      });
  }

  function updateDepartment(req, res) {
    const departcode = req.params.departCode;
    const sql = `UPDATE departments SET 
    departName = '${req.body.departName}',
    description = '${req.body.description}'
    WHERE departCode = ?`;
    // debug(req.departCode);
    db.query(sql,
      [`${departcode}`],
      (err, result) => {
        queryErr(err, res);
        debug(req.departcode);
        return res.send(result);
      });
  }

  function deleteDepartment(req, res) {
    const departcode = req.params.departCode;
    const sql = 'DELETE FROM departments WHERE departCode = ?';

    db.query(sql,
      [`${departcode}`],
      (err, result) => {
        queryErr(err, res);
        return res.send(`${req.body.departName} has been deleted`);
      });
  }

  // course
  function getAllCourses(req, res) {
    const sql = `select departCode, courseCode, courseName FROM courses
                ORDER BY departCode DESC`;

    db.query(sql,
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }
  function addCourse(req, res) {
    const sql = `INSERT INTO courses( courseCode,
                  courseName,
                  description ,
                  departCode
                  ) VALUES(?)`;
    // rs on geting only initials of words for courseCode
    const values = [
      req.body.courseCode,
      req.body.courseName,
      req.body.description,
      req.body.departCode
    ];

    db.query(sql,
      [values],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function getSingleCourse(req, res, next) {
    const coursecode = req.params.courseCode;
    const sql = `select departCode, courseCode, courseName FROM courses
                 WHERE courseCode = ?`;
    db.query(sql,
      [`${coursecode}`],
      (err, result) => {
        queryErr(err, res);
        req.course = result;
        return next();
      });
  }

  function updateCourse(req, res) {
    const coursecode = req.params.courseCode;
    const sql = `UPDATE  courses SET 
                  courseName = '${req.body.courseName}',
                  description= '${req.body.description}',
                  departCode = '${req.body.departCode}'
                  WHERE courseCode = ?`;
    db.query(sql,
      [`${coursecode}`],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function deleteCourse(req, res) {
    const coursecode = req.params.courseCode;
    const sql = 'DELETE FROM courses WHERE courseCode = ?';
    db.query(sql,
      [coursecode],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  // courseUnits
  function getAllCourseUnits(req, res) {
    const coursecode = req.params.courseCode;
    const sql = `SELECT 
                      courseCode,
                      semesterNum,
                      courseUnitCode, 
                      courseUnitName, 
                      creditHours
                  FROM courseunits
                  WHERE courseCode = ?
                  ORDER BY courseCode, semesterNum  DESC`;

    db.query(sql,
      [`${coursecode}`],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }
  function addCourseUnit(req, res) {
    const sql = `INSERT INTO courseunits (
                  courseUnitCode, 
                  courseUnitName, 
                  description, 
                  creditHours, 
                  courseCode,
                  coursework ,
		              midExam ,
		              finalExam , 
                  semesterNum, 
                  adminId)  VALUES(?)`;
    // rs on geting only initials of words for courseCode
    const values = [
      req.body.courseUnitCode,
      req.body.courseUnitName,
      req.body.description,
      req.body.creditHours,
      req.body.courseCode,
      req.body.coursework,
      req.body.midExam,
      req.body.finalExam,
      req.body.semesterNum,
      req.body.adminId
    ];

    db.query(sql,
      [values],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function getSingleCourseUnit(req, res, next) {
    const coursecodeunit = req.params.courseCodeUnit;
    const sql = `SELECT 
                      courseCode,
                      semesterNum,
                      courseUnitCode, 
                      courseUnitName, 
                      coursework ,
                      midExam ,
                      finalExam ,
                      creditHours
                  FROM courseunits 
                  WHERE courseUnitCode = ?`;
    db.query(sql,
      [`${coursecodeunit}`],
      (err, result) => {
        queryErr(err, res);
        req.course = result;
        return next();
      });
  }

  function updateCourseUnit(req, res) {
    const courseunitcode = req.params.courseUnitCode;
    const sql = `UPDATE  courseunits SET 
                          courseCode ='${req.body.courseCode}',
                          coursework ='${req.body.coursework}',
                          midExam ='${req.body.midExam}',
                          finalExam ='${req.body.finalExam}',
                          semesterNum ='${req.body.semesterNum}',
                          courseUnitName ='${req.body.courseUnitName}', 
                          creditHours ='${req.body.creditHours}'
                  WHERE courseUnitCode = ?`;
    db.query(sql,
      [`${courseunitcode}`],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function deleteCourseUnit(req, res) {
    const courseunitcode = req.params.courseUnitCode;
    const sql = 'DELETE FROM courseunits WHERE courseUnitCode = ?';
    db.query(sql,
      [courseunitcode],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  // grades
  function getAllGrades(req, res) {
    const sql = 'SELECT * FROM grades ORDER BY gradeCode';

    db.query(sql,
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }
  function addGrade(req, res) {
    const sql = `INSERT INTO grades(
                  gradeCode,
                  gradeRange,
                  gradeScore,
                  adminId
                  ) VALUES (?)`;
    // rs on geting only initials of words for courseCode
    const values = [
      req.body.gradeCode,
      req.body.gradeRange,
      req.body.gradeScore,
      req.body.adminId
    ];

    db.query(sql,
      [values],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function getSingleGrade(req, res, next) {
    const gradecode = req.params.gradeCode;
    const sql = 'SELECT * FROM grades  WHERE gradeCode = ?';
    db.query(sql,
      [`${gradecode}`],
      (err, result) => {
        queryErr(err, res);
        req.grade = result;
        return next();
      });
  }

  function updateGrade(req, res) {
    const gradecode = req.params.gradeCode;
    const sql = `UPDATE grades SET
                    gradeCode ='${req.body.gradeCode}',
                    gradeScore = '${req.body.gradeScore}',
                    adminId = '${req.body.adminId}'
                  WHERE gradeCode = ?`;
    db.query(sql,
      [`${gradecode}`],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function deleteGrade(req, res) {
    const gradecode = req.params.gradeCode;
    const sql = 'DELETE FROM  grades WHERE gradeCode = ?';
    db.query(sql,
      [gradecode],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  // grades
  function getAllClassAwards(req, res) {
    const sql = 'SELECT  * FROM  classawards';

    db.query(sql,
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }
  function addClassAward(req, res) {
    const sql = `INSERT INTO classawards(
                  classAwardCode,
                  className,
                  classScore,
                  adminId
                  )VALUES (?)`;
    // rs on geting only initials of words for courseCode
    const values = [
      req.body.classAwardCode,
      req.body.className,
      req.body.classScore,
      req.body.adminId
    ];

    db.query(sql,
      [values],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function getSingleClassAward(req, res, next) {
    const classawardcode = req.params.classAwardCode;
    const sql = 'SELECT * FROM  classawards WHERE classAwardCode = ?';
    db.query(sql,
      [`${classawardcode}`],
      (err, result) => {
        queryErr(err, res);
        req.classaward = result;
        return next();
      });
  }

  function updateClassAward(req, res) {
    const classawardcode = req.params.classAwardCode;
    const sql = `UPDATE classawards SET
                  classAwardCode = '${req.body.classAwardCode}',
                  className = '${req.body.className}',
                  classScore = '${req.body.classScore}',
                  adminId = '${req.body.adminId}'
                  WHERE classAwardCode = ?`;
    db.query(sql,
      [`${classawardcode}`],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  function deleteClassAward(req, res) {
    const classawardcode = req.params.classAwardCode;
    const sql = 'DELETE FROM  classawards WHERE classAwardCode = ?';
    db.query(sql,
      [classawardcode],
      (err, result) => {
        queryErr(err, res);
        return res.send(result);
      });
  }

  return {
    // branches
    getAllBranches,

    // intakes
    getAllIntakes,

    // working on semesters
    getAllSemesterDates,
    addSemesterDate,
    getSingleSemester,
    semesterUpdate,
    semesterDelete,

    // Department
    getAllDepartments,
    addDepartment,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,

    // course
    getAllCourses,
    addCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,

    // courseUnits
    getAllCourseUnits,
    addCourseUnit,
    getSingleCourseUnit,
    updateCourseUnit,
    deleteCourseUnit,

    // grade
    getAllGrades,
    addGrade,
    getSingleGrade,
    updateGrade,
    deleteGrade,

    // class Award
    getAllClassAwards,
    addClassAward,
    getSingleClassAward,
    updateClassAward,
    deleteClassAward


  };
}

module.exports = structuresController();
