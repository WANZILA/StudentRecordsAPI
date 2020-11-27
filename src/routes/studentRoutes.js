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
  // const studentsdb = [
  //   {
  //     fname: 'wano',
  //     lname: 'wawa',
  //     studentId: '121212'
  //   },
  //   {
  //     fname: 'ror',
  //     lname: 'wana',
  //     studentId: '121312'
  //   }
  // ];

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
            }
          });


        // pool.query(sql, [req.body.studentId,req.body.fname, req.body.mName], (err, result, fields) => {
        //   if (err) throw err;
        //   res.send(result);
        // });

        //return res.json(result);
    
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
    });

  return studentRouter;
}
module.exports = studentRouters;
