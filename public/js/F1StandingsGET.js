const f1_settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.tompetrangelo.com/f1_standings",
    "method": "GET",
};

$.ajax(f1_settings).done(function (res) {
    var racerCount = 0;
    let standings_data_object = res;

    standings_data_object.forEach(element => {
        racerCount++;
        let driverName = element.driver;
        let constructor = element.constructor;
        let points = element.points;

        if (constructor == "McLaren") {
            $('<tr>').append(
                $('<td class="text-center table-success">').text(racerCount),
                $('<td class="text-center table-success">').text(driverName),
                $('<td class="text-center table-success">').text(constructor),
                $('<td class="text-center table-success">').text(points)).appendTo('#F1Table');

        } else {
            $('<tr>').append(
                $('<td class="text-center">').text(racerCount),
                $('<td class="text-center">').text(driverName),
                $('<td class="text-center">').text(constructor),
                $('<td class="text-center">').text(points)).appendTo('#F1Table');
        }



    });



});