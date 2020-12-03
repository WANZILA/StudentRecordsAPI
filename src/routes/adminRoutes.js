/* eslint-disable linebreak-style */
const express = require('express');

const adminsController = require('../controller/adminsController');

function adminRouters() {
  const adminRouter = express.Router();
  const controller = adminsController;

  adminRouter.route('/')
    // .post(controller.post)
    .get(controller.get);

  return adminRouter;
}
module.exports = adminRouters;
