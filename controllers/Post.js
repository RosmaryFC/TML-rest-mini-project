const db = require('../db')

class Post {
    constructor () {

    }

    async getPosts (req,res) {
        const id=parseInt(req.params.id,10)
        try{
            const posts= await db.any(`select * from posts where business_id=$1`,
            id)
            return res.json(posts)
        }
        catch(err){
            console.log("err", err)
            res.status(500).send(err)
        }
    }

    async createPost(req, res) {
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
    }

    async updatePost (req, res) {
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
    }

    async deletePost (req, res) {
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
    }

}

module.exports = Post