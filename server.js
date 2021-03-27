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
    res.send("home page")
});



//BUSINESS ROUTERS
//route: /business GET
// shows all businesses created
app.get("/business", function(req, res) {
    res.send("show businesses")
});

//route: /business POST
//create a business
app.post("/business", function(req, res) {

});

//route: /business/id/:id GET
//shows business with that id, and its posts
app.get("/business/id/:id", function(req, res) {
    res.send("show specific business")
});

//route: /business/id/:id PUT
//will update business info
app.put("/business/id/:id", function(req, res) {

});

//route: /business/id/:id DELETE
//will delete business, posts, comments
app.delete("/business/id/:id", function(req, res) {

});



//POST ROUTERS
//route: /business/id/:id POST
//create a post
app.post("/business/id/:id", function(req, res) {

});

//route: /business/id/:id/post/:postid GET
//get post info and comments for specific business
app.get("/business/id/:id/post/:postid", function(req, res) {
    res.send("show post")
});

//route: /business/id/:id/post/:postid PUT
//update a post
app.put("/business/id/:id/post/:postid", function(req, res) {

});

//route: /business/id/:id/post/:postid DELETE
//delete a post
app.delete("/business/id/:id/post/:postid", function(req, res) {

});



//COMMENT ROUTERS
//route: /business/id/:id/post/:postid/ POST
//create comment
app.post("/business/id/:id/post/:postid", function(req, res) {

});

//route: /business/id/:id/post/:postid/comments GET
//get all comments for specific post
app.post("/business/id/:id/post/:postid/comment", function(req, res) {

});


//route: /business/id/:id/post/:id/comment/:commentid DELETE
//delete a comment
app.delete("/business/id/:id/post/:postid/comment/:commentid", function(req, res) {

});



//LISTENER
app.listen(PORT, () => {
    console.log("started on http://localhost:"+PORT)
});