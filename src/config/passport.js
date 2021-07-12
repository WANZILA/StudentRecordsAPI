/* eslint-disable prefer-arrow-callback */
// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../../db');


db.query('USE vidyawxx_build2');

module.exports = function passportConfig(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function yes1(user, done) {
    done(null, user.adminId);
  });

  // used to deserialize the user
  passport.deserializeUser(function yes3(id, done) {
    const sql = `SELECT  username, passwords, adminId 
      FROM  admins 
      WHERE adminId= ?`;
    db.query(sql,
      [`${id}`],
      function get4(err, result) {
        return done(err, result[0]);
      });
  });
  
  // local login
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


// // require('./strategies/local.strategy');

// module.exports = function passportConfig(app) {
//   // passport sets itsself up
//   app.use(passport.initialize());
//   app.use(passport.session());

//   // stores user in the session
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });

//   // Retrieves user from session
//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });

// };
