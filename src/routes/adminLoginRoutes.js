const express = require('express');
const debug = require('debug')('app:adminLoginRoutes');
const passport = require('passport');
const db = require('../../db');


const adminLogRouter = express.Router();

function adminLoginRouter() {
  adminLogRouter.route('/signup')
    .post((req, res) => {
      // const { username, passwards } = req.body;

      const sql = `SELECT  username, passwords, adminId 
      FROM  admins 
      WHERE username='user' && passwords='123'`;

      db.query(sql,
        (err, result) => {
          if (err) { res.send(err); }
          return result;
        });

      debug(req.body);
      // create user
      req.login(req.body, () => {
        res.redirect('adminlogin/profile');
      });
      // // sends back properly formated json
      // res.json(req.body);
    });
  adminLogRouter.route('/signin')
    .get((req, res) => {
      res.send('hi');
      // res.render('sigin');
    })
    // passport handles all the processing for us
    // we us the local strategy to aunthenticate the user
    .post(passport.authenticate('local', {
      successRedirect: '/adminlgin/profile',
      failureRedirect: '/'
    }));
  adminLogRouter.route('/profile')
    .all((req, res, next) =>{
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      debug('congs');
      res.json(req.user);
    });
  return adminLogRouter;
}

module.exports = adminLoginRouter;