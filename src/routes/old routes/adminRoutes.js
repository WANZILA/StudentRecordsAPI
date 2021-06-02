/* eslint-disable linebreak-style */
const express = require('express');

const adminsController = require('../../controller/adminsController');

function adminRouters() {
  const adminRouter = express.Router();
  const controller = adminsController;

  adminRouter.route('/')
    // .post(controller.post)
    .get(controller.get);

  adminRouter.route('/add')
    .post(controller.post);

  adminRouter.route('/:adminId')
    .all(controller.alls)
    .get((req, res) => {
      res.send(req.admin);
    })
    .patch(controller.patch)
    .delete(controller.deletes);

  return adminRouter;
}
module.exports = adminRouters;
