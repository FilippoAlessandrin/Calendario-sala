/*GOOGLE*/
// Client ID and API key from the Developer Console

var API_KEY = 'AIzaSyBT0cU2cczWap1Jf7AmLsGT5VWyFKhsbc4';

// Array of API discovery doc URLs for APIs used by the quickstart


// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.

var calendario = "grupposinergia.com_i7olvi8c8c0hkj0nlk7g9g7vv0@group.calendar.google.com";

var eventiOggi = [];
var eventoInCorso = [];

document.addEventListener('DOMContentLoaded', function () {
    intervalloCalendario();
    inCorso();
}, false);


/*PROGRAMMATI*/




/*PROGRAMMATI*/
function intervalloGetDates() {
    setTodayDate();
    setOtherDate();
    setMonthYear();
    setInterval(setTodayDate, 3600000);
    setInterval(setOtherDate, 3600000);
    setInterval(setMonthYear, 3600000);
}

function intervalloCalendario() {
    //Qui è l'entrata del Programma

    setInterval(gestisciEventi, 20000);
}

function intervalloClock() {
    clock();
    setInterval(clock, 1000);
}
//Funzione per controllare se ci sono eventi in corso oppure no
function inCorso() {
    console.log("gli eventi di oggi sono:");
    console.log(eventiOggi.length);
    console.log(eventiOggi);
    var eventiGrande = [];
    var messaggioHTML = document.getElementById("messaggio-benv");
    if (eventiOggi.length > 0) {
        for (var i = 0; i < eventiOggi.length; i++) {
            if (eventiOggi[i]["calendario"].toLowerCase() === "sala piccola") {

            } else {
                eventiGrande.push(eventiOggi[i]);
            }

        }
        if (eventiGrande.length > 0) {







            if (eventoInCorso.length == 0) {
                var oraInizio = eventiGrande[0]["orarioInizio"];
                var oraFine = eventiGrande[0]["orarioFine"];
                var dataInizioEvento = new Date(eventiGrande[0]["raw_data"]);
                var H = oraInizio.split(":")[0];
                var M = oraInizio.split(":")[1];

                dataInizioEvento.setHours(H, M);
                var dataFineEvento = new Date(eventiGrande[0]["dataFine"]);
                H = oraFine.split(":")[0];
                M = oraFine.split(":")[1];
                dataFineEvento.setHours(H, M);
                var temporimanente = (dataInizioEvento.getTime() - new Date().getTime());
                var messaggioBenvenuto;
                //controlla se mancano 15 minuti dall'inizio dell'evento
                if (temporimanente <= 900000 && temporimanente > 0) {
                    insertRemoveInCorso("Tra " + Math.ceil(temporimanente / 60000) + " minuti inizierà " + eventiGrande[0]["titolo"], eventiGrande[0]["orarioInizio"], "", "orange", eventiGrande[0]["orarioFine"]);
                    if (eventiGrande[0]["description"]) {

                        messaggioBenvenuto = eventiGrande[0]["description"];
                        if (messaggioBenvenuto.length > 32) {
                            messaggioHTML.style.fontSize = "50px";
                        }
                    } else {
                        messaggioBenvenuto = "Benvenuti in Gruppo Sinergia";
                    }


                } else {

                    messaggioBenvenuto = "Benvenuti in Gruppo Sinergia";
                }
                messaggioHTML.innerHTML = messaggioBenvenuto;
                if (new Date().getTime() >= dataInizioEvento.getTime() && dataInizioEvento.getTime() < dataFineEvento.getTime()) {

                    console.log("è ora");
                    eventoInCorso[0] = eventiGrande[0];
                    insertRemoveInCorso(eventoInCorso[0]["titolo"], eventoInCorso[0]["orarioInizio"], eventoInCorso[0]["nomeOrganizer"], "red", eventoInCorso[0]["orarioFine"]);
                    console.log("elimino evento");
                    console.log(eventiOggi[0]);
                    var millisecondiDurata = dataFineEvento.getTime() - new Date().getTime();
                    console.log("aspettiamo " + millisecondiDurata);
                    setTimeout(inCorso, millisecondiDurata);
                    console.log("iniziato evento" + eventoInCorso[0]["titolo"]);
                    //background rosso
                    //stampa sul titolo del in corso
                    //ristampa gli eventi per oggi
                } else {
                    console.log("non è ancora ora di iniziare " + eventiGrande[0]["titolo"]);

                    setTimeout(inCorso, 5000);
                }


            } else {
                console.log("finito evento " + eventoInCorso[0]["titolo"]);
                eventoInCorso = [];
                insertRemoveInCorso("LIBERA", "", "", "green", "");
                inCorso();
            }
        } else {
            setTimeout(inCorso, 5000);
        }


    } else {

        messaggioHTML.innerHTML = "Benvenuti in Gruppo Sinergia";
        insertRemoveInCorso("LIBERA", "", "", "green", "");
        console.log("Non ci sono eventi di oggi");
        setTimeout(inCorso, 5000);


    }
}

