import * as fs from 'fs';
import * as mysql from 'mysql';
import * as fastcsv from 'fast-csv';

let stream = fs.createReadStream('users.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function (data) {
    csvData.push(data);
  })
  .on('end', function () {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '2EFWg#z!jgu329',
      database: 'bukobase',
    });

    // open the connection
    connection.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query =
          'INSERT INTO userdata (id, prefix, first_name, last_name, address, height, bitcoin_address, color_preference) VALUES ?';
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });
