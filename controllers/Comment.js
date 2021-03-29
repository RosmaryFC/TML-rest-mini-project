const db = require('../db')

class Comment {
    constructor() {

    }

    async createComment (req, res) {
        const post_id = parseInt(req.params.postid, 10)
        try{
            await db.none(
                `insert into comments (comment,post_id) values ($<comment>,${post_id})`,
            req.body)
            return res.json({
                message: "success"
            })
        }catch(err){
            res.status(500).send(err)
        }
    }

    async getComments (req, res) {
        const postid = parseInt(req.params.postid, 10)
        try{
            const comments= await db.any(`select * from comments where post_id=$1`,
            postid)
            return res.json(comments)
        } catch(err) {
            res.status(500).send(err)
        }
        //get data from req.body
    }

    async deleteComment (req, res) {
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
    }
}

module.exports = Comment