function gestisciEventi(eventi) {
    var timeMax = new Date();
    var timeMin = new Date();

    timeMax.setHours(23, 59);
    getEventToday(timeMax, timeMin);
    var numGiorno = 1;
    for (var i = 1; i <= 10; i++) {
        var dataProssima = new Date();
        dataProssima.setDate(dataProssima.getDate() + numGiorno);
        if (dataProssima.getDay() == 0) {
            numGiorno += 1;
            dataProssima.setDate(dataProssima.getDate() + numGiorno);
        }
        numGiorno += 1;

        var timeMaxDay = new Date(dataProssima.getTime());
        var timeMinDay = new Date(dataProssima.getTime());
        timeMaxDay.setHours(23, 59);
        timeMinDay.setHours(0, 0);
        getEventNextDays(timeMaxDay, timeMinDay, i);


    }








}
//blocco è la variabile i che indica il blocco del giorno della settimana
function getEventToday(timeMax, timeMin) {
    $.ajax({
        type: 'GET',
        url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendario + '/events?key=' + API_KEY + '&timeMax=' + timeMax.toISOString() + '&timeMin=' + timeMin.toISOString() + '&orderBy=starttime&singleEvents=True'),
        dataType: 'json',
        success: function (response) {
            eventiOggi = parseEvents(response);
            insertToday();
        },
        error: function (response) {
            //tell that an error has occurred
        }
    });



}

function getEventNextDays(timeMaxDay, timeMinDay, blocco) {


    $.ajax({
        type: 'GET',
        url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendario + '/events?key=' + API_KEY + '&timeMax=' + timeMaxDay.toISOString() + '&timeMin=' + timeMinDay.toISOString() + '&orderBy=starttime&singleEvents=True'),
        dataType: 'json',
        success: function (response) {

            setOtherEvents(parseEvents(response), blocco);
        },
        error: function (response) {
            //tell that an error has occurred
        }
    });



}

function parseEmail(email) {
    email = email.split("@");
    var nomecognome = email[0];
    var nome = nomecognome.split(".")[0];
    var cognome = nomecognome.split(".")[1];
    if (!cognome) {
        cognome = "";
    }
    nome = uppercaseFirst(nome);
    cognome = uppercaseFirst(cognome);
    return nome + " " + cognome;

}

function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseEvents(response) {
    var eventi = [];
    var events = response.items;
    if (events.length > 0) {
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var evento = [];
            var when = event.start.dateTime;
            var nomeOrganizer = parseEmail(event.creator.email);
            var description = event.description;
            var titolo = event.summary;
            var calendario = "sala-grande";
            if (description) {
                var descriptionSplitted = description.split("\n");
                var descrizione = descriptionSplitted[0];
               
                if(descriptionSplitted[1]){
                    if (descriptionSplitted[1].toLowerCase()==="sala piccola") {
                        calendario = "sala piccola";
                    }
                }
                evento["description"] = descrizione;
                

            }else{
               evento["description"] = ""; 
            }
            evento["calendario"] = calendario;
            
          

            
      
            if (nomeOrganizer.length > 25) {
                evento["nomeOrganizer"] = nomeOrganizer.substring(0, 25) + "...";
            } else {
                evento["nomeOrganizer"] = nomeOrganizer;
            }
            if (event.summary.length > 25) {
                evento["titolo"] = titolo.substring(0, 25) + "...";
            } else {
                evento["titolo"] = titolo;
            }

            if (!when) {
                when = event.start.date;
                var data = when.split("-");
                data = data[2] + "/" + data[1] + "/" + data[0];
                evento["data"] = data;


            } else {

                var divisoreData = when.split("T");

                var orario = divisoreData[1];
                var data = divisoreData[0];
                evento["raw_data"] = data;
                data = data.split("-");
                data = data[2] + "/" + data[1] + "/" + data[0];
                var orarioInizio = orario.split("+")[0];
                orarioInizio = orarioInizio.substring(0, orarioInizio.length - 3);


                var orarioFine = event.end.dateTime;
                var divisoreFine = orarioFine.split("T");
                var dataFine;

                dataFine = divisoreFine[0];
                orarioFine = divisoreFine[1];

                orarioFine = orarioFine.split("+")[0];
                orarioFine = orarioFine.substring(0, orarioFine.length - 3);
                evento["data"] = data;
                evento["orarioInizio"] = orarioInizio;
                evento["orarioFine"] = orarioFine;
                evento["dataFine"] = dataFine;

            }
            eventi.push(evento);

        }
    } else {

    }
    return eventi;
}

