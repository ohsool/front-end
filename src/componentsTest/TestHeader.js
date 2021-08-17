import React, { useEffect, useState } from "react";
import styled from "styled-components";
import myIconWhite from "../share/image/testHeaderIcon.png";
import myIconBlack from "../share/image/HeaderIcon.png";
import _ from "lodash";

import { history } from "../redux/configureStore";
import "../share/style/TestHeader.css";

const TestHeader = (props) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const _updateScroll = _.throttle(() => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }, 300);
    useEffect(()=>{
        window.addEventListener('scroll', _updateScroll);
    }, [scrollPosition]);

    return (
        <React.Fragment>
            <HeaderWrap>
            {scrollPosition < 270 ? 
                (<HeaderBox>             
                    <WhiteHeaderLogo 
                        onClick={() => {
                        history.push("/")
                        }}>오늘의술
                    </WhiteHeaderLogo>
                    <WhiteUserImage
                        style={{backgroundImage: `url(${myIconWhite})`}}
                        onClick={() => {
                            history.push("/mypage")
                        }}
                    ></WhiteUserImage>
                    </HeaderBox>
                    )
                :
                (<HeaderBox>
                <BlackHeaderLogo 
                    onClick={() => {
                    history.push("/")
                    }}>오늘의술</BlackHeaderLogo>
                    <BlackUserImage
                        style={{backgroundImage: `url(${myIconBlack})`}}
                        onClick={() => {
                            history.push("/mypage")
                        }}
                    ></BlackUserImage>
                    </HeaderBox>
                    )
                 }
            </HeaderWrap>
        </React.Fragment>
    )
}

export default TestHeader;

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
    background-color: transparent;
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


const BlackHeaderLogo = styled.div`
    display: inline-block;
    font-size: 20px;
    line-height: 45px;
    color: #333333;
    font-weight: bold;
    cursor: pointer;

`;
const WhiteHeaderLogo = styled.div`
    display: inline-block;
    font-size: 20px;
    line-height: 45px;
    color: #FFFFFF;
    font-weight: bold;
    cursor: pointer;
`;

const WhiteUserImage = styled.div`
    position: absolute;
    width: 24px;
    height: 24px;
    top: 10px;
    right: 12px;
    cursor: pointer;
`;

const BlackUserImage = styled.div`
    position: absolute;
    width: 24px;
    height: 24px;
    top: 10px;
    right: 12px;
    cursor: pointer;
`;