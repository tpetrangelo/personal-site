const path = require('path');
require('dotenv').config(({path: path.resolve(__dirname, '../../.env') }));
const http = require("https");
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Client } = require('pg')
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  ssl: true,
  sslmode: require,
})

const options = {
    "method": "GET",
    "hostname": "api-football-v1.p.rapidapi.com",
    "port": null,
    "path": "/v3/standings?season=2020&league=39",
    "headers": {
        "x-rapidapi-key": process.env.PREM_KEY,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "useQueryString": true
    }
};



let teams = '';

const req = http.request(options, function (res) {
    const chunks = [];
    var teamCount = 0;

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        let standings_data_object = JSON.parse(body).response[0].league.standings[0];



        standings_data_object.forEach(element => {
            let teamsEntry = '';
            let rank = ++teamCount;
            let teamName = element.team.name;
            let points = element.points;

            if(rank != 20){
                teamsEntry = '(' + rank + ',\'' + teamName + '\',' + points + '),';
            }else{
                teamsEntry = '(' + rank + ',\'' + teamName + '\',' + points + ');';
            }


            teams += teamsEntry;
        });
            client.connect()
            client.query('DELETE FROM premier_league_standings WHERE rank > 0; INSERT INTO premier_league_standings(rank, team, points) VALUES' + teams, (err, res) => {
                console.log(err, res)
            client.end()
            })
    });




});
req.end();