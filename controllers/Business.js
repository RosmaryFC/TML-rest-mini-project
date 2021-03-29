const db = require('../db')

class Business {
    constructor() {

    };

    async getAllBusinesses(req, res) {
        try{
            const businesses = await db.any(`SELECT * FROM businesses`)
            return res.json(businesses)
        } catch(err){
            res.status(500).send(err)
        }
    }

    async createBusiness (req, res) {
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
    }

    async getBusiness(req, res) {
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
    }

    async updateBusiness (req, res) {
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
    }

    async deleteBusiness (req, res) {
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
    }

}

module.exports = Business