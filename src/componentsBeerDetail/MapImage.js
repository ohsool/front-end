import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import imagesrc from "../share/image/marker.png";

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
            
            //마커이미지 설정
            const imageSrc = imagesrc, // 마커이미지 주소
                imageSize = new kakao.maps.Size(24.56, 33.4), // 마커이미지의 크기
                imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            
             const markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
            );   

            const marker = new kakao.maps.Marker({
                map: map,
                image: markerImage,
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
        }


    return(
        <React.Fragment>
            <InputWrap onKeyPress={SearchPlace}>
                <SearchInput 
                ><input 
                ref={inputRef}
                placeholder="검색어를 입력하세요"
                /></SearchInput>
            </InputWrap>
            <div 
                className= "map"
                ref={container}
                style={{width:"100vw", height:"400px"}}>
            </div>
        </React.Fragment>
    )
}

export default MapImage;

const InputWrap = styled.div`
    margin-top: 40px;
    width: 100%;
`;

const SearchInput = styled.div`
    width: 360px;
    & > input{
        width: 292px;
        height: 30px;
        border:none;
        margin: 20px 24px;
        background: #F6F6F6;
        border-radius: 18px;
        outline: none;
        padding-left: 20px;
    }
    margin: 0 auto;
`
