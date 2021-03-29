# TML-rest-mini-project
Group project where we have created an api using express


	- brief description of your project. What does it do, who and what is it for? 
	- link to deployment: heroic or GitHub pages. This is more important for non technical recruiters/interviewers who want to see what you created
	- Overview of the technologies you used
	- directions for development. What scripts are available if someone wanted to clone your repo? 

    

ISSUES

PROBLEM: could not insert to database 

```
//route: /business POST
//create a business
//TODO: not going through
app.post("/business", async (req, res) => {
    //TODO: logic for when user does not pass in description, logo, or either
    console.log("request", req.body)
    try{
        await db.none(
            "INSERT INTO businesses (business_name, description, logo) VALUES (${business_name}, ${description}, ${logo}",
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
```
SOLUTION: it seemed like everything was correct. WEILY, my classmate, looked at it for two seconds and realized I was missing a parethesis at the end of thes string
- - - - - - - - -

