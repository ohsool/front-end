import React, { useEffect, useState } from "react";
import styled from "styled-components";
import myIconWhite from "../share/image/testHeaderIcon.png";
import myIconBlack from "../share/image/HeaderIcon.png";
import _ from "lodash";
import backWhite from "../share/image/testHeaderBack.png";
import backBlack from "../share/image/Back.png";

import { history } from "../redux/configureStore";
import "../share/style/TestHeader.css";
import { useSelector } from "react-redux";

const TestHeader = (props) => {
    const is_login = useSelector(state => state.user.currentUser.message);
    const [scrollPosition, setScrollPosition] = useState(0);
    const is_iphone = navigator.userAgent.toLowerCase(null);

    const _updateScroll = _.throttle(() => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }, 300);
    useEffect(()=>{
        window.addEventListener('scroll', _updateScroll);
    }, [scrollPosition]);

    return (
        <React.Fragment>
            <div className={is_iphone.indexOf("iphone") !== -1 ? "iphoneHeaderTest" : "headerTest"}>
            {scrollPosition < 270 ? 
                (<HeaderBox>             
                    <Back style={{backgroundImage: `url(${backWhite})`}}
                    onClick={()=>{ 
                        history.goBack();
                    }}></Back>
                    <WhiteHeaderLogo 
                        onClick={() => {
                        history.push("/")
                        }}>오늘의술
                    </WhiteHeaderLogo>
                    <WhiteUserImage
                    ></WhiteUserImage>
                    </HeaderBox>
                    )
                :
                (<HeaderBox>
                    <Back style={{backgroundImage: `url(${backBlack})`}}
                    onClick={()=>{ 
                        history.goBack();
                    }}></Back>
                    <BlackHeaderLogo 
                    onClick={() => {
                    history.push("/")
                    }}>오늘의술</BlackHeaderLogo>
                    <BlackUserImage
                    ></BlackUserImage>
                    </HeaderBox>
                    )
                 }
            </div>
        </React.Fragment>
    )
}

export default TestHeader;

const HeaderBox = styled.div`
    width: 360px;
    display: flex;
    z-index: 9999;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    display: flex;
`;

const Back = styled.div`
    width: 24px;
    height: 24px;
    background-size: cover;
    margin: 10px 0 0 12px;
    cursor: pointer;
`;

const BlackHeaderLogo = styled.div`
    font-family: "GmarketSansM";
    display: inline-block;
    font-size: 20px;
    line-height: 45px;
    color: #333333;
    font-weight: bold;
    cursor: pointer;

`;
const WhiteHeaderLogo = styled.div`
    font-family: "GmarketSansM";
    display: inline-block;
    font-size: 20px;
    line-height: 45px;
    color: #FFFFFF;
    font-weight: bold;
    cursor: pointer;
`;

const WhiteUserImage = styled.div`
    width: 24px;
    height: 24px;
`;

const BlackUserImage = styled.div`
    width: 24px;
    height: 24px;
`;