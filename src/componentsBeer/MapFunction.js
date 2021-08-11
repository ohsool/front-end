export function findLocation(place) {  // Find my location. or not, 여삼빌딩
    if ("geolocation" in navigator) {  // if i can get my address
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            $("#location").text(`lat: ${lat}, long: ${long}`);

            makeMap(place, lat, long);
        });
    } else {  // if i cannot get my address. 여삼빌딩
        const lat = 37.4995482;
        const long = 127.0291611;

        makeMap(place, lat, long);
    }
}

export function makeMap(place, lat, long) {  // Make kakaomap
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(lat, long),
        level: 3
    };

    map = new kakao.maps.Map(container, options);  // make kakao MAP

    if (place) {  // keyword of address
        const places = new kakao.maps.services.Places();

        places.keywordSearch(place, placesSearchWithKeyword);  // find places with keywords. callback
    }
}

export function placesSearchWithKeyword(data, status, pagination) {  // find places with keywords. callback
    if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);  // show markers of searched places

            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
    } 
}

export function displayMarker(place) {  // show markers of searched places
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });

    kakao.maps.event.addListener(marker, 'click', function() {  // if i click marker
        infowindow.setContent('<div style="padding:5px;font-size:12px;" id="choosed">' + place.place_name + '</div>');
        infowindow.open(map, marker);

        choose(place);
    });
}

export function searchbtnclicked() {
    const place = $('#addressinput').val();

    findLocation(place);
}

function choose(place) {
    console.log(place);

    alert(`You chose ${place.place_name}`);
}
