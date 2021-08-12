import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const MapImage = ({setClickReport}) => {
        const kakao = window.kakao;
        const container = useRef(null);
        const inputRef = useRef(null);
        const dispatch = useDispatch();
        let map;
        const infowindow = new kakao.maps.InfoWindow({zIndex:1});

        useEffect(() => {
            findLocation();
        }, []);

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

        const SearchPlace = (e) => {
            if(e.key === "Enter"){
                searchbtnclicked();
            }
        }

        function choose(place) {
            // alert(`You chose ${place.place_name}`);
            console.log(place);      
        }


    return(
        <React.Fragment>
            <InputWrap onKeyPress={SearchPlace}>
                <InputPlace ref={inputRef}></InputPlace>
            </InputWrap>
            <div 
                className= "map"
                ref={container}
                style={{width:"100vw", height:"365px"}}></div>
        </React.Fragment>
    )
}

export default MapImage;

const InputWrap = styled.div`
    margin-top: 40px;
    width: 100%;
    height: 70px;
    text-align: center;
`;

const InputPlace = styled.input`
    width: 312px;
    height: 30px;
    margin-top: 20px;
    background-color: #F7F7F7;
    border: none;
    outline: none;
    border-radius: 18px;
    padding-left: 24px;
    color: #151515;
    font-size: 12px;
    font-weight: 500;
`;