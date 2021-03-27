const express = require('express')
//router allows the creation of modular, mountable route handlers ref: https://expressjs.com/en/guide/routing.html
const router = express.Router()

//testing routes
//home page of client
router.get("/", function(req, res) {
    
    res.send("routes working")
});

//BUSINESS ROUTERS

//POST ROUTERS

//COMMENT ROUTERS


module.exports = router;