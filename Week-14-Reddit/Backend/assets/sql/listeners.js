export default function listeners(dbPool) {
  dbPool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
  });
  dbPool.on('connection', function (connection) {
    //connection.query('SET SESSION auto_increment_increment=1');
    console.log('MySQL Connection Established: ', connection.threadId);
  });
  dbPool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
  });
}
