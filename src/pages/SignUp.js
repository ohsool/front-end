import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {signUp} from "../redux/async/user";
import { emailCheck, pwdReg} from "../share/checkReg";

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [signup_info, setSignUp_Info] = useState({
        email: "",
        nickname: "",
        password: "",
        confirmPassword: ""
    });

    const {email, nickname, password, confirmPassword} = signup_info;

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }
    const submitSignUp = () => {
        if(email === "" && nickname === "" && password === "" && confirmPassword === "" ){
            window.alert("아이디, 닉네임, 비밀번호를 입력하세요!")
            return;
        }

        if(password !== confirmPassword){
            window.alert("비밀번호 및 비밀번호확인이 다릅니다!");
            return;
        }
        if(!emailCheck(email)){
            window.alert("이메일 형식으로 입력해주세요!")
            return;
        }
        if(!pwdReg(password)){
            window.alert("비밀번호를 4자 이상 입력해주세요!");
            return;
        }
        dispatch(signUp(signup_info));
        setSignUp_Info({
            email: "",
            nickname: "",
            password: "",
            confirmPassword: ""
        })
    }
    const submitEnterSignUp = (e) => {
        if(e.key === "Enter"){
            submitSignUp();
        }
    }
    return(
        <React.Fragment>
            <SignUpWrap>
                <Container>
                    <Wrap>
                        <WelcomeWrap>
                            <p>Hello.</p>
                            <span>오늘의술에 오신걸 환영합니다!</span>
                        </WelcomeWrap>
                    </Wrap>
                    <InputWrap>
                        <InputSignUP
                            onChange={onChange}
                            name="email"
                            value={email}
                            placeholder="아이디를 입력해주세요"
                        ></InputSignUP>
                        <InputSignUP 
                            onChange={onChange}
                            name="nickname"
                            value={nickname}
                            placeholder="닉네임을 입력해주세요"
                        ></InputSignUP>
                        <InputSignUP 
                            type="password"
                            onChange={onChange}
                            name="password"
                            value={password}
                            placeholder="비밀번호를 입력해주세요"
                        ></InputSignUP>
                        <InputSignUP 
                            type="password"
                            onKeyPress={submitEnterSignUp}
                            onChange={onChange}
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="비밀번호를 한번 더 입력해주세요"
                        ></InputSignUP>
                        <SignUpButton 
                            onClick={submitSignUp}>
                            가입하기
                        </SignUpButton>
                    </InputWrap>
            </Container>
            </SignUpWrap>
        </React.Fragment>
    )
} 

export default SignUp;

const SignUpWrap = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    text-align: center;
`;
const Container = styled.div`
    width: 360px;
    margin: 0 auto;
`;

const Wrap = styled.div`
    width: 360px;
    display: flex;
    text-align: left;
    margin-left: 24px;
`;

const WelcomeWrap = styled.div`
    width: 192px;
    margin-top: 90px;
    & > p {
        font-weight: 400;
        font-size: 35px;
        color: #FFC44F;
        margin: 0 0 20px 0;
    }
    & > span {
        font-size: 25px;
        font-weight: normal;
    }
`;

const InputWrap = styled.div`
    position: absolute;
    width: 360px;
    bottom: 81px;
`;

const InputSignUP = styled.input`
    width: 312px;
    height: 50px;
    margin-bottom: 15px;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid #FFD074;
    outline: none;
    ::placeholder,
    ::-webkit-input-placeholder {
        position: absolute;
        bottom: 9px;
        font-size: 14px;
        color: #C4C4C4;
    }
`;

const SignUpButton = styled.button`
    margin-top: 110px;
    width: 312px;
    height: 45px;
    font-weight: bold;
    bottom: 81px;
    border: 1px solid #FFB521;
    background-color: transparent;
    border-radius: 24px;
    color: #FFB521;
`;