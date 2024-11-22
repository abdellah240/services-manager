const express = require("express");
const getServices = require("./getServices"); 
const addService = require("./addService");   
const deleteService = require("./deleteService");
const editService = require("./editService");

// Import db (connection)
const db = require("../db2");  

const router = express.Router(); // Similar to "const app=express()". Does not start a server.
    
//Setup routes, pass db to functions
router.get("/", getServices(db));
router.post("/", addService(db));
router.delete("/", deleteService(db));
router.put('/', editService(db));

module.exports = router;