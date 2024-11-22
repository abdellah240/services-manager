const mysql = require("mysql");

// Define object to connect to database
const db2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signupdb",
});

db2.connect((err) => {
  if (err) {
    console.error("Error connecting to DB:", err.message);
  } else {
    console.log("Connected to DB");
  }
});

module.exports = db2;