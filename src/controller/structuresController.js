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
      res.send(`${idFinal} deleted`);
    });
};
