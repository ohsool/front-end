import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { mapReport } from "../redux/async/suggest";

const MapImage = ({beerId}) => {
        const kakao = window.kakao;
        const container = useRef(null);
        const inputRef = useRef(null);
        const dispatch = useDispatch();
        const [clickReport, setClickReport] = useState();
        let map;
        const infowindow = new kakao.maps.InfoWindow({zIndex:1});

        useEffect(() => {
            findLocation();
        }, []);

        const ReportPlace = () => {
            const mapData = {
                beerId: beerId,
                name: clickReport.place_name,
                address: clickReport.address_name,
                url: clickReport.place_url,
              }
            dispatch(mapReport(mapData));
        }

        function findLocation(place) {  // Find my location. or not, 여삼빌딩

            if ("geolocation" in navigator) {  // if i can get my address
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    
                    makeMap(place, lat, long);
                });
            } else {  // if i cannot get my address. 여삼빌딩
                const lat = 37.4995482;
                const long = 127.0291611;
                makeMap(place, lat, long);
            }
        }

        function makeMap(place, lat, long) {  // Make kakaomap
            const options = {
                center: new kakao.maps.LatLng(lat, long),
                level: 3
            };    // make kakao MAP

            map = new kakao.maps.Map(container.current, options);

            if (place) {  // keyword of address
                const places = new kakao.maps.services.Places();

                places.keywordSearch(place, placesSearchWithKeyword);  // find places with keywords. callback
            }
        }

        function placesSearchWithKeyword(data, status, pagination) {  // find places with keywords. callback
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);  // show markers of searched places

                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                map.setBounds(bounds);
            } 
        }

        function displayMarker(place) {  // show markers of searched places
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            const placeInfo = () => {
                infowindow.setContent(`
                <div style="
                    padding:5px;
                    font-size:12px;"> 
                ${place.place_name}
                </div>`);
            }

            kakao.maps.event.addListener(marker, 'click' , function() {  // if i click marker
                placeInfo();
                infowindow.open(map, marker);
                setClickReport(place);
                choose(place);
            });
        }

        function searchbtnclicked() {

            const place = inputRef.current.value;

            findLocation(place);
        }

        function choose(place) {
            // alert(`You chose ${place.place_name}`);
            console.log(place);      
        }


    return(
        <React.Fragment>
            <input ref={inputRef}></input>
            <button onClick={searchbtnclicked} style={{width: "40px", height: "20px", cursor: "pointer"}}>검색</button>
            <button onClick={ReportPlace} style={{width: "40px", height: "20px"}}>제보</button>
            <div 
                className= "map"
                ref={container}
                style={{width:"340px", height:"340px"}}></div>
        </React.Fragment>
    )
}

export default MapImage;