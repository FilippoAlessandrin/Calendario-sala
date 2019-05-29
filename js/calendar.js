/*GOOGLE*/
// Client ID and API key from the Developer Console
var CLIENT_ID = '475639460413-9d8du34bvlv4imn216bodirp968439fq.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBT0cU2cczWap1Jf7AmLsGT5VWyFKhsbc4';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var GoogleAuth;
var isAuthorized;
var currentApiRequest;

function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.


    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': API_KEY,
        'discoveryDocs': DISCOVERY_DOCS,
        'clientId': CLIENT_ID,
        'scope': SCOPES
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get();

        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.

        handleAuthClick();
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked 'Sign out' button.
        GoogleAuth.signOut();
    } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
        intervalloCalendario();
        inCorso();
     
    }
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        isAuthorized = true;
        if (currentApiRequest) {
            sendAuthorizedApiRequest(currentApiRequest);

        }
    } else {
        isAuthorized = false;
    }
}

function sendAuthorizedApiRequest(requestDetails) {
    currentApiRequest = requestDetails;
    if (isAuthorized) {
        // Make API request
        // gapi.client.request(requestDetails)

        // Reset currentApiRequest variable.
        currentApiRequest = {};
    } else {
        GoogleAuth.signIn();
    }
}


/*PROGRAMMATI*/

var eventiOggi = [];
var eventoInCorso = [];


/*PROGRAMMATI*/
function intervalloGetDates(){
    setTodayDate();
    setOtherDate();
    setMonthYear();
    setInterval(setTodayDate,3600000);
    setInterval(setOtherDate,3600000);
    setInterval(setMonthYear,3600000);
}
function intervalloCalendario() {
    //Qui è l'entrata del Programma
    setInterval(gestisciEventi, 20000);
}
function intervalloClock(){
    clock();
    setInterval(clock,1000);
}
//Funzione per controllare se ci sono eventi in corso oppure no
function inCorso() {
    console.log("gli eventi di oggi sono:");
    console.log(eventiOggi.length);
    console.log(eventiOggi);
    if (eventiOggi.length > 0) {

        if (eventoInCorso.length == 0) {
            var oraInizio = eventiOggi[0]["orarioInizio"];
            var oraFine = eventiOggi[0]["orarioFine"];
            var dataInizioEvento = new Date(eventiOggi[0]["raw_data"]);
            var H = oraInizio.split(":")[0];
            var M = oraInizio.split(":")[1];

            dataInizioEvento.setHours(H, M);
            var dataFineEvento = new Date(eventiOggi[0]["raw_data"]);
            H = oraFine.split(":")[0];
            M = oraFine.split(":")[1];
            dataFineEvento.setHours(H, M);
            var temporimanente=(dataInizioEvento.getTime()-new Date().getTime());
            //controlla se mancano 15 minuti dall'inizio dell'evento
            if(temporimanente<=900000){
                insertRemoveInCorso("Tra "+Math.ceil(temporimanente/60000)+" minuti inizierà "+eventiOggi[0]["titolo"],eventiOggi[0]["orarioInizio"],"","orange",eventiOggi[0]["orarioFine"]);
                //var messaggioBenvenuto="Benvenuto/i "+eventiOggi[0]["description"];
            }else{
                //inserire messaggio di benvenuto generico(benvenuti in gruppo sinergia)
            }
            if (new Date().getTime() >= dataInizioEvento.getTime() && dataInizioEvento.getTime() < dataFineEvento.getTime()) {

                console.log("è ora")
                eventoInCorso[0] = eventiOggi[0];
                insertRemoveInCorso(eventoInCorso[0]["titolo"], eventoInCorso[0]["orarioInizio"], eventoInCorso[0]["nomeOrganizer"], "red",eventoInCorso[0]["orarioFine"]);
                console.log("elimino evento")
                console.log(eventiOggi[0]);
                eventiOggi.shift();
                var millisecondiDurata = dataFineEvento.getTime() - new Date().getTime();
                console.log("aspettiamo " + millisecondiDurata);
                setTimeout(inCorso, millisecondiDurata);
                console.log("iniziato evento" + eventoInCorso[0]["titolo"]);
                //background rosso
                //stampa sul titolo del in corso
                //ristampa gli eventi per oggi
            } else {
                console.log("non è ancora ora di iniziare " + eventiOggi[0]["titolo"]);
                
                setTimeout(inCorso, 5000);
            }


        } else {
            console.log("finito evento " + eventoInCorso[0]["titolo"]);
            eventoInCorso = [];
            insertRemoveInCorso("Libera", "", "", "green","");
            inCorso();
        }

    } else {
        //inserire messaggio di benvenuto generico(benvenuti in gruppo sinergia)
        insertRemoveInCorso("Libera", "", "", "green","");
        console.log("Non ci sono eventi di oggi");
        setTimeout(inCorso, 5000);


    }
}

