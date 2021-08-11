import React, { useState } from "react";
import styled from "styled-components";
import MapImage from "./MapImage";


const MyPageModal = (props) => {
    const { open, close, beerId } = props;

    return(
        <React.Fragment>
            {open ?
            <Background>
                <ModalWrap >
                    <MapImageWrap>
                    <CloseIcon
                        onClick={close}>
                    </CloseIcon>
                        <MapImage beerId={beerId} ></MapImage>
                    </MapImageWrap>
                </ModalWrap>
            </Background>
            : null }
        </React.Fragment>
    )
}

export default MyPageModal;

const Background = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    animation: fadeIn .5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    z-index: 10;
    display: flex;
    justify-content: center;
`;

const ModalWrap = styled.div`
    position: absolute;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    border-radius: 10px 10px 0 0;
    width: 100%;
    top: 880px;
    display: flex;
    flex-direction: column;
    @keyframes scaleUp {
        0% {
            transform: scale(.8) translateY(1000px);
            opacity: 0;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;

const MapImageWrap = styled.div`
    margin: 0 auto;
    box-shadow: 3px 3px 3px 3px;
    width: 340px;
    height: 360px;
    background-color: #FFFFFF;
`;

const CloseIcon = styled.div`
    float: right;
    width: 20px;
    height: 20px;
    top: 0;
    border: 1px solid black;
`;
