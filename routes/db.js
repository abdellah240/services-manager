const mysql = require("mysql");

// Define object to connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "services_manager",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to DB:", err.message);
  } else {
    console.log("Connected to DB");
  }
});

module.exports = db;
