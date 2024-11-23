const mysql = require("mysql2");

const mainDatabase = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'secret',
    database: 'services-manager'
})

mainDatabase.connect((err) => {
    if (err) {
      console.error("Error connecting to DB:", err.message);
    } else {
      console.log("Connected to DB");
    }
  });

  module.exports = mainDatabase;