const debug = require('debug')('app:studentController');
const db = require('../../db');
// display all students
exports.student_get_all = function getAllStudents(req, res) {
  const sql = 'select studentId,fname,mname,lname from students ORDER BY intakeDate DESC limit 10';
  // const sql = `SELECT stud.studentId, stud.fname, stud.mname, stud.lname, stud.branchNum, 
  //       intD.intakeDate, intD.intakeName, bra.branchName, bra.branchNum
  //       FROM students stud, intakes intD, branches bra 
  //       ORDER BY intakeDate DESC `;
  //   const sql = `SELECT stud.studentId, stud.fname, stud.mname, stud.lname, stud.branchNum, 
  // intD.intakeDate, intD.intakeName, bra.branchName, bra.branchNum
  // FROM students stud, intakes intD, branches bra 
  // WHERE (stud.intakeDate = intD.intakeDate ) 
  //  && (stud.intakeDate = '2020/08/06') && (stud.branchNum = bra.branchNum) && (stud.studyprogramme='fulltime')
  // ORDER BY intakeDate DESC `;
  db.query(sql,
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.send(result);
    });
};

// eslint-disable-next-line camelcase
exports.student_get_all_Student_Intakes = function student_get_all_Student_Intakes(req, res) {
  const intake = req.params.intakeDate;
  const branch = req.params.branchNum;
  const studyProg = req.params.studyProgramme;

  debug('hi', intake, branch);

  const sql = `select studentId,fname,mname,lname 
               FROM students 
               WHERE  intakeDate =?  && branchNum =? && studyProgramme =?
               ORDER BY intakeDate DESC`;
//  && studyProgramme =?
// , `${branch}`
  db.query(sql, [`${intake}`, `${branch}`, `${studyProg}`],
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      debug(result);
      return res.send(result);
    });
};
// changes studentID PTC_A2020_05 to PTC/A2020/05
exports.student_get_One = function getOneStudent(req, res) {
  const stu = req.params.studentId;
  // replace / with _
  // rs on urldecode() 
  const stu1 = stu.replace('_', '/');
  const stu2 = stu1.replace('_', '/');
  const studentid = stu2.replace('_', '/');
  // const studentid = stu.replaceAll('_', '/');
  // const stu2 = encodeURIComponent(stu);
  // const studentid = decodeURIComponent(stu);
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
          // return next();
          return res.send(result);
        }
        // when not found
        return res.sendStatus(404);
      }
    });
};

// used in reg module of  front end
// eslint-disable-next-line camelcase
exports.get_all_StudyProgrammes = function get_all_StudyProgrammes(req, res) {
  const sql = 'select distinct studyProgramme from students';

  db.query(sql,
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        debug(result);
        if (result) {
          req.studyprogramme = result;
          // return next();
          return res.send(result);
        }
        // when not found
        return res.sendStatus(404);
      }
    });
};
exports.student_post = function studentAdd(req, res) {
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
  // saving to db
  db.query(sql, values,
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.send(result);
      // return res.json(result);
    });
};

exports.student_update = function studentUpdate(req, res) {
  // If any errors on update its because of  intakedates and birhtday dates
  const stu = req.params.studentId;
  // const stud = decodeURIComponent(stu);
  //  console.log(stud);
  const stu1 = stu.replace('_', '/');
  const stu2 = stu1.replace('_', '/');
  const studentId = stu2.replace('_', '/');
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
                 WHERE studentId = ?`;

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
};

exports.student_delete = function studentDelete(req, res) {
  const stu = req.params.studentId;
  const stu1 = stu.replace('_', '/');
  const stu2 = stu1.replace('_', '/');
  const studentId = stu2.replace('_', '/');
  db.query('DELETE from students WHERE studentId = ?',
    [`${studentId}`],
    (err, result) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else {
        // console.log(studentId);
        res.send('deleted');
        debug(result);
      }
    });
};
