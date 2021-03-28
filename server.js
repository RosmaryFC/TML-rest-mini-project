//DEPENDENCIES
require('dotenv').config()
const express  = require ("express");

//DATABASE
const db = require('./db') 



//GLOBAL VARIABLES
const PORT = process.env.PORT || 3000;

const app = express();


//MIDDLEWARE
//TODO: I understand that this is for passing static files, but this isn't really needed for backend, right? - commenting out for now
// ref: https://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"))

//parses incoming requests with JSON 
app.use(express.json())

//processes form data
app.use(express.urlencoded())

//ROUTES
app.get("/", async function  (req, res) {
    //used to test connection between db and backend
    // try{
    //     const businesses = await db.any('select * from businesses');
    //     res.status(200)
    //     return res.json(businesses)
    // } catch (err) {
    //     res.status(500).send(err)
    // }
    try{
        res.status(200)
        return res.json("hello world")
    }catch(err) {
        res.status(500).send(err)
    }
});



//BUSINESS ROUTERS
//route: /business POST
//create a business
app.post("/business", function(req, res) {
    //get data from req.body
    //db query to add business to business table
    //route to /business
});

//route: /business GET
// shows all businesses created
app.get("/business", function(req, res) {
    //sql query to select * from businesses

    //furniture making biz - 1
    //web deve biz -2

    res.send("show businesses")
});

//route: /business/id/:id GET
//shows business with that id, and its posts
app.get("/business/id/:id", function(req, res) {
    //get the business id from the route params
    //db query for that specific id and its posts
    //return query
    res.send("show specific business")
});

//route: /business/id/:id PUT
//will update business info
app.put("/business/id/:id", function(req, res) {
    //get data from req.body
    //receive data from fronted
    //db query to update business data in business table
});

//route: /business/id/:id DELETE
//will delete business, posts, comments
app.delete("/business/id/:id", function(req, res) {
    //db query to remove business data in business table, along with posts and comments

    //return 200 - OK

});



//BUSINESS POST ROUTERS
//route: /business/id/:id POST
//create a post
app.post("/business/id/:id", function(req, res) {
    //get data from req.body
    //query to insert data into business table

    //return post data - 200 ok

});

//route: /business/id/:id/post/:postid GET
//get post info and comments for specific business
app.get("/business/id/:id/post/:postid", function(req, res) {


    res.send("show post")
});

//route: /business/id/:id/post/:postid PUT
//update a post
app.put("/business/id/:id/post/:postid", function(req, res) {
    //query to update post with specific id

});

//route: /business/id/:id/post/:postid DELETE
//delete a post
app.delete("/business/id/:id/post/:postid", function(req, res) {

});



//COMMENT ROUTERS
//route: /business/id/:id/post/:postid/ POST
//create comment
app.post("/business/id/:id/post/:postid", function(req, res) {
    //get data from req.body

});

//route: /business/id/:id/post/:postid/comments GET
//get all comments for specific post
app.get("/business/id/:id/post/:postid/comment", function(req, res) {
    //get data from req.body

});


//route: /business/id/:id/post/:id/comment/:commentid DELETE
//delete a comment
app.delete("/business/id/:id/post/:postid/comment/:commentid", function(req, res) {
    //query to delete a comment

});



//LISTENER
app.listen(PORT, () => {
    console.log("started on http://localhost:"+PORT)
});