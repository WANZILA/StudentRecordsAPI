/* eslint-disable linebreak-style */
// const bodyParser = require('body-parser');
const express = require('express');
// const debug = require('debug')('app:studentRoutes');
// const mysql = require('mysql');

// just returns the studentsController fn 
const studentsController = require('../../controller/old/studentsController');

// const studentNav = [
//   { link: '/addStudent', title: 'Add Student' },
//   { link: '/deleteStudent', title: 'Delete Student' },
//   { link: '/studentSearch', title: 'Search' }
// ];

function studentRouters() {
  const studentRouter = express.Router();
  const controller = studentsController();

  studentRouter.route('/')
    .get(controller.get);

  studentRouter.route('/intakedate/:intakeDate/branch/:branchNum/studyprogramme/:studyProgNum')
    .get(controller.getIntakeBranchStudents);

  studentRouter.route('/add')
    .post(controller.post);

  studentRouter.route('/:studentId')
    .all(controller.alls)
    .get((req, res) => {
      // res.json(req.student);
      // using postman
      res.send(req.student);
    })
    .put(controller.updateStudent)
    .delete(controller.del);
  return studentRouter;
}
module.exports = studentRouters;
