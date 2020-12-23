// const SqlString = require('mysql/lib/protocol/SqlString');
const debug = require('debug')('app:structuresController');
const db = require('../../db');

function structuresController() {
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
    const sql = 'SELECT * FROM semesterdates WHERE semesterDateCode =(?)';
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
      [`${req.semester}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  return {
    // working on semesters
    getAllSemesterDates,
    addSemesterDate,
    getSingleSemester,
    semesterUpdate
  };
}

module.exports = structuresController();
