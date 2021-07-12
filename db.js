const mysql = require('mysql');
const debug = require('debug')('app:db');

// db connections
const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  // server: 'localhost',
  database: 'studentRecords',
  flags: '+IGNORE_SPACE'
});


// to be used for cpanel

// // db connections
// const pool = mysql.createPool({
//   connectionLimit: 100,
//   host: 'localhost',
//   user: 'greenpas_users',
//   password: 'W+e&!9m?ElQ%',
//   // server: 'localhost',
//   database: 'greenpas_studentRecords',
//   // flags: '+IGNORE_SPACE'
// });


// testing connection
// eslint-disable-next-line prefer-arrow-callback
pool.query('SELECT 1 + 1 AS solution', function qns(error, results, fields) {
  if (error) {
    return debug(error);
  }
  debug('connected ');
});
module.exports = pool;
