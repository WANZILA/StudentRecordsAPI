/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const debug = require('debug')('app:structureController');
const db = require('../../db');

exports.getAll_Intakes = function getAll_Intakes(req, res) {
  const sql = `SELECT intakeDate, intakeName
               FROM intakes 
               ORDER BY intakeDate DESC`;

  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_Intake = function getSingle_Intake(req, res) {
  const idFinal = req.params.intakeDate;
  debug(idFinal);
  // const intakedate = `${intake}`;

  db.query('select intakeDate, intakeName From intakes WHERE intakeDate =?',
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.intake = result;
      return res.send(result);
      // return next();
    });
};

exports.adds_Intake = function adds_Intake(req, res) {
  const sql = `INSERT INTO intakes(
                intakeDate, intakeName) 
                VALUES(?)`;
  // adminId
  const values = [
    req.body.intakeDate,
    req.body.intakeName
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_Intake = function update_Intake(req, res) {
  const id = req.params.intakeDate;
  const id1 = id.replace('_', '/');
  const id2 = id1.replace('_', '/');
  const idFinal = id2.replace('_', '/');

  const sql = `UPDATE intakes SET ?
               WHERE intakeDate = ? `;
  const updates = {
    intakeDate: req.body.intakeDate,
    intakeName: req.body.intakeName,
    adminId: req.body.adminId
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      res.send(result);
    });
};

exports.deletes_Intake = function deletes_Intake(req, res) {
  const id = req.params.intakeDate;
  const id1 = id.replace('_', '/');
  const id2 = id1.replace('_', '/');
  const idFinal = id2.replace('_', '/');

  const sql = ' DELETE  FROM intakes WHERE intakeDate = ?';
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      res.send(result);

      // res.send(`${idFinal} deleted`);
    });
};

// semesterNames

