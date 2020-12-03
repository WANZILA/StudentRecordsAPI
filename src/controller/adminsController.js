const debug = require('debug')('app:adminController');
const db = require('../../db');

function adminsController() {
  function get(req, res) {
    const sql = 'select * from admins';

    db.query(sql,
      (err, result) => {
        if (err) { res.send(err); }
        return res.send(result);
      });
  }

  function post(req, res){
    const sql =
  }

  return { get };
}

module.exports = adminsController();