function gestisciEventi(eventi) {
    var timeMax = new Date();
    var timeMin = new Date();
    var today = new Date();
    var giorni = new Date();
    var tomorrow = new Date();
    timeMax.setHours(23, 59);
    getEventToday(timeMax, timeMin);
    var numGiorno=1;
     for(var i=1;i<=10;i++){
        var dataProssima=new Date();
        dataProssima.setDate(dataProssima.getDate()+numGiorno);
        if(dataProssima.getDay()==0){
            numGiorno+=1;
            dataProssima.setDate(dataProssima.getDate()+numGiorno);
        }
        numGiorno+=1;
        
        var timeMax=new Date(dataProssima.getTime());
        var timeMin=new Date(dataProssima.getTime());
        timeMax.setHours(23,59);
        timeMin.setHours(0,0);
        getEventNextDays(timeMax, timeMin ,i)
    

    }
    


    




}
//blocco è la variabile i che indica il blocco del giorno della settimana
function getEventToday(timeMax, timeMin) {

    var eventi = []
    gapi.client.calendar.events.list({
        'calendarId': 'grupposinergia.com_i7olvi8c8c0hkj0nlk7g9g7vv0@group.calendar.google.com',
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime',
        'attendees': [],
        'end': [],
        'creator': [],
        'timeMin': timeMin.toISOString(),
        'timeMax': timeMax.toISOString(),
     


    }).then(function (response) {

        eventiOggi = parseEvents(response);
        insertToday();
    });



}

function getEventNextDays(timeMax, timeMin,blocco) {

    var eventi = []
    gapi.client.calendar.events.list({
        'calendarId': 'grupposinergia.com_i7olvi8c8c0hkj0nlk7g9g7vv0@group.calendar.google.com',
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime',
        'attendees': [],
        'end': [],
        'creator': [],
        'timeMin': timeMin.toISOString(),
        'timeMax': timeMax.toISOString(),


    }).then(function (response) {

        setOtherEvents(parseEvents(response),blocco);
    });
}
function parseEmail(email){
    email=email.split("@");
    var nomecognome=email[0];
    var nome=nomecognome.split(".")[0];
    var cognome=nomecognome.split(".")[1];
    return nome+" "+cognome;
    
}
function parseEvents(response) {
    var eventi = [];
    var events = response.result.items;
    if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            var nomeOrganizer = parseEmail(event.creator.email);
            var evento = [];
            var description=event.description;


            if (!when) {
                when = event.start.date;
                var data = when.split("-");
                data = data[2] + "/" + data[1] + "/" + data[0];
                var evento = [data, nomeOrganizer, event.summary];
                evento["data"] = data;
                evento["nomeOrganizer"] = nomeOrganizer;
                evento["titolo"] = event.summary;
                evento["description"]=description
                eventi.push(evento);
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
                var durata = 0;
                orarioFine = orarioFine.split("T")[1];
                durata = orarioFine.split("+")[1];
                orarioFine = orarioFine.split("+")[0];
                orarioFine = orarioFine.substring(0, orarioFine.length - 3);
                evento["data"] = data;
                evento["orarioInizio"] = orarioInizio;
                evento["orarioFine"] = orarioFine;
                evento["nomeOrganizer"] = nomeOrganizer;
                evento["titolo"] = event.summary;
                evento["description"]=description
                eventi.push(evento);
            }

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
    titoloHTML = document.getElementById("titolo-in-corso");
    orarioHTML = document.getElementById("ora");
    responsabileHTML = document.getElementById("responsabile");
    if(titolo=="Libera"){
        titoloHTML.innerHTML=titolo;
        responsabileHTML.innerHTML="";
    }else{
        titoloHTML.innerHTML = titolo+" (h. "+oraInizio+" - "+oraFine+")";
        responsabileHTML.innerHTML = responsabile;
        
    }
  
    background.className="row color-change-"+colore+" banner-height";
}

