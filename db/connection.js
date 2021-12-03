const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Almita3758',
      database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
  );
  connection.connect(function(err) {
    if (err) throw err;
  });

  module.exports = connection;