function insertRemoveInCorso(titolo, oraInizio, responsabile, colore, oraFine) {
    var titoloHTML;
    var orarioHTML;
    var responsabileHTML;
    var background = document.getElementById("evento-in-corso");
    var descr = document.getElementById("descr");
    titoloHTML = document.getElementById("titolo-in-corso");

    orarioHTML = document.getElementById("ora");
    responsabileHTML = document.getElementById("responsabile");
    if (titolo == "LIBERA") {
        titoloHTML.innerHTML = titolo;
        responsabileHTML.innerHTML = "";
        descr.className = "col-6 text-center descr-libera align-middle align-self-center m-auto";
        titoloHTML.className = "col-12 titolo-libera";
    } else {
        titoloHTML.innerHTML = titolo + " (h. " + oraInizio + " - " + oraFine + ")";
        responsabileHTML.innerHTML = responsabile;
        descr.className = "col-6 text-center descr-occupata align-middle align-self-center m-auto";
        titoloHTML.className = "col-12 titolo-libera";
    }

    background.className = "row color-change-" + colore + " banner-height";
}

function insertToday() {
    var colonnaOggi = document.getElementById("colonna-oggi");
    colonnaOggi.innerHTML = "";
    for (var i = 0; i < eventiOggi.length; i++) {
        var evento = eventiOggi[i];
        var row = document.createElement("div");
        var classeOggi="ora-oggi-grande";
        var classeBorder="evento-oggi-grande";
        if(evento["calendario"].toLowerCase()==="sala piccola"){
            classeOggi="ora-oggi-piccola";
            classeBorder="evento-oggi-piccola";
        }
        row.className = "row evento-oggi "+classeBorder;
        
        if(evento["calendario"].toLowerCase()==="sala piccola"){
            classeOggi="ora-oggi-piccola";
        }
        var rigaEvento = "<div class='col-3 "+classeOggi+"' id='ora-oggi'>\
                            <div id='ora-inizio'>" + evento["orarioInizio"] + "</div>\
                            <div id='ora-fine'>" + evento["orarioFine"] + "</div>\
                        </div>\
                        <div class='col-9'>\
                            <div>" + evento["titolo"] + "</div>\
                            <div>" + evento["nomeOrganizer"] + "</div>\
                        </div>";

        row.innerHTML = rigaEvento;
        colonnaOggi.appendChild(row);

    }




}

function traduciMese() {
    var mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    return mesi[new Date().getMonth()];
}

function setMonthYear() {
    var titoloMese = document.getElementById("titolo-mese");
    titoloMese.innerHTML = traduciMese() + " " + new Date().getFullYear();
}

function traduciGiorno(dataProssima) {
    var settimana = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];
    var giornata = dataProssima.getDay();
    return settimana[giornata];

}

function setTodayDate() {
    var titoloDataOggi = document.getElementById("data-oggi");
    titoloDataOggi.innerHTML = "Oggi, " + new Date().getDate() + " " + traduciMese();
}

function setOtherDate() {
    var numGiorno = 1;
    for (var i = 1; i <= 10; i++) {

        var dataProssima = new Date();
        dataProssima.setDate(dataProssima.getDate() + numGiorno);
        if (dataProssima.getDay() == 0) {
            numGiorno += 1;
            dataProssima.setDate(dataProssima.getDate() + 1);
        }
        numGiorno += 1;


        console.log(traduciGiorno(dataProssima));
        document.getElementById("giorno-titolo-" + i).innerHTML = traduciGiorno(dataProssima) + " " + dataProssima.getDate();


    }


}

function setOtherEvents(eventi, blocco) {
    blocco = document.getElementById("giorno-" + blocco);
    blocco.innerHTML = "";
    for (var x = 0; x < eventi.length; x++) {
        var row = document.createElement("div");
        row.className = "row evento-settimana";
        var orarioInizio = eventi[x]["orarioInizio"];
        var orarioFine = eventi[x]["orarioFine"];
        var titolo = eventi[x]["titolo"];
        var nomeOrganizer = eventi[x]["nomeOrganizer"];
        var calendario = "bordino-grande"
        if (eventi[x]["calendario"].toLowerCase() === "sala piccola") {
            calendario = "bordino-piccola"
        }
        var rigaEvento = `<div class='col-3 ${calendario}'>
                            ${orarioInizio} ${orarioFine}
                        </div>
                        <div class='col-8' style="padding-right:0">
                            <div>
                                ${titolo}
                            </div>
                            <div>
                                ${nomeOrganizer}
                            </div>
                        </div>`;
        row.innerHTML = rigaEvento;
        blocco.appendChild(row);

    }
}

function clock() {
    var orologio = document.getElementById("ora");
    orologio.innerHTML = new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes();
}
document.addEventListener('DOMContentLoaded', function () {
    intervalloGetDates();
    intervalloClock();
}, false);
