const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Almita3758',
      database: 'employee_tracker'
    },
    console.log('Connected to the election database.')
  );

  module.exports = db;