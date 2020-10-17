let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;

function initMap() {

    //Initialize all variables above the function initMap().
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow
    currentInfoWindow = infoWindow;

    //The following code will obtain the users geographic location. Most geolocation services use network routing addresses to determine the user location. 
    //This application uses the web browser's W3C Geolocation Standard navigator.geolocation property to determine the user's location. 
    if (navigator.geolocation) { //Calls the W3C Geolocation Standard property.
        navigator.geolocation.getCurrentPosition(position => {
            pos = {
                lat: position.coords.latitude, //Grabs your latitude.
                lng: position.coords.longitude //Grabs your longitude.
            };
            //Allows output to id="map" in the index.html file.
            map = new google.maps.Map(document.getElementById("map"), {
                center: pos, //Centers the map to the given geolocation that is determined by the variable pos.
                zoom: 15 //Sets the initial resolution at which to display the map.
                // 0 shows a world view, 5 shows the landmass or the continents, 10 shows the city, 15 shows streets, 20 shows buildings.
            });
            bounds.extend(pos); //Bounds indicates the size of the search field. Represented either as a rectangle or a radius, measured in meters.  
            //The former takes a google.maps.LatLng object, and the latter takes a simple integer, representing the circle's radius in meters, max being 50,000 meters. 


            //This portion displays the information window at the center of the map.
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.'); //The string is returned if the geolocation services have succeeded. 
            infoWindow.open(map);
            map.setCenter(pos); //Determines the center the map will default too.

            getNearbyPlaces(pos); //This will allow the function getNearbyPlaces to retrieve the users geolocation or default location.
        }, () => {
            //This section handles the instance if a user has denied Location Sharing Services but the browser does support them.
            handleLocationError(true, infoWindow);

        });
    } else {
        //This section represents the instances if the browser does not support Location Sharing Services.
        handleLocationError(false, infoWindow);
    }
}

//The following function will handle the geolocation errors.
function handleLocationError(browserHasGeolocation, infoWindow) {

    //If the geolocation fails, the browser will set the default location to the Coder Foundry Headquarters in Kernersville, NC.
    pos = { lat: 36.0966, lng: -80.0720 };

    //Allows output to id="map" in the index.html file. 
    map = new google.maps.Map(document.getElementById("map"), {
        center: pos, //Centers the map to the given geolocation that is determined by the variable pos.
        zoom: 15 //Sets the initial resolution at which to display the map.
        // 0 shows a world view, 5 shows the landmass or the continents, 10 shows the city, 15 shows streets, 20 shows buildings.
    });

    //This portion displays the information window at the center of the map.
    infoWindow.setPosition(pos);
    //This portion returns the following strings if the geolocation services aren't operable.
    infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation services.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;

    getNearbyPlaces(pos); //This will allow the function getNearbyPlaces to retrieve the users geolocation or default location.
}

//The following function will handle the type of search field, which is bank for our application.
function getNearbyPlaces(position) {
    let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE, //rankBy requires you to specify a location (geolocation or default) and .DISTANCE blocks the user from providing a radius or bounds. The default search field is 5 miles. 
        keyword: 'bank' //This is the type of business that will be searched for.
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

//The following function will handle the results (up to 20) of the nearby search that was done above.
function nearbyCallback(results, status) {
    //The following if statements checks if the getNearbyPlaces function returns with valid locations.
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results); //createMarkers will places up to 20 markers on the maps with the given type of search (bank) within 5 miles of the location, either the users geolocation or default location.
    }
}

//The following function will create markers for the search result.
function createMarkers(places) {
    places.forEach(place => {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
        });

        //Adds a click event listener to the markers that will display the information present on line 108.  
        google.maps.event.addListener(marker, 'click', () => {
            let request = {
                placeId: place.place_id,
                fields: ['name', 'formatted_address', 'geometry', 'rating', 'website', 'photos']
            };

            //This code only allows the above information to be fetched if the click event is activated, else the API limits would be reached.
            service.getDetails(request, (placeResult, status) => {
                showDetails(placeResult, marker, status)
            });
        });

        //Adjusts the map bounds to include the location of this marker. 
        bounds.extend(place.geometry.location);
    });

    //Once all markers are placed, adjust the bounds of the map to show all the markers within the visible area.
    map.fitBounds(bounds);
}

//The following function builds an information window to display the markers details above the marker.
function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();
        let rating = "None";
        if (placeResult.rating) rating = placeResult.rating;
        placeInfowindow.setContent('<div><strong>' + placeResult.name + '</strong><br>' + 'Rating: ' + rating + '</div>');
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
        showPanel(placeResult);
    } else {
        console.log('showDetails failed: ' + status);
    }
}