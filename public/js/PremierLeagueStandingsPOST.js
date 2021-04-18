const schedule = require('node-schedule');
const http = require("https");
var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
    "method": "GET",
    "hostname": "api-football-v1.p.rapidapi.com",
    "port": null,
    "path": "/v3/standings?season=2020&league=39",
    "headers": {
        "x-rapidapi-key": "75919517e8msh6f38343bd218c91p1f01c8jsn2ad36a52ad96",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "useQueryString": true
    }
};

const teams = [];

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });

const job = schedule.scheduleJob('23 * * * *', function () {
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
                
                let rank = ++teamCount;
                let teamName = element.team.name;
                let points = element.points;
                
                let teamsEntry = {
                    "rank" : rank,
                    "teamName" : teamName,
                    "points" : points
                }

                teams.push(teamsEntry);                
            });

            console.log(teams);



        });
    });

    req.end();
});
