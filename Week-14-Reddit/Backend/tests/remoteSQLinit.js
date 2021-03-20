// const mysql = require('mysql');
// import mysql from 'mysql';
// var mysql = import('mysql');
import * as mysql from 'mysql';
import * as dns from 'dns';

dns.lookup('buk.b2center.de', console.log);

const db = mysql.createConnection({
  host: 'buk.b2center.de',
  user: 'd035d455',
  password: '5mmuYV8hfG8Rop9P',
  database: 'd035d455',
  // port: 3306,
});

db.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + db.threadId);
});

db.query('CREATE TABLE IF NOT EXISTS bukObase (title VARCHAR(255) NOT NULL);', (err) => {
  if (err) {
    console.error(`Cannot retrieve data: ${err.toString()}`);
    return null;
  }
  db.end();
});
