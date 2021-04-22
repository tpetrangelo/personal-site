const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://api-football-v1.p.rapidapi.com/v3/standings?season=2020&league=39",
	"method": "GET",
	"headers": {
        "x-rapidapi-key": process.env.PREM_KEY,
		"x-rapidapi-host": "api-football-v1.p.rapidapi.com"
	}
};


$.document.ready.ajax(settings).done(function (res) {
    var teamCount = 0;
    let standings_data_object = res.response[0].league.standings[0];

    

    // standings_data_object.forEach(element => {
        
    //     let teamName = element.team.name;
    //     let points = element.points;
    //     let rank = ++teamCount;

    //     if(teamName == "Arsenal"){
    //         $('<tr>').append(
    //             $('<td class="text-center table-success">').text(rank),
    //             $('<td class="text-center table-success">').text(teamName),
    //             $('<td class="text-center table-success">').text(points)).appendTo('#PremierLeagueTable');
    //     }
    //     else if(rank < 5){
    //         $('<tr>').append(
    //             $('<td class="text-center table-primary">').text(rank),
    //             $('<td class="text-center table-primary">').text(teamName),
    //             $('<td class="text-center table-primary">').text(points)).appendTo('#PremierLeagueTable');
    //     }else if(rank > 17){
    //         $('<tr>').append(
    //             $('<td class="text-center table-danger">').text(rank),
    //             $('<td class="text-center table-danger">').text(teamName),
    //             $('<td class="text-center table-danger">').text(points)).appendTo('#PremierLeagueTable');
    //     }else{
    //         $('<tr>').append(
    //             $('<td class="text-center">').text(rank),
    //             $('<td class="text-center">').text(teamName),
    //             $('<td class="text-center">').text(points)).appendTo('#PremierLeagueTable');
    //     }

        
    // });



});