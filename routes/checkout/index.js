const express = require("express");
const storePayment = require("./storePayment"); 
const confirmOrders = require("./confirmOrders");

// Import db (connection)
const checkoutDB = require("../main-db");  

const router = express.Router(); // Similar to "const app=express()". Does not start a server.
    
//Setup routes, pass db to functions
router.post('/', storePayment(checkoutDB));
router.get('/', confirmOrders(checkoutDB));

module.exports = router;