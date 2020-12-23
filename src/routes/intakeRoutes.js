const express = require('express');

const intakesController = require('../controller/intakesController');

function intakeRouters() {
  const intakeRouter = express.Router();
  const controller = intakesController;

  intakeRouter.route('/')
    .get(controller.getAll);

  intakeRouter.route('/add')
    .post(controller.singlePost);

  intakeRouter.route('/:intakeDate')
    .all(controller.singleSelect)
    .get((req, res) => {
      res.send(req.intake);
    })
    .patch(controller.patch)
    .delete(controller.deleteSingle);


  return intakeRouter;
}

module.exports = intakeRouters;
