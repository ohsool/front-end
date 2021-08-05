import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import Login from "../pages/Login";

const MainInput = (props) => {
    const [is_login, setIs_Login] = useState(false);
    const session = sessionStorage.getItem("token");

    useEffect(()=> {
        if(session){
            setIs_Login(true);
        }else{
            setIs_Login(false);
        }
    }, [is_login]);

    const goBeerDogam = () => {
        if(!session){
            window.alert("로그인이 필요한 서비스입니다!")
        }else{
            history.push("/mybeer")
        }
    }

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
                        history.push("/beer/list")
                    }}>
                        대한민국의 모든 맥주
                    </LinkBox>
                    <LinkBox onClick={goBeerDogam}>
                        나의 맥주 도감
                    </LinkBox>
                </Wrap>
                {is_login === false ? 
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