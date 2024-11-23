const express = require("express");
const loginCustomer = require("./login");

// Import db (connection)
const mainDatabase = require("../main-db");

const router = express.Router(); // Similar to "const app=express()". Does not start a server.

//Setup routes, pass db to functions
router.post("/", loginCustomer(mainDatabase));

module.exports = router;
