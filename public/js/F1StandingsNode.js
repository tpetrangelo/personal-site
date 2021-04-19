const https = require('https');
const schedule = require('node-schedule');

const job = schedule.scheduleJob('54 * * * *', function () {

    let req = https.get("https://ergast.com/api/f1/current/driverStandings.json", function (res) {
        let data = '',
            json_data;

        var standings = {};
        var racers = [];

        standings.racers = racers;

        res.on('data', function (stream) {
            data += stream;
        });
        res.on('end', function () {
            let json_data = JSON.parse(data);

            let standings_data_object = json_data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

            standings_data_object.forEach(element => {
                let firstName = element.Driver.givenName;
                let lastName = element.Driver.familyName;
                let constructor = element.Constructors[0].name;
                let points = element.points;

                var racerPosition = {
                    "firstName": firstName,
                    "lastName": lastName,
                    "constructor": constructor,
                    "points": points
                }

                standings.racers.push(racerPosition);

            });

            console.log(standings);

        });

    });

    req.on('error', function (e) {
        console.log(e.message);
    });


});

