const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // -> req.body

//routes//

//get inflationdata

app.get("/inflations/:categories", async (req, res) => {
    try {
        //const categories = "test";
        //const test = await pool.query("SELECT year, value FROM inflation where category = 'test'");
        //const test2 = await pool.query("SELECT year, value FROM inflation where category = 'test2'");
        //const allInflations = await pool.query("SELECT year, AVG(value) FROM inflation where category = 'test2' OR category = 'test' GROUP BY year")
        
        const { categories } = req.params;
        console.log(categories);
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
        console.log(str);
        const allInflations = await pool.query(str); 
          
        

        res.json(allInflations.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});