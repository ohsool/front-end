import React from "react";
import styled from "styled-components";
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
    position: absolute;
    display: flex;
    justify-content: center;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
`;
export default Loader;
