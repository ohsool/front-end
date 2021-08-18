import React from "react";
import styled from "styled-components";
import myIcon from "./share/image/HeaderIcon.png";
import Back from "./share/image/Back.png";

import { history } from "./redux/configureStore";
import { getCookie } from "./share/Cookie";
import "./share/style/TestHeader.css";
import { useSelector } from "react-redux";

const Header = (props) => {
    const is_login = getCookie("_osid");
    const userInfo = useSelector(state => state.user.currentUser);
    const is_iphone = navigator.userAgent.toLowerCase();

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
            <div className={is_iphone.indexOf("iphone") !== -1 ? "iphoneHeader" : "header"}>
            <HeaderBox>
                    <GoBack style={{backgroundImage: `url(${Back})`}}
                    onClick={()=>{ 
                        history.goBack();
                    }}></GoBack>
                    <HeaderLogo
                    onClick={() => {
                        history.push("/")
                    }}><span>오늘의술</span></HeaderLogo>
                    {userInfo.message === "success" ? 
                    <UserImage onClick={() => {
                        history.push("/mypage")
                    }}>
                        <span>{userInfo.nickname}</span>
                        <img></img>
                    </UserImage>
                    :
                    <NoneUserImage style={{backgroundImage: `url(${myIcon})`}}
                        onClick={() => {
                            comfirm_login();
                    }}></NoneUserImage> }
            </HeaderBox>
            </div>
        </React.Fragment>
    )
}

export default Header;

const HeaderBox = styled.div`
    width: 360px;
    z-index: 10;
`;
const GoBack = styled.div`
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: cover;
    margin: 10px 0 0 12px;
    cursor: pointer;
`;

const HeaderLogo = styled.div`
    font-family: "GmarketSansM";
    position: absolute;
    top: 12px;
    left: 50%;
    margin-left: -38px;
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    cursor: pointer;
`;

const UserImage = styled.div`
    display: flex;
    float: right;
    & > img{
        margin: 10px 12px 0 0;
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 24px;
        border: 0.5px solid black;
        cursor: pointer;
    }
    & > span{
        font-size: 12px;
        font-weight: normal;
        margin-right: 10px;
        line-height: 45px;
    }
`;

const NoneUserImage = styled.div`
    display: flex;
    float: right;
    width: 24px;
    height: 24px;
    margin: 10px 12px 0 0;
    cursor: pointer;
`;
