/* eslint-disable prefer-arrow-callback */
const passport = require('passport');
const { LocalStrategy } = require('passport-local');
// const debug = require('debug')('app:local.strategy');
const db = require('../../../db');


module.exports = function localStrategy() {
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password
    usernameField: 'username',
    passwordField: 'passwords',
    passReToCallback: true
  },
    function get1(req, username, passwords, done) {

      const sql = `SELECT  username, passwords, adminId 
      FROM  admins 
      WHERE username= ? && passwords=?`;

    db.query(sql,
        [`${username}`, `${passwords}`],
        function get2(err, result) {
          if (err) { return done(err); }

          if (!result.length) {
            return done(null, false, req.flash('loginMessage', 'No user found.'));
          };

          // if the user is found but the password is wrong
          if (!(result[0].password == password)) {
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
          }

          // all is well, return successful user
          return done(null, rows[0]);
    });
  }));
};
