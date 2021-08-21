import React, { useEffect } from 'react';
import styled from 'styled-components';

const Main = (props) => {
    return (
        <React.Fragment>
            <Background>
                <ModalWrap> 
                    <p>공사중입니다 개선하고 찾아뵙겠습니다-오늘의 술팀 일동</p>
                </ModalWrap>
            </Background>
        </React.Fragment>
    )
};

export default Main;

const Background = styled.div`
    position: fixed;
    z-index: 3;
    //position: fixed !important;
    //z-index: 9999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    animation: fadeIn .5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    display: flex;
    justify-content: center;
 
`;

const ModalWrap = styled.div`
    position: fixed !important;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    background-color: #FDF9F0;
    border-radius: 10px 10px 0 0;
    //bottom: 0px;
    width: 360px;
    display: flex;
    flex-direction: column;

`;
