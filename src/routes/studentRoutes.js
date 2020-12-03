/* eslint-disable linebreak-style */
// const bodyParser = require('body-parser');
const express = require('express');
// const debug = require('debug')('app:studentRoutes');
// const mysql = require('mysql');

// just returns the studentsController fn 
const studentsController = require('../controller/studentsController');

// const studentNav = [
//   { link: '/addStudent', title: 'Add Student' },
//   { link: '/deleteStudent', title: 'Delete Student' },
//   { link: '/studentSearch', title: 'Search' }
// ];

function studentRouters(nav, title, pool) {
  const studentRouter = express.Router();
  const controller = studentsController(pool);
 
  studentRouter.route('/')
    .post(controller.post)
    .get(controller.get);

  studentRouter.route('/:studentid')
    .all(controller.alls)
    .get((req, res) => {
      // res.json(req.student);
      // using postman
      res.send(req.student);
    })
    .patch(controller.patch)
    .delete(controller.del);

  return studentRouter;
}
module.exports = studentRouters;
