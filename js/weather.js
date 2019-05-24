function gettingJSON() {
    $.ajax({
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/weather?id=3164241&APPID=a4c3fbe7a3de158650460e3ca36c47ab&lang=it&units=metric",
        success: function (result) {
            gestisciWeather(result);
        },
        error: function (richiesta, stato, errori) {
            console.log(richiesta, stato, errori);
        }
    });
}

/*document.addEventListener("DOMContentLoaded", function () {
    intervalloWeather();
});*/


function intervalloWeather() {
    setInterval(gettingJSON,660000);
}

function gestisciWeather(result) {
    var infoWeather=[];
    infoWeather["temp"]=result.main.temp;
    infoWeather["weather"]=result.weather[0].description;
    console.log(infoWeather);
    return infoWeather;

}

