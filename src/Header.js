import React from "react";
import styled from "styled-components";
import myIcon from "./share/image/HeaderIcon.png";

import { history } from "./redux/configureStore";
const Header = (props) => {

    return (
        <React.Fragment>
            <HeaderWrap>
            <HeaderBox>
                    <GoBack
                    onClick={()=>{ 
                        history.goBack()
                    }}></GoBack>
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
    background-color: white;
    position: fixed;
    top: 0;
    height: 45px;
    background-color: white;
`;

const HeaderBox = styled.div`
    width: 360px;
    display: flex;

    justify-content: space-between;
    // background-color: white;
    display: flex;
    z-index: 10;
`;
const GoBack = styled.div`
    width: 24px;
    height: 24px;
    margin: 10px 0 0 12px;
    border: 1px solid #C4C4C4;
    cursor: pointer;
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
    width: 24px;
    height: 24px;
    margin: 10px 12px 0 0;
    cursor: pointer;
`;