exports.getAll_SemesterNames = function getAll_SemesterNames(req, res) {
  const sql = `SELECT semesterNum, semesterName
               FROM Semesters
               ORDER BY semesterNum DESC`;

  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_SemesterName = function getSingle_SemesterName(req, res) {
  const idFinal = req.params.semesterNum;
  debug(idFinal);
  // const intakedate = `${intake}`;

  db.query('select semesterNum, semesterName  FROM Semesters WHERE semesterNum =?',
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.adds_SemesterName = function adds_SemesterName(req, res) {
  const sql = `INSERT INTO Semesters(semesterNum, semesterName)
               VALUES(?)`;
  // adminId
  const values = [
    req.body.semesterNum,
    req.body.semesterName
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_SemesterName = function updates_SemesterName(req, res) {
  const id = req.params.semesterNum;
  // const id1 = id.replace('_', '/');
  // const id2 = id1.replace('_', '/');
  // const idFinal = id2.replace('_', '/');
  const idFinal = id;

  const sql = `UPDATE Semesters SET ?
               WHERE semesterNum = ? `;
  const updates = {
    semesterNum: req.body.semesterNum,
    semesterName: req.body.semesterName
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      res.send(result);
    });
};

exports.deletes_SemesterName = function deletes_SemesterName(req, res) {
  const id = req.params.semesterNum;
  const idFinal = id;

  const sql = ' DELETE  FROM Semesters WHERE semesterNum = ?';
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      res.send(result);

      // res.send(`${idFinal} deleted`);
    });
};

// semesterDates

exports.getAll_SemesterDates = function getAll_SemesterDates(req, res) {
  const sql = `SELECT * FROM  semesterdates ORDER BY semesterDateCode DESC`;

  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_SemesterDates = function getSingle_SemesterDates(req, res) {
  const idFinal = req.params.semesterDateCode;
  debug(idFinal);
  // const intakedate = `${intake}`;

  db.query('SELECT * FROM semesterdates WHERE semesterDateCode =? ',
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.adds_SemesterDates = function adds_SemesterDates(req, res) {
  const sql = `INSERT INTO semesterDates(
    semesterDateCode, 
    semesterDateName,
    startDate,
    endDate, 
    studyProgramme
    ) VALUES (?)`;
  // adminId
  const values = [
    req.body.semesterDateCode,
    req.body.semesterDateName,
    req.body.startDate,
    req.body.endDate,
    req.body.studyProgramme
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_SemesterDates = function updates_SemesterDates(req, res) {
  const id = req.params.semesterDateCode;
  const idFinal = id;

  const sql = `UPDATE semesterDates SET ?
      WHERE semesterDateCode = ?`;
  const updates = {
    semesterDateCode: req.body.semesterDateCode,
    semesterDateName: req.body.semesterDateName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    studyProgramme: req.body.studyProgramme
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      res.send(result);
    });
};

exports.deletes_SemesterDates = function deletes_SemesterDates(req, res) {
  const id = req.params.semesterDateCode;
  const idFinal = id;

  const sql = 'DELETE  FROM semesterDates WHERE semesterDateCode =?';
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      res.send(result);

      // res.send(`${idFinal} deleted`);
    });
};


// branches 
exports.getAll_Branches = function getAll_Branches(req, res) {
  const sql = 'SELECT * FROM branches';

  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

// exports.getSingle_Department = function getSingle_Department(req, res) {
//   const idFinal = req.params.departCode;
//   debug(idFinal);
//   // const intakedate = `${intake}`;

//   db.query('SELECT * FROM departments WHERE departCode = ?',
//     [`${idFinal}`],
//     (err, result) => {
//       if (err) { res.send(err); }
//       debug(result);
//       req.semester = result;
//       return res.send(result);
//       // return next();
//     });
// };

// exports.adds_Department = function adds_Department(req, res) {
//   const sql = `INSERT INTO departments(
//     departCode,
//     departName,
//     description
//     ) VALUES (?)`;
//   // adminId
//   const values = [
//     req.body.departCode,
//     req.body.departName,
//     req.body.description
//   ];

//   db.query(sql,
//     [values],
//     (err, result) => {
//       if (err) { res.send(err); }
//       debug('result');
//       return res.send(result);
//     });
// };

// exports.updates_Department = function updates_Department(req, res) {
//   const id = req.params.departCode;
//   // const id1 = id.replace('_', '/');
//   // const id2 = id1.replace('_', '/');
//   // const idFinal = id2.replace('_', '/');
//   const idFinal = id;

//   const sql = `UPDATE departments SET ?
//                WHERE departCode = ? `;
//   const updates = {
//     departName: req.body.departName,
//     description: req.body.description
//   };

//   db.query(sql,
//     [updates, `${idFinal}`],
//     (err, result) => {
//       if (err) { res.send(err); }
//       debug(result);
//       res.send(result);
//     });
// };

// exports.deletes_Department = function deletes_Department(req, res) {
//   const id = req.params.departCode;
//   const idFinal = id;

//   const sql = 'DELETE FROM departments WHERE departCode = ?';
//   db.query(sql,
//     [`${idFinal}`],
//     (err, result) => {
//       if (err) { res.send(err); }
//       // eslint-disable-next-line quotes
//       debug(result);
//       res.send(result);

//       // res.send(`${idFinal} deleted`);
//     });
// };

// studyprogrammes
exports.getAll_StudypPogrammes = function getAll_StudypPogrammes(req, res) {
  const sql = 'SELECT * FROM studyprogrammes';
  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

// department
exports.getAll_Departments = function getAll_Departments(req, res) {
  const sql = 'SELECT * FROM departments';

  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_Department = function getSingle_Department(req, res) {
  const idFinal = req.params.departCode;
  debug(idFinal);
  // const intakedate = `${intake}`;

  db.query('SELECT * FROM departments WHERE departCode = ?',
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.adds_Department = function adds_Department(req, res) {
  const sql = `INSERT INTO departments(
    departCode,
    departName,
    description
    ) VALUES (?)`;
  // adminId
  const values = [
    req.body.departCode,
    req.body.departName,
    req.body.description
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_Department = function updates_Department(req, res) {
  const id = req.params.departCode;
  // const id1 = id.replace('_', '/');
  // const id2 = id1.replace('_', '/');
  // const idFinal = id2.replace('_', '/');
  const idFinal = id;

  const sql = `UPDATE departments SET ?
               WHERE departCode = ? `;
  const updates = {
    departName: req.body.departName,
    description: req.body.description
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      res.send(result);
    });
};

exports.deletes_Department = function deletes_Department(req, res) {
  const id = req.params.departCode;
  const idFinal = id;

  const sql = 'DELETE FROM departments WHERE departCode = ?';
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      res.send(result);

      // res.send(`${idFinal} deleted`);
    });
};

// Course 
exports.getAll_Courses = function getAll_Courses(req, res) {
  const sql = `Select departCode, courseCode, courseName 
                FROM courses
                ORDER BY departCode DESC`;

  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_Course = function getSingle_Course(req, res) {
  const idFinal = req.params.courseCode;
  debug(idFinal);
  // const intakedate = `${intake}`;

  db.query('select departCode, courseCode, courseName FROM courses  WHERE courseCode = ?',
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.adds_Course = function adds_Course(req, res) {
  const sql = `INSERT INTO courses( 
    courseCode,
    courseName,
    description,
    departCode
    ) VALUES(?)`;
  // adminId
  const values = [
    req.body.courseCode,
    req.body.courseName,
    req.body.description,
    req.body.departCode
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_Course = function updates_Course(req, res) {
  const id = req.params.courseCode;
  const idFinal = id;

  const sql = `UPDATE  courses SET ?
               WHERE WHERE courseCode = ? `;
  const updates = {
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    description: req.body.description,
    departCode: req.body.departCode
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      res.send(result);
    });
};

exports.deletes_Course = function deletes_Course(req, res) {
  const id = req.params.courseCode;
  const idFinal = id;

  const sql = 'DELETE FROM courses WHERE courseCode = ?';
  db.query(sql,
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      res.send(result);

      // res.send(`${idFinal} deleted`);
    });
};

// Course Unit
exports.getAll_CourseUnits = function getAll_CourseUnits(req, res) {
  const coursecode = req.params.courseCode;
  const sql = `SELECT 
                  courseCode,
                  semesterNum,
                  courseUnitCode, 
                  courseUnitName, 
                  creditHours
                FROM courseunits
                WHERE courseCode = ?
                ORDER BY courseUnitCode, coursecode`;
// semesterNum
  db.query(sql, [`${coursecode}`],
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_CourseUnit = function getSingle_CourseUnit(req, res) {
  const idFinal = req.params.courseUnitCode;
  debug(idFinal);
  // const intakedate = `${intake}`;
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
    [`${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.get_CourseUnit_Reg = function get_CourseUnit_Reg(req, res) {
  const coursecode = req.params.courseCode;
  // eslint-disable-next-line prefer-destructuring
  const semesterNum = req.params.semesterNum;

  debug(`${coursecode}`, `${semesterNum}`);
  // const intakedate = `${intake}`;
  const sql = `SELECT 
                courseUnitCode, 
                courseUnitName,
                courseCode,
                semesterNum
                FROM courseunits 
              WHERE courseCode = ? && semesterNum = ?`;
  db.query(sql,
    [`${coursecode}`, `${semesterNum}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      // req.semester = result;
      return res.send(result);
      // return next();
    });
};

exports.adds_CourseUnit = function adds_CourseUnit(req, res) {
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
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_CourseUnit = function updates_CourseUnit(req, res) {
  const id = req.params.courseUnitCode;
  const idFinal = id;
  // console.log(idFinal);

  const sql = `UPDATE  courseunits SET ?
               WHERE courseUnitCode = ? `;
  const updates = {
    courseUnitCode: req.body.courseUnitCode,
    courseUnitName: req.body.courseUnitName,
    description: req.body.description,
    creditHours: req.body.creditHours,
    courseCode: req.body.courseCode,
    coursework: req.body.coursework,
    midExam: req.body.midExam,
    finalExam: req.body.finalExam,
    semesterNum: req.body.semesterNum,
    adminId: req.body.adminId
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      return res.send(result);
    });
};

exports.deletes_CourseUnit = function deletes_CourseUnit(req, res) {
  const id = req.params.courseUnitCode;
  const idFinal = id;

  const sql = 'DELETE FROM courseunits WHERE courseUnitCode = ?';
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

// grade 
exports.getAll_Grades = function getAll_Grades(req, res) {
  const sql = 'SELECT * FROM grades ORDER BY gradeCode';

  db.query(sql,
    (err, result) => {
      if (err) { res.send(err); }
      // debug(result);
      return res.send(result);
    });
};

exports.getSingle_Grade = function getSingle_Grade(req, res) {
  const idFinal = req.params.gradeCode;
  debug(idFinal);

  // eslint-disable-next-line quotes
  const sql = `SELECT * FROM grades  WHERE gradeCode = ?`;
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

exports.adds_Grade = function adds_Grade(req, res) {
  const sql = `INSERT INTO grades(
    gradeCode,
    gradeRange,
    gradeScore    
    ) VALUES (?)`;
  // rs on geting only initials of words for courseCode
  const values = [
    req.body.gradeCode,
    req.body.gradeRange,
    req.body.gradeScore
  ];

  db.query(sql,
    [values],
    (err, result) => {
      if (err) { res.send(err); }
      debug('result');
      return res.send(result);
    });
};

exports.updates_Grade = function updates_Grade(req, res) {
  const id = req.params.gradeCode;
  const idFinal = id;
  // console.log(idFinal);

  const sql = `UPDATE  grades SET ?
               WHERE gradeCode = ? `;
  const updates = {
    gradeCode: req.body.gradeCode,
    gradeRange: req.body.gradeRange,
    gradeScore: req.body.gradeScore
  };

  db.query(sql,
    [updates, `${idFinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      debug(result);
      return res.send(result);
    });
};

exports.deletes_Grade = function deletes_Grade(req, res) {
  const id = req.params.gradeCode;
  const idFinal = id;

  const sql = 'DELETE FROM grades WHERE gradeCode = ?';
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
