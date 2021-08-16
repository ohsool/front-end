import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../share/image/loader.png";

const Loader = () => {
    return (
        <>
            <Container>
                <img src={logo} alt="logo" />
            </Container>
        </>
    );
};

const rotate = keyframes`
0% {
    transform:scale(0)
    }
50% {
    transform: scale(.5)
    }
100% {
    transform:scale(0)
}
`;

const Container = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
    animation: ${rotate} linear 0.7s infinite;
`;
export default Loader;
