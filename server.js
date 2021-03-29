//DEPENDENCIES
require('dotenv').config()
const express  = require ("express")

//DATABASE
const db = require('./db')
const Business = require('./controllers/Business')
const business = new Business()
const Post = require('./controllers/Post')
const post = new Post()
const Comment = require('./controllers/Comment')
const comment = new Comment()

//GLOBAL VARIABLES
const PORT = process.env.PORT || 3000
const app = express()

//MIDDLEWARE
//TODO: I understand that this is for passing static files, but this isn't really needed for backend, right? - commenting out for now
// ref: https://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"))

//parses incoming requests with JSON 
app.use(express.json())

//processes form data
app.use(express.urlencoded({extended:true}))


//ROUTES
app.get("/", async (req, res) => {
    res.send("home page")
})

//BUSINESS ROUTERS
// shows all businesses created
app.get("/business", business.getAllBusinesses)

//create a business
app.post("/business", business.createBusiness)

//shows business with that id
app.get("/business/:id", business.getBusiness)

//will update business info
app.put("/business/:id", business.updateBusiness)

//will delete business, posts, comments
app.delete("/business/:id", business.deleteBusiness)


//get all posts for a business
app.get("/business/:id/posts", post.getPosts)

//BUSINESS POST ROUTERS
//create a post
app.post("/business/:id/posts", post.createPost)

//update a post //query to update post with specific id
app.put("/business/:id/posts/:postid",post.updatePost)

//delete a post
app.delete("/business/:id/posts/:postid", post.deletePost)


//COMMENT ROUTERS
//create comment
app.post("/business/:id/posts/:postid/comments", comment.createComment)

//get all comments for specific post
app.get("/business/:id/posts/:postid/comments", comment.getComments)

//delete a comment
app.delete("/business/:id/posts/:postid/comments/:commentid", comment.deleteComment)

//LISTENER
app.listen(PORT, () => {
    console.log("started on http://localhost:"+PORT)
})