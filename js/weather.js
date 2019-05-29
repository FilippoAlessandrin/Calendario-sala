function gettingJSON() {
    $.ajax({
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/weather?id=3164241&APPID=a4c3fbe7a3de158650460e3ca36c47ab&units=metric",
        success: function (result) {
            gestisciWeather(result);
        },
        error: function (richiesta, stato, errori) {
            console.log(richiesta, stato, errori);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    intervalloWeather();
});


function intervalloWeather() {
    gettingJSON();
    setInterval(gettingJSON,30000);
}

function gestisciWeather(result) {
    var infoWeather=[];
    infoWeather["temp"]=result.main.temp;
    infoWeather["weather"]=result.weather[0].description;
    if(Array.isArray(result.weather[0].icon)){
        infoWeather["icon"]=result.weather[0].icon[0];
    }else{
       infoWeather["icon"]=result.weather[0].icon; 
    }
    
    stampaWeather(infoWeather);

}

function stampaWeather(tempo){
    var imgMeteo=document.getElementById("img-meteo");
    var tempDiv=document.getElementById("gradi");
    var imgMeteo2=document.getElementById("img-meteo-2");
    var tempDiv2=document.getElementById("gradi-2");
    
    imgMeteo.src="img/"+tempo["icon"]+".svg";
    tempDiv.innerHTML=Math.round(tempo["temp"])+"°";
    imgMeteo2.src="img/"+tempo["icon"]+".svg";
    tempDiv2.innerHTML=Math.round(tempo["temp"])+"°";
}


