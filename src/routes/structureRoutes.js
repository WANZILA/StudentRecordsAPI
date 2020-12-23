const express = require('express');
const structuresController = require('../controller/structuresController');

function structureRoutes() {
  const structureRouter = express.Router();
  const controller = structuresController;

  structureRouter.route('/semesterdates')
    .get(controller.getAllSemesterDates);

  structureRouter.route('/semesterdates/addSemesterDate')
    .post(controller.addSemesterDate); 

  structureRouter.route('/semesterdates/:semesterDateCode')
  // .all() is a default router middleware fn
    .all(controller.getSingleSemester)
    .get((req, res) => {
      res.send(req.semester);
    })
    .patch(controller.semesterUpdate);

  return structureRouter;
}

module.exports = structureRoutes;
