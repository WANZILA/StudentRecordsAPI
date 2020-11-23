/* eslint-disable quotes */
/* eslint-disable linebreak-style */
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
    .get((req, res) => {
      // using object destructuring
      const stu = req.params.studentid;
      const studentId = decodeURIComponent(stu);
      // sample of encodeing and decording
      // console.log(encodeURIComponent(studentId));
      // console.log(decodeURIComponent(studentId));

      // const studentId = connection.escape(stu);

      // debug(studentId);
      //const sql = `select * from students where studentId = ` + `${studentId}`;
      // const sql = `select * from students where studentId = "22A18/CCM" `;  //studentdetails
      // const sql = 'select * from students limit 2';

      pool.query('select * from students where studentId = ?',
        [`${studentId}`],
        (err, result) => {
          if (err) {
            res.json(err);
          } else {
            debug(result);
            // console.log(result);
            return res.send(result);
            // debug(result);
          }
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


    });
  return studentRouter;
}
module.exports = studentRouters;
