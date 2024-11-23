const mysql = require("mysql");
const { checkout } = require("./checkout");

const checkoutDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'client-payment-info'
})

checkoutDB.connect((err) => {
    if (err) {
      console.error("Error connecting to DB:", err.message);
    } else {
      console.log("Connected to DB");
    }
  });

  module.exports = checkoutDB;