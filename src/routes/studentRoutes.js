/* eslint-disable linebreak-style */
const bodyParser = require('body-parser');
const express = require('express');
const debug = require('debug')('app:studentRoutes');
const mysql = require('mysql');

const studentRouter = express.Router();

const studentNav = [
  { link: '/addStudent', title: 'Add Student' },
  { link: '/deleteStudent', title: 'Delete Student' },
  { link: '/studentSearch', title: 'Search' }
];

function studentRouters(nav, title, pool) {
  studentRouter.route('/')
    .post((req, res) => {
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

      pool.query(sql,
        [values],
        (err, result) => {
          if (err) {
            res.json(err);
          } else {
            res.send(result);
            // return res.json(result);
          }
        });
    })
    .get((req, res) => {
      const sql = 'select * from students';
      pool.query(sql,
        (err, result) => {
          if (err) {
            res.json(err);
          } else {
            // debug(result);
            // return res.render(
            //   'studentsListView',
            //   {
            //     nav,
            //     title,
            //     studentNav,
            //     studentsdb: result
            //   });

            // using postman
            res.send(result);
          }
        });
    });

  studentRouter.route('/:studentid')
    .all((req, res, next) => {
      // sample id = A18%2FCCM%2F08
      const stu = req.params.studentid;
      const studentId = decodeURIComponent(stu);
      // sample of encoding and decording
      // console.log(encodeURIComponent(studentId));
      pool.query('select * from students where studentId = ?',
        [`${studentId}`],
        (err, result) => {
          if (err) {
            res.json(err);
          } else {
            // debug(result);
            // console.log(result);
            if (result) {
              req.student = result;
              return next();
            }
            // when not found
            return res.sendStatus(404);
          }
        });
    })
    .get((req, res) => {
      // res.json(req.student);
      // using postman
      res.send(req.student);
    })
    .patch((req, res) => {
      // geting the selected student from the .all middleware
      // Object destructuring
      const stu = req.params.studentid;
      const studentId = decodeURIComponent(stu);

      const sql = `Update students SET 
      fname = '${req.body.fname}',
      mName = '${req.body.mName}',
      lname = '${req.body.lname}',
      title = '${req.body.title}',
      birthDate = '${req.body.birthDate}',
      gender = '${req.body.gender}',
      maritalStatus = '${req.body.maritalStatus}',
      children = '${req.body.children}',
      branchNum = '${req.body.branchNum}',
      localAddress1 = '${req.body.localAddress1}',
      localAddress2 = '${req.body.localAddress2}',
      phoneAddress1 = '${req.body.phoneAddress1}',
      phoneAddress2 = '${req.body.phoneAddress2}',
      emailAddress = '${req.body.emailAddress}',
      intakeDate = '${req.body.intakeDate}',
      EntryLevel = '${req.body.EntryLevel}',
      studentStatus = '${req.body.studentStatus}',
      adminId = '${req.body.adminId}',
      courseCode = '${req.body.courseCode}',
      password = '${req.body.password}'
      WHERE studentId =?`;

      pool.query(sql,
        [`${studentId}`],
        (err, result) => {
          if (err) {
            res.json(err);
          }
          else {
            // console.log(studentId);
            res.send('updated');
            debug(result);
          }
        });
    })
    .delete((req, res) => {
      const stu = req.params.studentid;
      const studentId = decodeURIComponent(stu);
      // eslint-disable-next-line prefer-destructuring
      // const studentId = req.student.studentId;
      pool.query('DELETE from students WHERE studentId=?',
        [`${studentId}`],
        (err, result) => {
          if (err) {
            res.json(err);
          }
          else {
            console.log(studentId);
            res.send('deleted');
            debug(result);
          }
        });
    });

  return studentRouter;
}
module.exports = studentRouters;
