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
        intervalloWeather();
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
var eventiFuturi = [];
var eventoInCorso = [];
var ritorno = [];
var eventoProssimo = [];
var first = true;




/*PROGRAMMATI*/

function intervalloCalendario() {
    //Qui è l'entrata del Programma
    setInterval(gestisciEventi, 20000);
}
//Funzione per controllare se ci sono eventi in corso oppure no
function inCorso() {
    console.log("gli eventi di oggi sono:");
    console.log(eventiOggi.length);
    console.log(eventiOggi);
    if (eventiOggi.length > 0 || eventoProssimo.length > 0) {
        if (first) {
            eventoProssimo = eventiOggi[0];
            first = false;
        }



        if (eventoInCorso.length == 0) {
            var oraInizio = eventoProssimo["orarioInizio"];
            var oraFine = eventoProssimo["orarioFine"];
            var dataInizioEvento = new Date(eventoProssimo["raw_data"]);
            var H = oraInizio.split(":")[0];
            var M = oraInizio.split(":")[1];

            dataInizioEvento.setHours(H, M);
            var dataFineEvento = new Date(eventoProssimo["raw_data"]);
            H = oraFine.split(":")[0];
            M = oraFine.split(":")[1];
            dataFineEvento.setHours(H, M);

            if (new Date().getTime() >= dataInizioEvento.getTime() && dataInizioEvento.getTime() < dataFineEvento.getTime() || allday) {
                console.log("è ora")
                console.log(eventoProssimo);
                eventoInCorso = eventoProssimo;
                console.log("elimino evento")
                console.log("eventiOggi[0]")
                eventiOggi.shift();
                if (eventiOggi.length > 0) {
                    eventoProssimo = eventiOggi[0];
                    console.log("il prossimo evento è " + eventoProssimo);
                }





                var millisecondiDurata = dataFineEvento.getTime() - dataInizioEvento.getTime();
                console.log("aspettiamo " + millisecondiDurata);
                setTimeout(inCorso, millisecondiDurata);
                console.log("iniziato evento" + eventoInCorso["titolo"]);
                //background rosso
                //stampa sul titolo del in corso
                //ristampa gli eventi per oggi
            } else {
                console.log("non è ora");
                setTimeout(inCorso, 5000);
            }


        } else {
            console.log("finito evento" + eventoInCorso["titolo"]);
            eventoInCorso = [];
            inCorso();
        }


    } else {


        setTimeout(inCorso, 5000);
        console.log("controllato per nulla");
    }
}

function gestisciEventi(eventi) {
    var timeMax = new Date();
    var timeMin = new Date();
    var days = 12;
    var today = new Date();
    var giorni = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1)
    tomorrow.setHours(0, 0);
    giorni.setDate(today.getDate() + days);
    timeMax.setHours(23, 59);
    getEventToday(timeMax, timeMin);
    //Serve per dare a scope globale gli eventi

    getEventNextDays(giorni, tomorrow)



    console.log(eventiFuturi);



}

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

    });
}

function getEventNextDays(timeMax, timeMin) {

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

        eventiFuturi = parseEvents(response);

    });
}

function parseEvents(response) {
    var eventi = [];
    var events = response.result.items;
    if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            var nomeOrganizer = event.creator.email;
            var evento = [];


            if (!when) {
                when = event.start.date;
                var data = when.split("-");
                data = data[2] + "/" + data[1] + "/" + data[0];
                var evento = [data, nomeOrganizer, event.summary];
                evento["data"] = data;
                evento["nomeOrganizer"] = nomeOrganizer;
                evento["titolo"] = event.summary;
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
                eventi.push(evento);
            }

        }
    } else {

    }
    return eventi;
}