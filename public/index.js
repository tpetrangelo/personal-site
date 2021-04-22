var express = require("express");
var app = express();
const path = require('path');
require('dotenv').config(({path: path.resolve(__dirname, '../.env') }));
var port = process.env.PORT || 3000;
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DB_URI,
    ssl: process.env.DB_URI ? true : false,
    sslmode: require,
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/premier_league', (req, res) => listUsersPrem(req, res));


app.listen(port, () => {
    console.log("Server listening on port " + port);
});


async function listUsersPrem(req, res) {
    try {
      const db = await pool.connect()
      const result = await db.query('SELECT * FROM premier_league_standings');
      res.send(result.rows)
      db.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }