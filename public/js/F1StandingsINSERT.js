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

})





let drivers = '';

const req = http.get('https://ergast.com/api/f1/current/driverStandings.json', function (res) {
    const chunks = [];
    var teamCount = 0;

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        let standings_data_object = JSON.parse(body).MRData.StandingsTable.StandingsLists[0].DriverStandings;
        var racerCount = 0;

        standings_data_object.forEach((element, index, array) => {
            racerCount++;
            let firstName = element.Driver.givenName;
            let lastName = element.Driver.familyName;
            let driverName = firstName + ' ' + lastName;
            let constructor = element.Constructors[0].name;
            let points = element.points;

            if(index === (array.length -1)){
                driverEntry = '(' + racerCount + ',\'' + driverName + '\',' + '\'' + constructor + '\',' +points + ');';
            }else{
                driverEntry = '(' + racerCount + ',\'' + driverName + '\',' + '\'' + constructor + '\',' +points + '),';
            }


            drivers += driverEntry;
        });
            client.connect()
            client.query('DELETE FROM f1_standings WHERE rank > 0; INSERT INTO f1_standings(rank, driver, constructor, points) VALUES' + drivers, (err, res) => {
                console.log(err, res)
            client.end()
            })
    });




});
req.end();
