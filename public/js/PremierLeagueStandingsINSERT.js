const path = require('path');
const date = require('date-and-time');

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
    ssl: { rejectUnauthorized: false }
})

const options = {
    "method": "GET",
    "hostname": "api-football-v1.p.rapidapi.com",
    "port": null,
    "path": "/v3/standings?season=2022&league=39",
    "headers": {
        "x-rapidapi-key": process.env.PREM_KEY,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "useQueryString": true
    }
};



let teams = '';

const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const now = new Date();
        console.log("Obtaining Premier League Standings at: ", date.format(now, 'MM/DD/YYYY HH:mm:ss'));
        const body = Buffer.concat(chunks);
        let standings_data_object = JSON.parse(body).response[0].league.standings[0];

        var rank = 0;


        standings_data_object.forEach((element, index, array) => {
            let teamsEntry = '';
            ++rank;
            let teamName = element.team.name;
            let points = element.points;

            if(index === (array.length -1)){
                teamsEntry = '(' + rank + ',\'' + teamName + '\',' + points + ');';
            }else{
                teamsEntry = '(' + rank + ',\'' + teamName + '\',' + points + '),';
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
