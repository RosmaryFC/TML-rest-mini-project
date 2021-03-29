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
app.use(express.static("public"))

//parses incoming requests with JSON 
app.use(express.json())

//processes form data
app.use(express.urlencoded())


//ROUTES
app.get("/", async function  (req, res) {
    //used to test connection between db and backend
    try{
        const businesses = await db.any('select * from businesses');
        res.status(200)
        return res.json(businesses)
    } catch (err) {
        res.status(500).send(err)
    }

    // try{
    //     res.status(200)
    //     return res.json("hello world")
    // }catch(err) {
    //     res.status(500).send(err)
    // }
    
});

//BUSINESS ROUTERS
//route: /business GET
// shows all businesses created
app.get("/business", async function (req, res) {
    //sql query to select * from businesses
    try{
        const businesses = await db.any(`SELECT * FROM businesses`)
        return res.json(businesses)
    } catch(err){
        res.status(500).send(err)
    }
    //furniture making biz - 1
    //web deve biz -2
});

//route: /business POST
//create a business
//TODO: not going through
app.post("/business", async (req, res) => {
    //TODO: logic for when user does not pass in description, logo, or either
    console.log("request", req.body)
    try{
        await db.none(
            "INSERT INTO businesses (business_name, description, logo) VALUES (${business_name}, ${description}, ${logo})",
        req.body);
        return res.json({
            message: "success"
        });
    } catch(err){
        res.status(500).send(err)
    }
    //get data from req.body
    //db query to add business to business table
    //route to /business
});


// //route: /business/id/:id GET
// //shows business with that id
// app.get("/business/:id", async(req, res) =>{
//     const businessId=parseInt(req.params.id,10)
//     try{
//         const business=await db.one(
//             "select * from business where id = $1",
//             id
//         )
//         return res.json(business)
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
//     //get the business id from the route params
//     //db query for that specific id and its posts
//     //return query
//     //res.send("show specific business")
// });

// //route: /business/id/:id PUT
// //will update business info
// app.put("/business/:id", async(req, res)=> {
//     const id=parseInt(req.params.id,10)
//     try{
//         await db.none("update business set business_name=$1, description=$2, logo=$3 where id = $6",[
//             req.body.business_name,
//             req.body.description,
//             req.body.logo,
//             req.body.created_at,
//             req.body.updated_at,
//             id
//         ])
//         res.json({
//             message: "success",
//         })
//     }
//     //get data from req.body
//     //receive data from fronted
//     //db query to update business data in business table
// });

// //route: /business/id/:id DELETE
// //will delete business, posts, comments
// app.delete("/business/:id", async(req, res) =>{
//     const id=parseInt(req.params.id,10)
//     try{
//         await db.none('delete from business where id=$1',
//         id)
//     }
//     res.json({
//         message:"success"
//     })
//     catch(err){
//         res.status(500).json(err)
//     }
//     //db query to remove business data in business table, along with posts and comments

//     //return 200 - OK

// });


// //route: /business/id/:id/post/:postid GET
// //get specific post info and comments for specific business

// //get all posts for a business
// app.get("/business/:id/posts", async(req,res)=>{
//     const id=parseInt(req.params.business_id,10)
//     try{
//         const posts=await db.any(`select * from posts where business_id=$1`,
//         id)
//         return res.json(posts)
//     }
//     catch(err){
//         res.status(500).send(err)
//     }
// }

// //BUSINESS POST ROUTERS
// //route: /business/id/:id POST
// //create a post
// app.post("/business/:id/posts", async(req, res) =>{
//     try{
//         await db.none(
//             'insert into posts (description,url,business_id) values (${description},${url},${business_id}',
//         req.body
//     }
//     return res.json({
//         message: "success"
//     })
//     }catch(err){
//         console.log(err)
//         res.status(500).send(err)
//     }
//     //get data from req.body
//     //query to insert data into business tablell,
//     //return post data - 200 ok

// });


// //route: /business/id/:id/post/:postid PUT
// //update a post
// app.put("/business/:id/posts/:postid", async(req, res)=> {
//     const postid=parseInt(req.body.id,10)
//     try{
//         await db.none('update posts set description=$1, url=$2, business_id=$3 where postid=$4',[
//         req.body.description,
//         req.body.url,
//         req.body.business_id,
//         postid
//     ])
//     res.json({
//         message: "success",
//     })
// }
//     //query to update post with specific id
// });

// //route: /business/id/:id/post/:postid DELETE
// //delete a post
// app.delete("/business/:id/posts/:postid", function(req, res) {
//     const postid=parseInt(req.body.id,10)
//     try{
//         await db.none('delete from posts where postid=$1',
//         postid)
//     }
//     res.json({
//         message:'success'
//     })
// });



// //COMMENT ROUTERS
// //route: /business/id/:id/post/:postid/ POST
// //create comment
// app.post("/business/:id/post/:postid/comments", function(req, res) {
//     try{
//         await db.none(
//             'insert into comments (description,post_id,business_id) values (${description},${post_id},${business_id}',
//         req.body
//     }
//     return res.json({
//         message: "success"
//     })
//     }catch(err){
//         console.log(err)
//         res.status(500).send(err)
//     }
//     //get data from req.body

// });

// //route: /business/id/:id/post/:postid/comments GET
// //get all comments for specific post
// app.get("/business/:id/post/:postid/comments", function(req, res) {
//     const postid=parseInt(req.body.post_id)
//     try{
//         const comments= await db.any(`select * from comments where postid=$1`,
//         postid)
//     }
//     res.json({
//         message:'success'
//     })
//     //get data from req.body

// });


// //route: /business/id/:id/post/:id/comment/:commentid DELETE
// //delete a comment
// app.delete("/business/:id/post/:postid/comments/:commentid", async(req, res) =>{
//     const commentid=parseInt(req.body.id)
//     try{
//         await db.none(`delete from comments where id=$1`,
//         commentid)
//     }
//     res.json({
//         message:'success'
//     })
//     //query to delete a comment

// });



//LISTENER
app.listen(PORT, () => {
    console.log("started on http://localhost:"+PORT)
});