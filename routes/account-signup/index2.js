const express = require("express");
const signUpInfo = require("./signUpInfo"); 

// Import db (connection)
const db2 = require("../db2");  

//const router = express.Router(); // Similar to "const app=express()". Does not start a server.
    
//Setup routes, pass db to functions
router.post('/', signUpInfo(db2));

//module.exports = router;