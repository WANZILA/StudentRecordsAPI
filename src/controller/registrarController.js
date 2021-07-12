/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const debug = require('debug')('app:registrarController');
const db = require('../../db');

// courseunit allocations
exports.getAll_CourseUnitAllocations = function getAll_CourseUnitAllocations(req, res) {
  const sql = `SELECT 
                    allocationNum,
                    semesterDateCode,
                    semesterNum,
                    courseCode,
                    courseUnitCode,
                    intakeDate,
                    adminId,
                    notes
                FROM courseunitallocations 
                ORDER BY allocationNum DESC`;

  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_CourseUnitAllocation = function getSingle_CourseUnitAllocation(req, res) {
  const idFinal = req.params.allocationNum;
  debug(idFinal);

  // eslint-disable-next-line quotes
  const sql = `SELECT 
                    allocationNum,
                    semesterDateCode,
                    semesterNum,
                    courseCode,
                    courseUnitCode,
                    intakeDate,
                    adminId,
                    notes
                FROM courseunitallocations 
                WHERE allocationNum = ?`;
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.getSemester_CourseUnitAllocation = function getSemester_CourseUnitAllocation(req, res) {
  // semesterdatecode/:semesterdatecode/coursecode/:coursecode/semesternum/:semesternum
  const semesterDateCode = req.params.semesterDateCode;
  const courseCode = req.params.courseCode;
  const semesterNum = req.params.semesterNum;
  debug(semesterDateCode, courseCode, semesterNum);
  // eslint-disable-next-line quotes
  const sql = `SELECT distinct
                    allocationNum,
                    semesterDateCode,
                    semesterNum,
                    courseCode,
                    courseUnitCode,
                    intakeDate,
                    adminId,
                    notes
                FROM courseunitallocations 
                WHERE  semesterDateCode = ? && courseCode = ?  && semesterNum = ?`;
  db.query(sql,
    [`${semesterDateCode}`, `${courseCode}`, `${semesterNum}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};
exports.adds_CourseUnitAllocation = function adds_CourseUnitAllocation(req, res) {
  const sql = `INSERT INTO courseunitallocations(
                  allocationNum,
                  semesterDateCode,
                  semesterNum,
                  courseCode,
                  courseUnitCode,
                  adminId,
                  intakeDate,
                  notes
                ) VALUES (?)`;
  // rs on geting only initials of words for courseCode
  const values = [
    req.body.allocationNum,
    req.body.semesterDateCode,
    req.body.semesterNum,
    req.body.courseCode,
    req.body.courseUnitCode,
    req.body.adminId,
    req.body.intakeDate,
    req.body.notes
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_CourseUnitAllocation = function updates_CourseUnitAllocation(req, res) {
  const id = req.params.allocationNum;
  const idFinal = id;
  // console.log(idFinal);

  const sql = `UPDATE  courseunitallocations SET ?
               WHERE allocationNum = ? `;
  const updates = {
    allocationNum: req.body.allocationNum,
    semesterDateCode: req.body.semesterDateCode,
    semesterNum: req.body.semesterNum,
    courseCode: req.body.courseCode,
    courseUnitCode: req.body.courseUnitCode,
    intakeDate: req.body.intakeDate,
    notes: req.body.notes
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      return res.send(result);
    });
};

exports.deletes_CourseUnitAllocation = function deletes_CourseUnitAllocation(req, res) {
  const id = req.params.allocationNum;
  const idFinal = id;

  const sql = 'DELETE FROM courseunitallocations WHERE allocationNum = ?';
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      return res.send(result);

      // res.send(`${idFinal} deleted`);
    });
};

// enrolls
exports.getAll_Enrolls = function getAll_Enrolls(req, res) {
  const coursecode = req.params.courseCode;
  const sem = req.params.semesterDateCode;
  const semNum = req.params.semesterNum;

  // COUNT(mks.studentId) AS num

  const sql = `SELECT semEnroll.semRegNum, semEnroll.courseCode, semEnroll.semesterDateCode, stu.fname, stu.lname, semEnroll.studentId   
               FROM semesterEnrolledStudents semEnroll, students stu, semesterDates semDates,courses c, semesters sem
               WHERE  semEnroll.studentId = stu.studentId 
                && semEnroll.semesterDateCode = semDates.semesterDateCode
                && semEnroll.coursecode = c.coursecode
                && semEnroll.semesterNum = sem.semesterNum
                && semEnroll.coursecode = ? 
                && semEnroll.semesterDateCode = ?
                && semEnroll.semesterNum = ?
              ORDER BY studentId `;
  /*
  GROUP BY mks.markNum
  HAVING  COUNT(mks.markNum) > 1
  */

  db.query(sql,
    [`${coursecode}`, `${sem}`, `${semNum}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      return res.send(result);
    });
};

// exports.getAll_Enrolls_SemDate_Course = function getAll_Enrolls_SemDate_Course(req, res) {
//   const coursecode = req.params.courseCode;
//   const sem = req.params.semesterDateCode;

//   const sql = `SELECT distinct mks.courseCode, mks.semesterDateCode, stu.fname, stu.lname, mks.studentId
//                FROM marks mks, students stu
//                WHERE  mks.studentId = stu.studentId 
//                 && mks.coursecode = ? 
//                 && mks.semesterDateCode = ?`;

//   db.query(sql,
//     [`${coursecode}`, `${sem}`],
//     (err, result) => {
//       if (err) { res.send(err); }
//       // debug(result);
//       return res.send(result);
//     });
// };

exports.getSingle_Enroll = function getSingle_Enroll(req, res) {
  const semRegNum = req.params.semRegNum;

  const sql = `SELECT semEnroll.courseCode, semEnroll.semesterDateCode, stu.fname, stu.lname, mks.studentId
               FROM semesterEnrolledStudents semEnroll, students stu
               WHERE  semEnroll.studentId = stu.studentId 
               && semEnroll.semRegNum = ? `;

  db.query(sql,
    [`${semRegNum}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.adds_Enroll = function adds_Enroll(req, res) {
  const sql = `INSERT INTO semesterEnrolledStudents(
  semesterDateCode,
  semesterNum,
  courseCode,
  studentId    
  ) VALUES (?)`;
  // rs on geting only initials of words for courseCode
  const values = [
    req.body.semesterDateCode,
    req.body.semesterNum,
    req.body.courseCode,
    req.body.studentId
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

// exports.updates_Enroll = function updates_Enroll(req, res) {
//   const id = req.params.markNum;
//   const idFinal = id;
//   // console.log(idFinal);

//   const sql = `UPDATE  marks SET ?
//              WHERE markNum = ? `;
//   const updates = {
//     markNum: req.body.markNum,
//     semesterDateCode: req.body.semesterDateCode,
//     courseCode: req.body.courseCode,
//     courseUnitCode: req.body.courseUnitCode,
//     studentId: req.body.studentId,
//     coursework: req.body.coursework,
//     midExam: req.body.midExam,
//     finalExam: req.body.finalExam,
//     totalMark: req.body.totalMark,
//     gradeCode: req.body.gradeCode
//   };

//   db.query(sql,
//     [updates, `${idFinal}`],
//     (err, result) => {
//       if (err) { res.send(err); }
//       debug(result);
//       return res.send(result);
//     });
// };

exports.deletes_Enroll = function deletes_Enroll(req, res) {
  const id = req.params.markNum;
  const idFinal = id;

  const sql = 'DELETE FROM marks WHERE markNum = ?';
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      return res.send(result);

      // res.send(`${idFinal} deleted`);
    });
};

// used to search for  students to enroll
exports.getAll_Search_Student_Enroll = function getAll_Search_Student_Enroll(req, res) {
  const intakedate = req.params.intakeDate;
  const coursecode = req.params.courseCode;
  const studyprogramme = req.params.studyProgramme;
  const sql = `select studentId, fname, mname,lname from students 
               WHERE intakeDate = ?
                && courseCode = ? 
                && studyProgramme= ?`;

  db.query(sql,
    [`${intakedate}`, `${coursecode}`, `${studyprogramme}`],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        debug(result);
        // debug(studentid);
        if (result) {
          req.student = result;
          // return next();
          return res.send(result);
        }
        // when not found
        return res.sendStatus(404);
      }
    });
};

// Mark
exports.getAll_Marks = function getAll_Marks(req, res) {
  const semDate = req.params.semesterDateCode;
  const cu = req.params.courseUnitCode;
  const sql = `SELECT mk.markNum, mk.semesterDateCode, mk.courseCode, mk.courseUnitCode, mk.studentId, 
                      mk.coursework, mk.midExam, mk.finalExam, mk.totalMark, mk.gradeCode, mk.studentId, stu.fname, stu.lname, stu.studentId FROM marks mk, students stu
               WHERE  mk.studentId = stu.studentId && semesterDateCode = ? && CourseUnitCode =?
               ORDER BY markNum`;

  db.query(sql,
    [`${semDate}`, `${cu}`],
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_Mark = function getSingle_Mark(req, res) {
  const idFinal = req.params.markNum;
  debug(idFinal);

  // eslint-disable-next-line quotes
  const sql = `SELECT markNum,semesterDateCode, semesterNum, courseCode,courseUnitCode,
                studentId, coursework,midExam,finalExam, totalMark, gradeCode
              FROM marks  WHERE markNum = ?`;
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.adds_Mark = function adds_Mark(req, res) {
  const sql = `INSERT INTO marks(
    markNum,
    semesterDateCode,
    courseCode,
    courseUnitCode,
    studentId, 
    coursework,
    midExam,
    finalExam, 
    totalMark, 
    gradeCode    
    ) VALUES (?)`;
  // rs on geting only initials of words for courseCode
  const values = [
    req.body.markNum,
    req.body.semesterDateCode,
    req.body.courseCode,
    req.body.courseUnitCode,
    req.body.studentId,
    req.body.coursework,
    req.body.midExam,
    req.body.finalExam,
    req.body.totalMark,
    req.body.gradeCode
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_Mark = function updates_Mark(req, res) {
  const id = req.params.markNum;
  const idFinal = id;
  // console.log(idFinal);

  const sql = `UPDATE  marks SET ?
               WHERE markNum = ? `;
  const updates = {
    semesterDateCode: req.body.semesterDateCode,
    courseCode: req.body.courseCode,
    courseUnitCode: req.body.courseUnitCode,
    studentId: req.body.studentId,
    coursework: req.body.coursework,
    midExam: req.body.midExam,
    finalExam: req.body.finalExam,
    totalMark: req.body.totalMark,
    gradeCode: req.body.gradeCode
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      return res.send(result);
    });
};

exports.deletes_Mark = function deletes_Mark(req, res) {
  const id = req.params.markNum;
  const idFinal = id;

  const sql = 'DELETE FROM marks WHERE markNum = ?';
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      return res.send(result);

      // res.send(`${idFinal} deleted`);
    });
};
