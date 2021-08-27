import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { User } from "../redux/reducer/userSlice";

import { history } from "../redux/configureStore";

const MainInput = (props) => {
    const is_login = useSelector((state) => state.user.currentUser.message);
    const userId = useSelector(User);

    return(
        <React.Fragment>
            <LinkWrap>
                <Wrap>
                    <LinkBox onClick={() => {
                        history.push("/test/");
                    }}>
                        당신을 위한 오늘의 맥주는?
                    </LinkBox>
                    <LinkBox onClick={() => {
                        history.push("/beer/list/all")
                    }}>
                        대한민국의 모든 맥주
                    </LinkBox>
                    <LinkBox onClick={() => {
                        history.push(`/mybeer/${userId}/dogam`)
                    }}>
                        나의 맥주 도감
                    </LinkBox>
                </Wrap>
                {is_login !== "success" ? 
                (<ButtonWrap>
                    <LoginButton 
                        onClick={() => {
                            history.push("/signup")
                    }}>JOIN</LoginButton>
                    <LoginButton
                        onClick={() => {
                            history.push("/login")
                    }}>LOGIN</LoginButton>
                </ButtonWrap>)
                : null
                }
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
    margin: 0 0 16px 0;
    background-color: transparent;
    border: 1px solid #FFFFFF;
    border-radius: 22.5px;
    color: #FFFFFF;
    z-index: 9999;
    cursor: pointer;
`;

const ButtonWrap = styled.div`
    margin: 0 auto;
    width: 161px;
    display: flex;
    justify-content: space-between;
`;

const LoginButton = styled.button`
    background-color: transparent;
    border: transparent;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`;