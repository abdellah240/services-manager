const express = require("express");
const editAccount = require("./editAccount"); 
const getAccountInfo = require("./getAccountInfo");
// Import db (connection)
const db = require("../main-db");  

const router = express.Router(); // Similar to "const app=express()". Does not start a server.
    
//Setup routes, pass db to functions
router.put('/', editAccount(db));
router.post('/', getAccountInfo(db));
module.exports = router;