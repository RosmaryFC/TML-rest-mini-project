//DEPENDENCIES
const express  = require ("express");

//GLOBAL VARIABLES
const PORT = process.env.PORT || 3000;

const app = express();


//MIDDLEWARE
//TODO: I understand that this is for passing static files, but this isn't really needed for backend, right? - commenting out for now
// ref: https://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"))

//parses incoming requests with JSON 
app.use(express.json())

//ROUTES
app.get("/", function(req, res) {
    res.send("hello")
});


//BUSINESS ROUTERS

//POST ROUTERS

//COMMENT ROUTERS



//LISTENER
app.listen(PORT, () => {
    console.log("started on http://localhost:"+PORT)
});