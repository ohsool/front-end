import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../share/image/loader.png";
import "./style/loader.css";

const Loader = () => {
    return (
        <>
            <Container>
            <div class="loadingio-spinner-spinner-wt52qsoww8"><div class="ldio-4yxmiifm49g">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>
            </Container>
        </>
    );
};

const Container = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
`;
export default Loader;
