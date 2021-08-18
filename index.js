const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    // server static content
    app.use(express.static("client/build"));
}

//get inflationdata

app.get("/inflation/:categories", async (req, res) => {
    try {
        const { categories } = req.params;
        var str = "SELECT year, round(AVG(value),2) as value FROM inflation WHERE ";

        if (categories.includes(",")) {  
            var names = categories.split(",");
            names.map((o,i)=>{
                str += "category = '"+o+"' ";
                (i==names.length -1)?str += "":str += "OR ";
            }) 
        } else{
            str += "category = '" + categories + "' ";
        }

        str += "GROUP BY year";
        const allInflations = await pool.query(str); 

        res.json(allInflations.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});