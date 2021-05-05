/* eslint-disable linebreak-style */
const debug = require('debug')('app:studentController');
const db = require('../../db');

function studentsController() {
  function alls(req, res, next) {
    // sample id = A18%2FCCM%2F08
    // id exists = 00000010004
    const stu = req.params.studentId;

    // const stu = 'A18%2FCCM%2F08';
    debug(stu);

    // const stu1 = encodeURIComponent(stu);
    // const stu2 = stu.replace('%7D', ' ');
    // const stu1 = stu.replace('%2F', '/');
    // const studentid = stu1.replace('%2F', '/');
    // const studentid = decodeURIComponent(`${stu}`);
    const studentid = decodeURIComponent(stu);
    // sample of encoding and decording
    // console.log(encodeURIComponent(studentId));
    debug(studentid);
    //  ORDER BY  CAST(intakeDate as DATE(intakeDate))
    const sql = 'select * from students where studentId = ?';

    db.query(sql,
      [`${studentid}`],
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          debug(result);
          debug(studentid);
          if (result) {
            req.student = result;
            return next();
            // return res.send(result);
          }
          // when not found
          return res.sendStatus(404);
        }
      });
  }
  function post(req, res) {
    const sql = `INSERT INTO students 
    (studentId,
    fname,
    mname,
    lname,
    title,
    birthDate,
    gender,
    maritalStatus,
    nation,
    district,
    county,
    subCounty,
    parish,
    village,
    phoneAddress1,
    phoneAddress2,
    emailAddress,
    intakeDate,
    branchNum,
    studyprogramme,
    courseCode,
    studentStatus, 
    educationLevel) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const values = [
      req.body.studentId,
      req.body.fname,
      req.body.mname,
      req.body.lname,
      req.body.title,
      req.body.birthDate,
      req.body.gender,
      req.body.maritalStatus,
      req.body.nation,
      req.body.district,
      req.body.county,
      req.body.subCounty,
      req.body.parish,
      req.body.village,
      req.body.phoneAddress1,
      req.body.phoneAddress2,
      req.body.emailAddress,
      // req.body.educationLevel,
      req.body.intakeDate,
      req.body.branchNum,
      req.body.studyprogramme,
      req.body.courseCode,
      req.body.studentStatus,
      req.body.educationLevel
      //  req.body.passwords
    ];

    // 'INSERT INTO employee SET ?
    // const sql = `INSERT INTO students(studentId,fname)
    //              VALUES (?,?)`;
    // const reqs = req.body;
    const stud = req.body.studentId;
    debug(stud);
    // const items = [
    //   studentId,
    //   fname
    // ];
    // const VAL = {
    //   studentId: req.body.studentId,
    //   fname: req.body.fname
    // };
    // const studId = req.body.studentId;
    // debug(studId);
    //  debug(VAL);
    // const updates = {
    //    req.body.studentId,
    //    req.body.fname,
    // mname: req.body.mname,
    // lname: req.body.lname,
    // title: req.body.title,
    // birthDate: req.body.birthDate,
    // gender: req.body.gender,
    // maritalStatus: req.body.maritalStatus,
    // nation: req.body.nation,
    // district: req.body.district,
    // county: req.body.county,
    // subCounty: req.body.subCounty,
    // parish: req.body.parish,
    // village: req.body.village,
    // phoneAddress1: req.body.phoneAddress1,
    // phoneAddress2: req.body.phoneAddress2,
    // emailAddress: req.body.emailAddress,
    // educationLevel: req.body.educationLevel,
    // // intakeDate: req.body.intakeDate,
    // branchNum: req.body.branchNum,
    // studyprogramme: req.body.studyprogramme,
    // courseCode: req.body.courseCode,
    // studentStatus: req.body.studentStatus,
    // passwords: req.body.passwords
    // };

    db.query(sql, values,
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.send(result);
        // return res.json(result);
      });
  }

  function get(req, res) {
    const sql = 'select studentId,fname,mname,lname from students ORDER BY intakeDate';
    db.query(sql,
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.send(result);
      });
  }

  function updateStudent(req, res) {
    // geting the selected student from the .all middleware
    // Object destructuring
    const stu = req.params.studentId;
    // const fna = req.body.fname;
    // debug(fna);
    const studentId = decodeURIComponent(stu);
    const updates = {
      studentId: req.body.studentId,
      fname: req.body.fname,
      mname: req.body.mname,
      lname: req.body.lname,
      title: req.body.title,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      nation: req.body.nation,
      district: req.body.district,
      county: req.body.county,
      subCounty: req.body.subCounty,
      parish: req.body.parish,
      village: req.body.village,
      phoneAddress1: req.body.phoneAddress1,
      phoneAddress2: req.body.phoneAddress2,
      emailAddress: req.body.emailAddress,
      educationLevel: req.body.educationLevel,
      // intakeDate: req.body.intakeDate,
      branchNum: req.body.branchNum,
      studyprogramme: req.body.studyprogramme,
      courseCode: req.body.courseCode,
      studentStatus: req.body.studentStatus,
      // passwords: req.body.passwords
    };
    // // children: req.body.children,
    // // keenName: null ,
    // // keenRelationship: null ,
    // // keenPhone: 0 ,
    // // keenEmail: null ,
    // // keenAddress: null ,
    // // specify: null ,
    // // institutions: null ,
    // // EntryLevel: req.body.EntryLevel,
    // //  adminId: req.body.adminId,
    //  debug(updates);

    const sql = `Update students SET ? 
                 WHERE studentId =?`;

    db.query(sql,
      [updates, `${studentId}`],
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.send('updated');
          debug(result);
        }
      });
  }

  function del(req, res) {
    const stu = req.params.studentId;
    const studentId = decodeURIComponent(stu);
    // const studentId = req.student.studentId;
    db.query('DELETE from students WHERE studentId = ?',
      [`${studentId}`],
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          // console.log(studentId);
          res.send('deleted');
          debug(result);
        }
      });
  }
  return {
    alls, post, get, updateStudent, del
  };
}

module.exports = studentsController;
