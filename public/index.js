var express = require("express");
var app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
var port = process.env.PORT || 3000;
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/premier_league_standings", (req, res) => listPremStandings(req, res));
app.get("/f1_standings", (req, res) => listF1Standings(req, res));
app.get("/thumbnail", (req, res) => thumbnailEndpoint(req, res));

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

async function listPremStandings(res) {
  try {
    const db = await pool.connect();
    const result = await db.query("SELECT * FROM premier_league_standings");
    res.send(result.rows);
    db.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

async function listF1Standings(res) {
  try {
    const db = await pool.connect();
    const result = await db.query("SELECT * FROM f1_standings");
    res.send(result.rows);
    db.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

async function thumbnailEndpoint(res) {
  try {
    res.sendFile("images/thumbnail/thumbnail.png");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}
