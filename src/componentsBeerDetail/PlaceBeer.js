import React, { useState } from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import { mapReport } from "../redux/async/suggest";
import MapImage from "./MapImage";
import Header from "../Header";

const PlaceBeer = (props) => {
    const dispatch = useDispatch();
    const [clickReport, setClickReport] = useState();
    const beerId = props.location.state;
    const ReportPlace = () => {
        const mapData = {
            beerId: beerId,
            name: clickReport.place_name,
            address: clickReport.address_name,
            url: clickReport.place_url,
          }
        dispatch(mapReport(mapData));
    }

    return(
        <React.Fragment>
            <Header/>
            <InputWrap>
            
            </InputWrap>
            <MapWrap>
                <MapImage setClickReport={setClickReport}></MapImage>
                <button onClick={ReportPlace} style={{width: "40px", height: "20px"}}>제보</button>
            </MapWrap>
        </React.Fragment>
    )
}

export default PlaceBeer;

const InputWrap = styled.div`
    width: 100%;
    height: 70px;
`;

const MapWrap = styled.div`
    width: 100%;
    height: 525px;
`;
