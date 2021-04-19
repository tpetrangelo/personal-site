$.getJSON("https://ergast.com/api/f1/current/driverStandings.json", function (res) {

    var racerCount = 0;

    let standings_data_object = res.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    standings_data_object.forEach(element => {
        racerCount++;
        let firstName = element.Driver.givenName;
        let lastName = element.Driver.familyName;
        let constructor = element.Constructors[0].name;
        let points = element.points;

        if (constructor == "McLaren") {
            $('<tr>').append(
                $('<td class="text-center table-success">').text(racerCount),
                $('<td class="text-center table-success">').text(firstName + ' ' + lastName),
                $('<td class="text-center table-success">').text(constructor),
                $('<td class="text-center table-success">').text(points)).appendTo('#F1Table');

        } else {
            $('<tr>').append(
                $('<td class="text-center">').text(racerCount),
                $('<td class="text-center">').text(firstName + ' ' + lastName),
                $('<td class="text-center">').text(constructor),
                $('<td class="text-center">').text(points)).appendTo('#F1Table');
        }


    });
});
