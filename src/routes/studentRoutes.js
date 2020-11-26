/* eslint-disable linebreak-style */
const bodyParser = require('body-parser');
const express = require('express');
const debug = require('debug')('app:studentRoutes');

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
    .get((req, res) => {
      const sql = 'select * from students limit 2';
      pool.query(sql,
        (err, result) => {
          if (err) {
            res.json(err);
          } else {
            // debug(result);
            return res.render(
              'studentsListView',
              {
                nav,
                title,
                studentNav,
                studentsdb: result
              });
          }
        });
    });

  studentRouter.route('/:studentid')
    .all((req, res, next) => {
      // using object destructuring
      const stu = req.params.studentid;
      const studentId = decodeURIComponent(stu);
      // sample of encodeing and decording
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
      res.json(req.student);
    })
    .patch((req, res) => {
      const { student } = req;

      // no update of studentId
      if (req.body.studentId) {
        delete req.body.studentId;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        // for each key update it with the value
        student[key] = value;
      });
      req.body.student.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(student);
      });
    });

  // pool.query('select * from students where studentId = ?',
  //     [`${studentId}`],
  //   (err, result) => {
  //     if (err) {
  //       res.json(err);
  //     } else {
  //       debug(result);
  //       console.log(result);
  //       return res.render(
  //         'studentDetails',
  //         {
  //           nav,
  //           title,
  //           studentNav,
  //           student: result[studentId]
  //         }
  //       );
  //       // debug(result);
  //     }
  //   });

  // pool.query(sql,
  //   (err, result) => {
  //     if (err) {
  //       res.json(err);
  //     } else {
  //       debug(result);
  //       console.log(result);

  //       return res.render(
  //         'studentDetails',
  //         {
  //           nav,
  //           title,
  //           studentNav,
  //           student: result[studentId]
  //         }
  //       );
  //     }
  //   });



  return studentRouter;
}
module.exports = studentRouters;
