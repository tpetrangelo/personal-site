
const prem_settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.tompetrangelo.com/premier_league_standings",
    "method": "GET",
};

$.ajax(prem_settings).done(function (res) {
    var teamCount = 0;
    let standings_data_object = res;

    standings_data_object.forEach(element => {

        let teamName = element.team;
        let points = element.points;
        let rank = ++teamCount;

        if (teamName == "Arsenal") {
            $('<tr>').append(
                $('<td class="text-center table-success">').text(rank),
                $('<td class="text-center table-success">').text(teamName),
                $('<td class="text-center table-success">').text(points)).appendTo('#PremierLeagueTable');
        }
        else if (rank < 5) {
            $('<tr>').append(
                $('<td class="text-center table-primary">').text(rank),
                $('<td class="text-center table-primary">').text(teamName),
                $('<td class="text-center table-primary">').text(points)).appendTo('#PremierLeagueTable');
        } else if (rank > 17) {
            $('<tr>').append(
                $('<td class="text-center table-danger">').text(rank),
                $('<td class="text-center table-danger">').text(teamName),
                $('<td class="text-center table-danger">').text(points)).appendTo('#PremierLeagueTable');
        } else {
            $('<tr>').append(
                $('<td class="text-center">').text(rank),
                $('<td class="text-center">').text(teamName),
                $('<td class="text-center">').text(points)).appendTo('#PremierLeagueTable');
        }


    });



});