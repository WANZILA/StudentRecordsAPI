const debug = require('debug')('app:adminController');
const db = require('../../db');

function adminsController() {
  function get(req, res) {
    const sql = 'select * from admins';
    db.query(sql,
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function post(req, res) {
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
      localAddress1 ,
      localAddress2 ,
      phoneAddress1 ,
      phoneAddress2 ,
      emailAddress ,
      passwords ,
      updatedBy
      ) VALUES (?)`;

    let values = [
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

    db.query(sql,
      [values],
      (err, result) => {
        debug('result');
        if (err) { return res.send(err); }
        return res.send(result);
      });
  }

  // middleware for selecting a singl e admin
  function alls(req, res, next) {
    const admin = req.params.adminId;
    const adminid = decodeURIComponent(admin);

    // db connection
    db.query('select * from admins WHERE adminId =?',
      [`${adminid}`],
      (err, result) => {
        if (err) { res.send(err); }
        req.admin = result;
        return next();
      });
  }
  // %96
  // function single(req, res, next) {
  //   const admin = req.params.adminId;
  //   const adminid = decodeURIComponent(admin);
  //   req.adminid = adminid;
  // 1325-1622-7802-8689-1515-2706  return next();
  // }

  // updating the admins
  function patch(req, res) {
    const admin = req.params.adminId;
    const adminid = decodeURIComponent(admin);

    let sql = `UPDATE admins SET
      fname = '${req.body.fname}',
      mName = '${req.body.mName}',
      lname = '${req.body.lname}',
      title = '${req.body.title}',
      gender = '${req.body.gender}',
      birthDate = '${req.body.birthDate}',
      maritalStatus = '${req.body.maritalStatus}',
      children = '${req.body.children}',
      employmentStatus = '${req.body.employmentStatus}',
      employmentDate = '${req.body.employmentDate}',
      unemploymentDate = '${req.body.unemploymentDate}',
      branchNum = '${req.body.branchNum}',
      departCode = '${req.body.departCode}',
      role = '${req.body.role}',
      localAddress1 = '${req.body.localAddress1}',
      localAddress2 = '${req.body.localAddress2}',
      phoneAddress1 = '${req.body.phoneAddress1}',
      phoneAddress2 = '${req.body.phoneAddress2}',
      emailAddress = '${req.body.emailAddress}',
      passwords = '${req.body.passwords}',
      updatedBy = '${req.body.updatedBy}'
      WHERE adminId = ?`;

    db.query(sql,
      [`${adminid}`],
      (err, result) => {
        debug('result');
        if (err) { return res.send(err); }
        return res.send(result);
      });
  }

  function deletes(req, res) {
    const admin = req.params.adminId;
    const adminid = decodeURIComponent(admin);

    const sql = ' DELETE  FROM admins WHERE adminId = ?';
    db.query(sql,
      [`${adminid}`],
      (err, result) => {
        if (err) { res.send(err); }
        // eslint-disable-next-line quotes
        res.send(`${adminid} deleted`);
});
  }

  // function getOne(req, res) {
  //   res.send(req);
  // }

  return {
    get, post, alls, patch, deletes
  };
}

module.exports = adminsController();
