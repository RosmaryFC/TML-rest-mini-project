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
    try{
        const businesses = await db.any(`SELECT * FROM businesses`)
        return res.json(businesses)
    } catch(err){
        res.status(500).send(err)
    }
});

//route: /business POST
//create a business
app.post("/business", async (req, res) => {
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
});


//route: /business/id/:id GET
//shows business with that id
app.get("/business/:id", async(req, res) =>{
    //get the business id from the route params
    const id=parseInt(req.params.id,10)
    try{
        const business = await db.one(
            "select * from businesses where id = $1",
            id
        )
        return res.json(business)
    }
    catch(err){
        res.status(500).json(err)
    }
});

//route: /business/id/:id PUT
//will update business info
app.put("/business/:id", async(req, res)=> {
    //get data from req.body
    const id=parseInt(req.params.id,10)
    try{
        await db.none("update businesses set business_name=$1, description=$2, logo=$3 where id = $4",[
            req.body.business_name,
            req.body.description,
            req.body.logo,
            id
        ])
        return res.json({
            message: "success",
        })
    }catch {
        res.status(500).json(err)
    }
});

//route: /business/id/:id DELETE
//will delete business, posts, comments
app.delete("/business/:id", async(req, res) =>{
    const id=parseInt(req.params.id,10)
    try{
        await db.none('delete from businesses where id=$1',
        id)
    return res.json({
        message:"success"
    })
    }catch(err){
        res.status(500).json(err)
    }
});


//route: /business/id/:id/post/:postid GET
//get specific post info and comments for specific business
//get all posts for a business
app.get("/business/:id/posts", async (req,res)=>{
    const id=parseInt(req.params.id,10)
    try{
        const posts= await db.any(`select * from posts where business_id=$1`,
        id)
        return res.json(posts)
    }
    catch(err){
        res.status(500).send(err)
    }
})

//BUSINESS POST ROUTERS
//route: /business/id/:id POST
//create a post
app.post("/business/:id/posts", async(req, res) =>{
    const business_id =parseInt(req.params.id,10)
    try{
        await db.none(
            `insert into posts (description, url, business_id) values ($<description>,$<url>,${business_id})`,
        req.body)
    return res.json({
        message: "success"
    })
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
});


//route: /business/id/:id/post/:postid PUT
//update a post //query to update post with specific id
app.put("/business/:id/posts/:postid", async(req, res)=> {
    const postid=parseInt(req.params.postid,10)
    console.log("postid", postid)
    try{
        await db.none('update posts set description=$1, url=$2 where id=$3',[
        req.body.description,
        req.body.url,
        postid
        ])
        return res.json({
            message: "success",
        })
    }catch(err) {
        res.status(500).send(err)
    }
});

//route: /business/id/:id/post/:postid DELETE
//delete a post
app.delete("/business/:id/posts/:postid", async(req, res) => {
    const postid=parseInt(req.params.postid,10)
    try{
        await db.none('delete from posts where id=$1',
        postid)
        return res.json({
            message:'success'
        })
    }catch(err) {
        res.status(500).send(err)
    }
});



//COMMENT ROUTERS
//route: /business/id/:id/post/:postid/ POST
//create comment
app.post("/business/:id/posts/:postid/comments", async (req, res) => {
    const business_id = parseInt(req.params.id, 10)
    const post_id = parseInt(req.params.postid, 10)
    try{
        await db.none(
            `insert into comments (comment,post_id,business_id) values ($<comment>,${post_id},${business_id})`,
        req.body)
        return res.json({
            message: "success"
        })
    }catch(err){
        res.status(500).send(err)
    }
});

//route: /business/id/:id/post/:postid/comments GET
//get all comments for specific post
app.get("/business/:id/posts/:postid/comments", async(req, res) =>{
    const postid = parseInt(req.params.postid, 10)
    try{
        const comments= await db.any(`select * from comments where post_id=$1`,
        postid)
        return res.json(comments)
    } catch(err) {
        res.status(500).send(err)
    }
    //get data from req.body
});


//route: /business/id/:id/post/:id/comment/:commentid DELETE
//delete a comment
app.delete("/business/:id/posts/:postid/comments/:commentid", async (req, res) =>{
    const commentid = parseInt(req.params.commentid)
    try{
        await db.none(`delete from comments where id=$1`,
        commentid)
        return res.json({
            message:'success'
        })
    } catch (err) {
        res.status(500).send(err)
    }
});


//LISTENER
app.listen(PORT, () => {
    console.log("started on http://localhost:"+PORT)
});