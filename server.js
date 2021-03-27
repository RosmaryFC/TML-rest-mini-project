const express  = require ("express");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", function(req, res) {
    res.send("hello")
});


app.listen(PORT, () => {
    console.log("started on http://localhost:"+PORT)
});