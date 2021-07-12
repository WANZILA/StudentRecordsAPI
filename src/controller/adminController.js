/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const debug = require('debug')('app:studentController');
const db = require('../../db');

exports.getAll = function getAll(req, res) {
  const sql = `select adminId, fname, mname, lname 
              FROM admins`;
  db.query(sql,
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.send(result);
    });
};

exports.getSearchAdmins = function getSearchAdmins(req, res) {
  const departCode = req.params.departCode;
  const branchNum = req.params.branchNum;

  const sql = `select adminId, title, fname, lname 
              FROM admins
              WHERE departCode= ?
              && branchNum = ? `;
  db.query(sql, [`${departCode}`, `${branchNum}`],
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.send(result);
    });
};

// eslint-disable-next-line camelcase
exports.getAllAdmins_Reg = function getAllAdmins_Reg(req, res) {
  const sql = `select adminId, title, fname, lname 
              FROM admins`;
  db.query(sql,
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.send(result);
    });
};

exports.getAll = function getAll(req, res) {
  const sql = `select adminId, fname, mname, lname 
              FROM admins`;
  db.query(sql,
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.send(result);
    });
};

// Nb fn e.g adminSingle name may not be the same as exports e.g exports.adminAdd
// single admin
exports.getSingle = function getSingle(req, res) {
  const id = req.params.adminId;
  const id1 = id.replace('_', '/');
  const id2 = id1.replace('_', '/');
  const Idfinal = id2.replace('_', '/');

  // db query
  db.query('select * from admins WHERE adminId=?',
    [`${Idfinal}`],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result) {
          req.admin = result;
          debug(result);
          return res.send(result);
        }
        return res.sendStatus(404);
      }
    });
};

exports.adds = function adds(req, res) {
  let sql = `INSERT INTO admins(
    adminId ,
    fname ,
    mName ,
    lname ,
    title ,
    gender ,
    birthDate,
    maritalStatus,
    children ,
    employmentStatus,
    employmentDate,
    unemploymentDate,
    branchNum,
    departCode,
    role,
    phoneAddress1 ,
    phoneAddress2 ,
    emailAddress ,
    passwords ,
    updatedBy
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  const values = [
    req.body.adminId,
    req.body.fname,
    req.body.mName,
    req.body.lname,
    req.body.title,
    req.body.gender,
    req.body.birthDate,
    req.body.maritalStatus,
    req.body.children,
    req.body.employmentStatus,
    req.body.employmentDate,
    req.body.unemploymentDate,
    req.body.branchNum,
    req.body.departCode,
    req.body.role,
    req.body.localAddress1,
    req.body.localAddress2,
    req.body.phoneAddress1,
    req.body.phoneAddress2,
    req.body.emailAddress,
    req.body.passwords,
    req.body.updatedBy
  ];

  // saving
  db.query(sql, values,
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.send(result);
    });
};

// http://www.localhost:4000/admin/PTCM202002
exports.updateOne = function updateOne(req, res) {
  const id = req.params.adminId;
  const id1 = id.replace('_', '/');
  const id2 = id1.replace('_', '/');
  const Idfinal = id2.replace('_', '/');

  // updating

  const updates = {
    fname: req.body.fname,
    mName: req.body.mName,
    lname: req.body.lname,
    title: req.body.title,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    maritalStatus: req.body.maritalStatus,
    children: req.body.children,
    employmentStatus: req.body.employmentStatus,
    employmentDate: req.body.employmentDate,
    unemploymentDate: req.body.unemploymentDate,
    branchNum: req.body.branchNum,
    departCode: req.body.departCode,
    role: req.body.role,
    localAddress1: req.body.localAddress1,
    localAddress2: req.body.localAddress2,
    phoneAddress1: req.body.phoneAddress1,
    phoneAddress2: req.body.phoneAddress2,
    emailAddress: req.body.emailAddress,
    passwords: req.body.passwords,
    updatedBy: req.body.updatedBy
  };
  const sql = `Update admins SET ? 
                WHERE adminId = ?`;

  db.query(sql,
    [updates, `${Idfinal}`],
    (err, result) => {
      debug('result');
      if (err) {
        res.json(err);
      } else {
        res.send('updated');
        debug(result);
      }
    });
};

exports.updates = function Updates(req, res) {
  // If any errors on update its because of  intakedates and birhtday dates
  const id = req.params.adminId;
  const id1 = id.replace('_', '/');
  const id2 = id1.replace('_', '/');
  const Idfinal = id2.replace('_', '/');
  // ,
  // employmentDate: req.body.employmentDate,
  // unemploymentDate: req.body.unemploymentDate,
  const updates = {
    adminId: req.body.adminId,
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    title: req.body.title,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    maritalStatus: req.body.maritalStatus,
    children: req.body.children,
    branchNum: req.body.branchNum,
    departCode: req.body.departCode,
    role: req.body.role,
    nation: req.body.nation,
    district: req.body.district,
    county: req.body.county,
    subCounty: req.body.subCounty,
    parish: req.body.parish,
    village: req.body.village,
    phoneAddress1: req.body.phoneAddress1,
    phoneAddress2: req.body.phoneAddress2,
    emailAddress: req.body.emailAddress,
    passwords: req.body.passwords,
    updatedBy: req.body.updatedBy
  };

  const sql = `Update admins SET ? 
                 WHERE adminId = ?`;

  db.query(sql,
    [updates, `${Idfinal}`],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.send('updated');
        debug(result);
      }
    });
};

exports.deletes = function adminDelete(req, res) {
  const id = req.params.adminId;
  const id1 = id.replace('_', '/');
  const id2 = id1.replace('_', '/');
  const Idfinal = id2.replace('_', '/');

  const sql = 'DELETE  FROM admins WHERE adminId = ?';
  db.query(sql,
    [`${Idfinal}`],
    (err, result) => {
      if (err) { res.send(err); }
      // eslint-disable-next-line quotes
      debug(result);
      res.send(`${Idfinal} deleted`);
    });
};
