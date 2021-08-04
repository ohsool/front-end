import React from "react";
import styled from "styled-components";
import TestHeader from "../componentsTest/TestHeader";
import Logo from "../share/Logo.jpeg"

const MainLogo = () => {
    return(
        <React.Fragment>
            <ImageGridcenter>
                <MainLogoWrap>
                </MainLogoWrap>
                <MainLogoText>오늘의술</MainLogoText>
            </ImageGridcenter>
        </React.Fragment>
    )
}

export default MainLogo;

const ImageGridcenter = styled.div`
    display: inline-block;
    height: 141px;
    margin: 0 auto;
    margin-top: 115px;
`;

const MainLogoWrap = styled.div`
    display: inline-block;
    border: 2px solid #FFFFFF;
    background-size: cover;
    width: 89px;
    height: 61px;
`;
const MainLogoText = styled.div`
    margin-top: 20px;
    width: 123px;
    height: 32px;
    font-size: 32px;
    color: #FFFFFF;
`;