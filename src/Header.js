import React from "react";
import styled from "styled-components";
import myIcon from "./share/image/HeaderIcon.png";

import { history } from "./redux/configureStore";
const Header = (props) => {

    return (
        <React.Fragment>
            <HeaderWrap>
            
            <HeaderBox>
                    <HeaderLogo 
                    onClick={() => {
                        history.push("/")
                    }}>오늘의술</HeaderLogo>
                    <UserImage style={{backgroundImage: `url(${myIcon})`}}
                        onClick={() => {
                        history.push("/mypage")
                    }}></UserImage>
            </HeaderBox>
            </HeaderWrap>
        </React.Fragment>
    )
}

export default Header;

const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const HeaderBox = styled.div`
    width: 360px;
    position: fixed;
    top: 0;
    height: 45px;
    justify-content: center;
    background-color: white;
    display: flex;
    z-index: 10;
`;

const HeaderLogo = styled.div`
    display: inline-block;
    font-size: 20px;
    line-height: 45px;
    color: #333333;
    font-weight: bold;
    cursor: pointer;
`;

const UserImage = styled.div`
    position: absolute;
    width: 24px;
    height: 24px;
    top: 10px;
    right: 12px;
`;
