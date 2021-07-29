import React, {useEffect, useState} from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import "./TestHeader.css"

const TestHeader = (props) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);
    }, [scrollPosition]);
    return (
        <React.Fragment>
            <HeaderWrap>
                <HeaderBox>
                    <div className={scrollPosition < 270 ? "white_header" : "black_header"}
                    onClick={() => {
                        history.push("/")
                    }}>오늘의술</div>
                    <UserImage></UserImage>
                </HeaderBox>
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
    width: 100%;
    position: fixed;
    top: 0;
    height: 45px;
    justify-content: center;
    background-color: transparent;
    display: flex;
    z-index: 10;
`;

const UserImage = styled.div`
    position: absolute;
    width: 24px;
    height: 24px;
    border: 1px solid #FFFFFF;
    top: 10px;
    right: 12px;
`;
const Testdiv = styled.div`
    width: 100%;
    height: 1000px;
`;
