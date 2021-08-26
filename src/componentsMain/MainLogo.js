import React from "react";
import styled from "styled-components";

const Logo = "/images/mainLogo.png";

const MainLogo = () => {
    return(
        <React.Fragment>
            <ImageGridcenter>
                <MainLogoWrap>
                    <img src={Logo}></img>
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
    background-size: cover;
    width: 89px;
    height: 61px;
    & > img {
        width: 89px;
        height: 61px;
        background: none;
    }
`;

const MainLogoText = styled.div`
    font-family: "GmarketSansM";
    margin-top: 20px;
    width: 125px;
    height: 32px;
    font-size: 32px;
    color: #FFFFFF;
`;