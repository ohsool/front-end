import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { history } from "../redux/configureStore";
import { logIn } from "../redux/async/user";

const LoginModal = (props) => {
    const dispatch = useDispatch();
    const { open, close } = props;
    const [user_info, setUser_Info] = useState({
        email: "",
        password: ""
    });
    const { email, password } = user_info;

    const onChange = (e) => {
        setUser_Info({ ...user_info, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        if(email === "" && password === ""){
            window.alert("아이디 혹은 비밀번호를 입력하세요!")
            return;
        }
        dispatch(logIn(user_info))
        setUser_Info({
            email: "",
            password: ""
        });
    }
    const submitEnterSignUp = (e) => {
        if(e.key === "Enter"){
            onSubmit();
        }
    }
    return (

        <React.Fragment>
            {open ?
                <Background>
                    <ModalWrap>
                        <ModalContainer>
                            <CloseIcon onClick={close}>X</CloseIcon>
                            <InputWrap>
                                <InputBox
                                    placeholder="이메일"
                                    onChange={onChange}
                                    name="email"
                                    value={email}
                                ></InputBox>
                                <InputBox
                                    type="password"
                                    onKeyPress={submitEnterSignUp}
                                    placeholder="비밀번호"
                                    onChange={onChange}
                                    name="password"
                                    value={password}
                                ></InputBox>
                            </InputWrap>
                            <ButtonWrap>
                                <SignUpButton
                                    onClick={() => {
                                        history.push("/signup")
                                        close();
                                    }}
                                >회원가입</SignUpButton>
                                <LoginButton
                                    onClick={onSubmit}
                                >로그인</LoginButton>
                            </ButtonWrap>
                            <SocialLoginWrap>
                                <SocialKaKaoButton>카카오톡으로 로그인하기</SocialKaKaoButton>
                                <SocialGoogleButton>구글로 로그인하기</SocialGoogleButton>
                            </SocialLoginWrap>
                        </ModalContainer>
                    </ModalWrap>
                </Background> : null}
        </React.Fragment>
    )
}

export default LoginModal;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    animation: fadeIn .5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    z-index: 10;
    display: flex;
    justify-content: center;
`;

const CloseIcon = styled.div`
    float: right;
    width: 30px;
    line-height: 30px;
    font-weight: 500;
    font-size: 20px;
    border-radius: 10px;
    height: 30px;
    background-color: white;
`;

const ModalWrap = styled.div`
    @keyframes scaleUp {
        0% {
            transform: scale(.5) translateY(1000px);
            opacity: 0;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
    position: absolute;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    bottom: 50px;
    width: 300px;
    display: flex;
    justify-content: center;
`;
//높이 640으로 하면 전체로 보여지게됨
const ModalContainer = styled.div`
    height: 580px;  
    width: 290px;
    border-radius: 10px;
    background: #FFFFFF;
`;

const InputWrap = styled.div`
    margin-top: 37px;
`;

const InputBox = styled.input`
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #FFD074;
    outline: none;
    color: #888888;
    background-color: transparent;
    margin-top: 10px;
    width: 250px;
    height: 30px;
    ::placeholder,
    ::-webkit-input-placeholder {
        color: #888888;
    }
`;

const ButtonWrap = styled.div`
    width: 250px;
    height: 40px;
    margin: 5px auto;
`;

const SignUpButton = styled.button`
    border-left: none;
    border-top: none;
    border-bottom: none;
    border-right: 1px solid #FFD074;
    background-color: #FFFFFF;
    width: 125px;
    height: 36px;
    cursor: pointer;
`;

const LoginButton = styled.button`
    background-color: #FFFFFF;
    width: 125px;
    height: 36px;
    cursor: pointer;
    border: none;
`;

const SocialLoginWrap = styled.div`
    margin-top: 10px;
`;

const SocialKaKaoButton = styled.button`
    color: #3C1E1E;
    margin-top: 10px;
    background-color: #FAE100;
    width: 250px;
    height: 40px;
    border-radius: 56px;
    border: none;
`;

const SocialGoogleButton = styled.button`
    color: #3C1E1E;
    margin-top: 10px;
    background-color: white;
    width: 250px;
    height: 40px;
    border-radius: 56px;
    border: 1px solid #3C1E1E;
`;
