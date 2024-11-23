const express = require("express");
const storePayment = require("./storePayment"); 

// Import db (connection)
const checkoutDB = require("../checkoutDB");  

const router = express.Router(); // Similar to "const app=express()". Does not start a server.
    
//Setup routes, pass db to functions
router.post('/', storePayment(checkoutDB));

module.exports = router;