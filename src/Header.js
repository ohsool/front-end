import React from "react";
import styled from "styled-components";
import myIcon from "./share/image/HeaderIcon.png";
import Back from "./share/image/Back.png";

import { history } from "./redux/configureStore";
import { getCookie } from "./share/Cookie";
const Header = (props) => {
    const is_login = getCookie("_osid");

    const comfirm_login = ()=>{
        if(!is_login){
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login");
                return;
            }
        }else{
            history.push("/mypage");
        }
    }
    return (
        <React.Fragment>
            <HeaderWrap>
            <HeaderBox>
                    <GoBack style={{backgroundImage: `url(${Back})`}}
                    onClick={()=>{ 
                        history.goBack();
                    }}></GoBack>
                    <HeaderLogo 
                    onClick={() => {
                        history.push("/")
                    }}>오늘의술</HeaderLogo>
                    <UserImage style={{backgroundImage: `url(${myIcon})`}}
                        onClick={() => {
                            comfirm_login();
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
    display: flex;
    z-index: 10;
`;
const GoBack = styled.div`
    width: 24px;
    height: 24px;
    background-size: cover;
    margin: 10px 0 0 12px;
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
