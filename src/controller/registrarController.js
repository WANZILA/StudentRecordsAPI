/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const debug = require('debug')('app:registrarController');
const db = require('../../db');

// Mark
exports.getAll_Marks = function getAll_Marks(req, res) {
  const sql = 'SELECT * FROM marks ORDER BY markNum';

  db.query(sql,
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
  const sql = `SELECT markNum,semesterDateCode,courseCode,courseUnitCode,
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
    markNum: req.body.markNum,
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