function insertToday(){
    var colonnaOggi=document.getElementById("colonna-oggi");
    colonnaOggi.innerHTML="";
    for(var i=0;i<eventiOggi.length;i++){
        var evento=eventiOggi[i];
        var row=document.createElement("div");
        row.className="row evento-oggi";
        var rigaEvento="<div class='col-3' id='ora-oggi'>\
                            <div id='ora-inizio'>"+evento["orarioInizio"]+"</div>\
                            <div id='ora-fine'>"+evento["orarioFine"]+"</div>\
                        </div>\
                        <div class='col-9'>\
                            <div>" +evento["titolo"]+"</div>\
                            <div>"+evento["nomeOrganizer"]+"</div>\
                        </div>";
        
        row.innerHTML=rigaEvento;
        colonnaOggi.appendChild(row);
        
    }
   
        

    
}
function traduciMese(){
    var mesi=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"]
    return mesi[new Date().getMonth()];
}
function setMonthYear(){
    var titoloMese=document.getElementById("titolo-mese");
    titoloMese.innerHTML=traduciMese()+" "+new Date().getFullYear();
}
function traduciGiorno(dataProssima){
    var settimana=["dom","lun","mar","mer","gio","ven","sab"];
    var giornata=dataProssima.getDay();
    return settimana[giornata];
    
}

function setTodayDate(){
    var titoloDataOggi=document.getElementById("data-oggi");
    titoloDataOggi.innerHTML="Oggi, "+new Date().getDate()+" "+traduciMese();
}
function setOtherDate(){
    var numGiorno=1;
    for(var i=1; i<=10;i++){
        
        var dataProssima=new Date();
        dataProssima.setDate(dataProssima.getDate()+numGiorno);
        if(dataProssima.getDay()==0){
           numGiorno+=1
            dataProssima.setDate(dataProssima.getDate()+1);
        }
        numGiorno+=1;
        
        
        console.log(traduciGiorno(dataProssima));
        document.getElementById("giorno-titolo-"+i).innerHTML=traduciGiorno(dataProssima)+" "+dataProssima.getDate();  
        
        
    }
    
    
}
      
function setOtherEvents(eventi,blocco){
    var blocco=document.getElementById("giorno-"+blocco);
    blocco.innerHTML="";
    for(var x=0;x<eventi.length;x++){
        var row=document.createElement("div");
        row.className="row evento-settimana";
        var orarioInizio=eventi[x]["orarioInizio"];
        var orarioFine=eventi[x]["orarioFine"];
        var titolo=eventi[x]["titolo"];
        var nomeOrganizer=eventi[x]["nomeOrganizer"];
        var rigaEvento=`<div class='col-3 bordino'>
                            ${orarioInizio} ${orarioFine}
                        </div>
                        <div class='col-9'>
                            <div>
                                ${titolo}
                            </div>
                            <div>
                                ${nomeOrganizer}
                            </div>
                        </div>`;
        row.innerHTML=rigaEvento;
        blocco.appendChild(row);
                            
    }
}

function clock(){
    var orologio=document.getElementById("ora");
    orologio.innerHTML=new Date().getHours()+":"+(new Date().getMinutes()<10?'0':'')+new Date().getMinutes();
}
document.addEventListener('DOMContentLoaded', function() {
    intervalloGetDates();
    intervalloClock();
}, false);
