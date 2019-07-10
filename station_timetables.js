/*SCRIPT FOR ASEMAN_JUNATIEDOT.HTML / JS*/
// NAVIGATION FUNCTIONS
    function openTab(evt, tab) {
        var i, x, tablinks;
        x = document.getElementsByClassName("table");
        for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        }
        tabs = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
        }
        document.getElementById(tab).style.display = "block";
        evt.currentTarget.className += " active";
        }
// FETCH ALL STATIONS 
getStations()
var stationNames ="";
    function getStations() {  
        fetch("https://rata.digitraffic.fi/api/v1/metadata/stations")
            .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
        document.getElementById("message").innerHTML = "Haku ei onnistunut. Yrit&auml; my&ouml;hemmin uudelleen.";
    })
         
        .then(function (responseJson) {
				searchStations(responseJson);
        })   
    function searchStations(stations){
        for(var i = 0; i < stations.length; i++) {
            stationNames = stationNames + stations[i].stationShortCode + ": " + stations[i].stationName + " <br>"; 
            document.getElementById("list_stations").innerHTML = stationNames;
}}}
/*
// FUNCTION TO BUILD FETCH URL     //  EI TOIMI!!!
    var baseURL = "https://rata.digitraffic.fi/api/v1/live-trains/station/";
    var url= "";
      function fetchResults(e) {
        e.preventDefault();
        url = baseURL + keyword.value + "?arriving_trains=5&include_nonstopping=false";
        document.getElementById("message").innerHTML = url;}

// FUNCTION TO FIND STATION     //  EI TOIMI!!!        
        function searchStations(stations){
             var stationsResult="";
             var keyword = document.getElementById("keyword").value; 
            $.each(stations, function(i, v) {
        if (v.stationName.includes(keyword)) {
        	stationsResult= stationsResult + v.stationName;
          }
                document.getElementById("message").innerHTML = stationsResult;
        }
    );}         
*/
// SEARCH FROM STATIONS STRING IF STATION EXISTS // TOIMII HUONOSTI...
    function searchTheStation() {
            var keyword = document.getElementById("keyword").value;
                keyword_caps = keyword.charAt(0).toUpperCase() + keyword.slice(1)
                document.getElementById("message").innerHTML = 
                `Paikkakunnalla ${keyword_caps} ${stationNames.includes(keyword_caps)? 'on asema.' : 'ei ole asemaa. Tarkista hakusana!'}`; 
    }

//   FETCH TIMETABLES FOR STATION: HKI      
    function getTimetables() {  
        //fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/HKI")
        fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/HKI")
            .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
        document.getElementById("message").innerHTML = "Tietojen haku ei onnistunut. Yrit&auml; my&ouml;hemmin uudelleen.";
        })
         
        	.then(function (responseJson) { 
				searchTimetables(responseJson);
			})
        }
var timetables = []; 
getTimetables()   

//  GET FROM TIMETABLES / TRAIN NUMBER / SCHEDULED DEPARTURE / ARRIVAL ETC.     
    function searchTimetables(timetables){
        // VARIABLES 
        var arrivals = "<tr><td>";
        var scheduledTime = "<tr><td>";
        var stationShortCode = "<tr><td>";
        var type = "<tr><td>";
        
        for(var i = 0; i < timetables.length; i++) {
        arrivals = arrivals + timetables[i].trainType + " " + timetables[i].trainNumber + "</td></tr><td>";
            document.getElementById("juna").innerHTML = arrivals; }
        
        for(var i = 0; i < timetables.length; i++) {
        scheduledTime = scheduledTime + (parseInt(timetables[i].timeTableRows[0].scheduledTime.substr(11, 2))+3) + timetables[i].timeTableRows[0].scheduledTime.substr(13, 3) + "</td></tr><td>";
                     document.getElementById("aika").innerHTML = scheduledTime; }
        
            for(var i = 0; i < timetables.length; i++) {
        stationShortCode = stationShortCode + timetables[i].timeTableRows[0].stationShortCode + "</td></tr><td>";
                document.getElementById("asema").innerHTML = stationShortCode; }
        
        for(var i = 0; i < timetables.length; i++) {
        type = type + timetables[i].timeTableRows[0].type + "</td></tr><td>";
                    document.getElementById("tyyppi").innerHTML = type; }
     }