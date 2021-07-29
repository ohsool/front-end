import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";

const MainInput = (props) => {
    return(
        <React.Fragment>
            <LinkWrap>
                <Wrap>
                    <LinkBox onClick={() => {
                        history.push("/test");
                    }}>
                        당신을 위한 오늘의 맥주는?
                    </LinkBox>
                    <LinkBox onClick={() => {
                    }}>
                        대한민국의 모든 맥주
                    </LinkBox>
                    <LinkBox onClick={() => {
                    }}>
                        대한민국의 모든 맥주
                    </LinkBox>
                </Wrap>
                <ButtonWrap>
                    <LoginButton>LOGIN</LoginButton>
                    <LoginButton>JOIN</LoginButton>
                </ButtonWrap>
            </LinkWrap>
        </React.Fragment>
    )
}

export default MainInput;

const LinkWrap = styled.div`
    width: 100%;
    margin-top: 160px;
`;

const Wrap = styled.div`
    display: inline-block;
`;

const LinkBox = styled.div`
    display: flex;
    justify-content: center;
    width: 276px;
    height: 45px;
    line-height: 45px;
    margin: 0 0 20px 0;
    background-color: transparent;
    border: 1px solid #FFFFFF;
    border-radius: 22.5px;
    color: #FFFFFF;
`;

const ButtonWrap = styled.div`
    margin: 0 auto;
    width: 143px;
    display: flex;
    justify-content: space-between;
`;

const LoginButton = styled.button`
    background-color: transparent;
    border: transparent;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
`;