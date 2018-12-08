const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 150,
  host     : process.env.DYM_DB_HOST,
  user     : process.env.DYM_DB_USER,
  password : process.env.DYM_DB_PSS,
  // host     : 'localhost',
  // user     : 'root',
  // password : 'quepretty',
  database : 'heroku_aa5f4bff4de7c3d',
  debug    :  false,
  multipleStatements: true,
  queueLimit: 50,
  acquireTimeout:1000000,
  connectTimeout:0
});


const db_config = {
  query: function () {
    let queryArgs = Array.prototype.slice.call(arguments),
        events = [],
        eventNameIndex = {};

    pool.getConnection(function (err, conn) {
      if (err) {
        if (eventNameIndex.error) {
          eventNameIndex.error();
        }
      }
      if (conn) {
        let q = conn.query.apply(conn, queryArgs);
        q.on('end', function () {
          conn.release();
        });

        events.forEach(function (args) {
          q.on.apply(q, args);
        });
      }
    });

    return {
      on: function (eventName, callback) {
        events.push(Array.prototype.slice.call(arguments));
        eventNameIndex[eventName] = callback;
        return this;
      }
    };
  }
};

module.exports = db_config;
