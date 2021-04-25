const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // -> req.body

//routes//

//get inflationdata

app.get("/inflations", async (req, res) => {
    try {
        const allInflations = await pool.query("SELECT year, value FROM inflation");

        res.json(allInflations.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});