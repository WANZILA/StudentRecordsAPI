const debug = require('debug')('app:intakesController');
const db = require('../../../db');

function intakesController() {
  function getAll(req, res) {
    const sql = `SELECT intakeDate, YEAR(intakeDate) AS Year, MONTHName(intakeDate) as Month, intakeName, updateTimestamp 
    FROM intakes 
    intake ORDER BY intakeDate DESC`;

    db.query(sql,
      (err, result) => {
        if (err) { res.send(err); }
        // debug(result);
        return res.send(result);
      });
  }

  function singlePost(req, res) {
    const sql = `INSERT INTO intakes(
    intakeDate, 
    intakeName,
    adminId) VALUES(?)`;

    const values = [
      req.body.intakeDate,
      req.body.intakeName,
      req.body.adminId
    ];

    db.query(sql,
      [values],
      (err, result) => {
        if (err) { res.send(err); }
        debug('result');
        return res.send(result);
      });
  }

  function singleSelect(req, res, next) {
    //  2020%9712%9704
    // const intakedate = "2020-12-04";  // encodeURIComponent(2020-12-04)
    const intakes = req.params.intakeDate;
    debug(intakes);
    // const intakedate = `${intake}`;
 

    db.query('select TO_DATE(intakeDate) from intakes WHERE intakeDate =?',
      [`${intakedate}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(result);
        // debug(Date.parse(intakedate));
        // debug(TO_Date(intakedate));

        req.intake = result;
        return next();
      });
  }

  function patch(req, res) {
    const intake = req.params.intakeDate;
    // const intakedate = decodeURIComponent(intake);
    // ONLY update intake name 
    const sql = `UPDATE intakes SET 
    intakeName = '${req.body.intakeName}',
    adminId = '${req.body.adminId}'
    WHERE intakeDate = ? `;

    db.query(sql,
      [`${intake}`],
      (err, result) => {
        if (err) { res.send(err); }
        res.send(result);
      });
  }

  function deleteSingle(req, res) {
    const intake = req.params.intakeDate;
    const intakedate = decodeURIComponent(intake);

    const sql = ' DELETE  FROM intakes WHERE intakeDate = ?';
    db.query(sql,
      [`${intakedate}`],
      (err, result) => {
        if (err) { res.send(err); }
        // eslint-disable-next-line quotes
        res.send(`${intakedate} deleted`);
      });
  }

  return {
    getAll, singlePost, singleSelect, patch, deleteSingle
  };
}

module.exports = intakesController();
