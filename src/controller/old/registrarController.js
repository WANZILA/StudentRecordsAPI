const debug = require('debug')('app:registrarController');
const db = require('../../../db');

function registrarController() {

  function getAllStudentApplications(req, res) {
    const intake = req.params.intakeDate;
    const appstatus = req.params.appStatus;
    // 
    // const en = encodeURL();
    // const intakedate = decodeURIComponent(intake);  
    // decodeURIComponent(2020%9612%9604)

    // const intakedate = decodeURIComponent(intakes);
    const intakedate = escape(intake);


    const sql = `SELECT 
            intakedate, 
            studentAppId,
            title, 
            fname, 
            lname,
            nation,
            district,
            phoneAddress1,
            phoneAddress2,
            studyprogramme,	
            courseCode
          FROM studentApps
          WHERE intakeDate = ? 
          && appStatus = ?            
          `;
    db.query(sql,
      [`${intakedate}`, `${appstatus}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(intakedate);
        debug(appstatus);
        return res.send(result);
      });
    // db.query(sql,
    //   (err, result) => {
    //     if (err) { res.send(err); }
    //     return res.send(result);
    //   });


  }

  function saveStudentApplication(req, res) {
    const sql = `INSERT INTO  studentApps(
                title,
                fname,
                mName,
                lname,
                nation,
                district,
                county,
                subCounty,
                parish ,
                village,
                phoneAddress1,
                phoneAddress2,
                emailAddress,
                intakeDate,
                branchNum,
                studyprogramme,	
                courseCode1,
                courseCode2,
                coursecode3,
                appStatus,
                adminId
              ) VALUES (?)`;
    const values = [
      req.body.title,
      req.body.fname,
      req.body.mName,
      req.body.lname,
      req.body.nation,
      req.body.district,
      req.body.county,
      req.body.subCounty,
      req.body.parish,
      req.body.vallage,
      req.body.phoneAddress1,
      req.body.phoneAddress2,
      req.body.emailAddress,
      req.body.intakeDate,
      req.body.branchNum,
      req.body.studyprogramme,
      req.body.courseCode1,
      req.body.courseCode2,
      req.body.coursecode3,
      req.body.appStatus,
      req.body.adminId
    ];

    db.query(sql,
      [values],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function getSingleStudentApp(req, res, next) {
    const studentappid = req.params.studentAppId;
    const sql = `SELECT
            intakedate, 
            studentAppId,
            title, 
            fname, 
            lname,
            nation,
            district,
            phoneAddress1,
            phoneAddress2,
            studyprogramme,	
            courseCode
          FROM studentApps
          WHERE studentAppId = ? `;
    // intakedate = ?' && appStatus = ?
    db.query(sql,
      [`${studentappid}`],
      (err, result) => {
        if (err) { res.send(err); }
        req.studentapps = result;
        return next();
      });
  }

  function updateStudentApp(req, res) {
    const studentappid = req.params.studentAppId;
    const sql = `UPDATE studentApps SET
            intakedate ='${req.body.intakedate}', 
            title = '${req.body.title}', 
            fname = '${req.body.fname}', 
            lname = '${req.body.lname}',
            nation = '${req.body.nation}',
            district = '${req.body.district}',
            phoneAddress1 = '${req.body.phoneAddress1}',
            phoneAddress2 = '${req.body.phoneAddress2}',
            studyprogramme = '${req.body.studyprogramme}',	
            courseCode = '${req.body.courseCode}'
          WHERE studentAppId = ? `;
    // intakedate = ?' && appStatus = ?
    db.query(sql,
      [`${studentappid}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function deleteStudentApp(req, res) {
    const studentappid = req.params.studentAppId;
    const sql = 'DELETE FROM studentApps WHERE studentAppId = ?';
    db.query(sql,
      [`${studentappid}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(`${req.body.fname} has been delted`);
      });
  }

  // student Admission
  function getAllStudentAdmissions(req, res) {
    const intake = req.params.intakeDate;
    const intakedate = decodeURIComponent(intake);
    const sql = `select  DISTINCT studentId,
                    fname ,
                    mName ,
                    lname ,
                    title ,
                    birthDate,
                    gender ,
                    maritalStatus ,
                    children ,	
                    nation ,
                    district,
                    county ,
                    subCounty ,
                    parish ,
                    village ,
                    phoneAddress1 ,
                    phoneAddress2 ,
                    emailAddress ,
                    IntakeDate ,
                    branchNum ,
                    studyprogramme ,
                    EntryLevel ,
                    courseCode ,
                    studentStatus
                FROM students 
                WHERE intakeDate = ?  ORDER BY studentId DESC        
            `; //      ORDER BY studentId DESC

    db.query(sql,
      [`${intakedate}`],
      (err, result) => {
        if (err) { res.send(err); }
        // const de = decodeURIComponent('2020-08-04');       
        // debug(de);
        return res.send(result);
      });
  }

  function saveStudentAdmission(req, res) {
    let sql = `INSERT INTO students( studentId ,
      fname ,
      mName ,
      lname ,
      title ,
      birthDate,
      gender ,
      maritalStatus,
      children ,
      branchNum ,
      localAddress1 ,
      localAddress2 ,
      phoneAddress1 ,
      phoneAddress2 ,
      emailAddress ,
      IntakeDate ,
      EntryLevel ,
      studentStatus ,
      adminId,
      courseCode,
      password) VALUES (?)`;

    let values = [
      req.body.studentId,
      req.body.fname,
      req.body.mName,
      req.body.lname,
      req.body.title,
      req.body.birthDate,
      req.body.gender,
      req.body.maritalStatus,
      req.body.children,
      req.body.branchNum,
      req.body.localAddress1,
      req.body.localAddress2,
      req.body.phoneAddress1,
      req.body.phoneAddress2,
      req.body.emailAddress,
      req.body.IntakeDate,
      req.body.EntryLevel,
      req.body.studentStatus,
      req.body.adminId,
      req.body.courseCode,
      req.body.password
    ];

    db.query(sql,
      [values],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.send(result);
        // return res.json(result);
      });

  }

  // function getSingleStudentAdmission(req, res, next) {

  // }

  // function updateStudentAdmission(req, res) {

  // }

  // function deleteStudentAdmission(req, res) {

  // }

  // courseunit allocaions
  function getAllDepartCoursesSemDate(req, res) {
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    // const semesterNum = semesterdatecode.charAt(18);
    const semesterNum = semesterdatecode[17];


    const sql = `SELECT courseCode, courseUnitCode, semesterNum
               FROM courseunits
               WHERE courseCode = ? && semesterNum = ?`;

    db.query(sql,
      [`${coursecode}`, `${semesterNum}`],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        debug(semesterdatecode);
        debug(semesterNum);
        return res.send(result);
      });
  }

  function getcourseUnitAllocations(req, res) {
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT cua.semesterDateCode, sd.semesterDateName,cua.allocationNum, cua.courseCode, 
                      cua.courseUnitCode, cu.courseUnitName, cua.adminId, ad.fname, ad.lname, cua.notes 
                 FROM  courseunitallocations cua, semesterDates sd,  courses c, admins ad, courseUnits cu
                 WHERE (cua.semesterDateCode = sd.semesterDateCode)  && (cua.courseCode = c.courseCode) 
                        && (ad.adminId = cua.adminId)  &&(cua.courseUnitCode = cu.courseUnitCode)
                        && cua.courseCode = ?
                        && cua.semesterDateCode = ? `;

    // && cua.courseCode =  'DBT'
    // &&    cua.semesterDateCode = '2018/08/06/1/ful/1' `
    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.send(result);
      });
  }

  function postCourseUnitAllocation(req, res) {
    const sql = `INSERT INTO courseUnitAllocations(	
                      semesterDateCode,
                      courseCode,
                      courseUnitCode,  
                      adminId,
                      notes) 
                 VALUES  (?)`;
    const values = [
      req.body.semesterDateCode,
      req.body.courseCode,
      req.body.courseUnitCode,
      req.body.adminId,
      req.body.notes
    ];

    db.query(sql,
      [values],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.send(result);
      });
  }

  function getSingleCourseUnitAllocation(req, res, next) {
    const sem = req.params.semesterDateCode;
    const courseunitcode = req.params.courseUnitCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `SELECT cua.semesterDateCode, sd.semesterDateName,cua.allocationNum, cua.courseCode, 
                      cua.courseUnitCode, cu.courseUnitName, cua.adminId, ad.fname, ad.lname, cua.notes 
                  FROM  courseunitallocations cua, semesterDates sd,  courses c, admins ad, courseUnits cu
                  WHERE (cua.semesterDateCode = sd.semesterDateCode)  && (cua.courseCode = c.courseCode) 
                        && (ad.adminId = cua.adminId)  &&(cua.courseUnitCode = cu.courseUnitCode)
                        && cua.courseUnitCode = ?
                        && cua.semesterDateCode = ? `;
    db.query(sql,
      [`${courseunitcode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        debug(semesterdatecode);
        req.courseunitallocation = result;
        return next();
      });
  }

  function updateCourseUnitAllocation(req, res) {
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `UPDATE courseUnitAllocations SET 
                        courseCode = '${req.body.courseCode}',
                        courseUnitCode = '${req.body.courseUnitCode}',  
                        adminId = '${req.body.adminId}',
                        notes = '${req.body.notes}'
                WHERE courseUnitCode ='DBT1101' && semesterDateCode = ?`;
    db.query(sql,
      [`${semesterdatecode}`],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.send(result);
      });
  }

  function deleteCourseUnitAllocation(req, res) {
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const sql = `DELETE FROM  courseUnitAllocations 
                WHERE courseUnitCode ='DBT1101' && semesterDateCode = ?`;
    db.query(sql,
      [`${semesterdatecode}`],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.send(result);
      });
  }

  // Enroll students
  function getAllEnrolledStudents(req, res) {
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);

    const sql = `SELECT mks.courseCode, mks.semesterDateCode, stu.fname, stu.lname, mks.studentId
                 FROM marks mks, students stu
                 WHERE  mks.studentId = stu.studentId 
                  && mks.coursecode = ? 
                  && semesterDateCode = ?`;

    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function postEnrollStudent(req, res) {
    const sql = `INSERT INTO marks 
                    ( studentId, courseCode, semesterDateCode,adminId)
                  VALUES(?)`;
    const values = [
      req.body.studentId,
      req.body.courseCode,
      req.body.semesterDateCode,
      req.body.adminId
    ];

    db.query(sql,
      [values],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function getSingleEnrolledStudent(req, res, next) {
    const stud = req.params.studentId;
    const studentid = decodeURIComponent(stud);
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);

    const sql = `SELECT mks.courseCode, mks.semesterDateCode, stu.fname, stu.lname, mks.studentId
                 FROM marks mks, students stu
                 WHERE  mks.studentId = stu.studentId 
                  && mks.coursecode = ? 
                  && mks.semesterDateCode = ?
                  && mks.studentId = ? `;
    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`, `${studentid}`],
      (err, result) => {
        if (err) { res.send(err); }
        req.enrolledstudent = result;
        debug(coursecode, semesterdatecode, studentid);
        return next();
      });
  }

  function updateEnrolledStudent(req, res) {
    const stud = req.params.studentId;
    const studentid = decodeURIComponent(stud);
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);

    const sql = `UPDATE marks SET
        courseCode ='${req.body.courseCode}',
        semesterDateCode ='${req.body.semesterDateCode}',
        adminId ='${req.body.adminId}' 
        WHERE coursecode = ? 
        && semesterDateCode = ?
        && studentId = ?`;

    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`, `${studentid}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function deleteEnrolledStudent(req, res) {
    const stud = req.params.studentId;
    const studentid = decodeURIComponent(stud);
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);

    const sql = `DELETE FROM marks WHERE coursecode = ? 
                  && semesterDateCode = ?
                  && studentId = ?`;
    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`, `${studentid}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function getAllUnEnrolledStudents(req, res) {
    const coursecode = req.params.courseCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const intakedate = semesterdatecode.slice(0, 10);

    const sql = `SELECT fname, lname, studentId 
                 FROM students 
                 WHERE studentId NOT IN ( SELECT studentId FROM marks WHERE courseCode = ? 
                  && semesterDateCode = ?)
                  && intakeDate = ?`;
    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`, `${intakedate}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function getMarks(req, res) {
    // marks/coursecode/:courseCode/courseunit/:courseUnitCode/sem/:semesterDateCode'
    const coursecode = req.params.courseCode;
    const courseunitcode = req.params.courseUnitCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);

    const sql = `SELECT  DISTINCT mks.studentId, stu.fname, 
                        stu.lname, mks.courseUnitCode, cu.courseUnitName,
                        mks.courseWork, mks.midExam, mks.finalExam, mks.totalmark, mks.gradeCode, mks.courseCode 
                  FROM marks mks, students stu, courseUnits cu
                  WHERE stu.studentId = mks.studentId 
                        && mks.coursecode = ?
                        && mks.courseUnitCode = ?
                        && mks.courseUnitcode = cu.courseUnitcode 
                        && mks.semesterDateCode = ? `;
    db.query(sql,
      [`${coursecode}`, `${courseunitcode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function getSingleStudentMark(req, res) {
    const coursecode = req.params.courseCode;
    // const courseunitcode = req.params.courseUnitCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);

    const stud = req.params.studentId;
    const studentid = decodeURIComponent(stud);

    const sql = `SELECT  DISTINCT mks.studentId, stu.fname, 
                    stu.lname, mks.courseUnitCode, cu.courseUnitName,
                    mks.courseWork, mks.midExam, mks.finalExam, mks.totalmark, mks.gradeCode
                FROM marks mks, students stu, courseUnits cu
                WHERE stu.studentId = mks.studentId 
                    && mks.coursecode = ?
                && mks.courseUnitcode = cu.courseUnitcode 
                    && mks.semesterDateCode = ?
                    && mks.studentId = ? `;
    db.query(sql,
      [`${coursecode}`, `${semesterdatecode}`, `${studentid}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(semesterdatecode, studentid, coursecode);
        return res.send(result);
      });
  }

  function updateStudentMark(req, res) {
    const coursecode = req.params.courseCode;
    const courseunitcode = req.params.courseUnitCode;
    const sem = req.params.semesterDateCode;
    const semesterdatecode = decodeURIComponent(sem);
    const stud = req.params.studentId;
    const studentid = decodeURIComponent(stud);
    //marks
    const midexam = req.params.midExam;
    const coursework = req.params.courseWork;
    const finalexam = req.params.finalExam;
    const totalmark = req.params.totalMark;
    const gradecode = req.params.gradeCode;

    const sql = ` UPDATE marks  SET 
                      midExam =?,
                      courseWork = ?,
                      finalExam = ?,
                      totalmark = ?,
                      gradeCode =?
                  WHERE studentId = ? &&
                        courseCode = ? &&
                      courseUnitCode = ? &&
                      semesterDateCode = ? `;
    db.query(sql,
      [`${midexam}`, `${coursework}`, `${finalexam}`, `${totalmark}`, `${gradecode}`, `${studentid}`, `${coursecode}`, `${courseunitcode}`, `${semesterdatecode}`],
      (err, result) => {
        if (err) { res.send(err); }
        debug(semesterdatecode, studentid, coursecode);
        return res.send(result);
      });
  }

  // using patch to act as if deleting the student marks
  // function deleteStudentMark(req, res) {
  //   const coursecode = req.params.courseCode;
  //   const courseunitcode = req.params.courseUnitCode;
  //   // semsester dates
  //   const sem = req.params.semesterDateCode;
  //   const semesterdatecode = decodeURIComponent(sem);
  //   // student id
  //   const stud = req.params.studentId;
  //   const studentid = decodeURIComponent(stud);

  //   const sql = `DELETE courseUnitCode FROM marks 
  //                WHERE  coursecode = ?  
  //                && courseUnitcode = ?
  //                && semesterDateCode = ?
  //                && studentId = ? `;

  //   db.query(sql,
  //     [`${coursecode}`, `${courseunitcode}`, `${semesterdatecode}`, `${studentid}`],
  //     (err, result) => {
  //       if (err) { res.send(err); }
  //       debug(semesterdatecode, studentid, coursecode);
  //       return res.send(result);
  //     });
  // }


  return {
    // studentApplications
    getAllStudentApplications,
    saveStudentApplication,
    getSingleStudentApp,
    updateStudentApp,
    deleteStudentApp,

    // student Admission
    getAllStudentAdmissions,
    saveStudentAdmission,
    // getSingleStudentAdmission,
    // updateStudentAdmission,
    // deleteStudentAdmission,

    // courseunitallocation
    getAllDepartCoursesSemDate,
    getcourseUnitAllocations,
    postCourseUnitAllocation,
    getSingleCourseUnitAllocation,
    updateCourseUnitAllocation,
    deleteCourseUnitAllocation,

    // Enroll students
    getAllEnrolledStudents,
    postEnrollStudent,
    getSingleEnrolledStudent,
    updateEnrolledStudent,
    deleteEnrolledStudent,

    // Unenrolled Student
    getAllUnEnrolledStudents,

    // marks
    getMarks,
    getSingleStudentMark,
    updateStudentMark,
    // using patch to act as if deleting the student marks
    // deleteStudentMark

  };
}

module.exports = registrarController();