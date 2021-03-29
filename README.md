# TML-rest-mini-project
Group project where we have created an api using express


	- brief description of your project. What does it do, who and what is it for? 

	This application targets small business owners who are still developing. It allows for each user to create a business account where they make posts or comments on various topics relating to their businesses. In this application they are able to provide helpful tips to others now starting their businesses while recieving tips and tricks on how to improve their own store.

	- link to deployment: heroic or GitHub pages. This is more important for non technical recruiters/interviewers who want to see what you created
	https://github.com/RosmaryFC/TML-rest-mini-project.git

	- Overview of the technologies you used
	Technologies used include PostgreSQL, Node.js, Express, Knex and Pg-Promise. 

	- directions for development. What scripts are available if someone wanted to clone your repo? 
	Directions for deployment:
		1-npm i 
		2-in terminal "createdb rest_mini_api"
		3-initialize knex in project terminal using 'node_modules/.bin/knex migrate:latest' to create tables
		4-run 'node server.js'


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

    

