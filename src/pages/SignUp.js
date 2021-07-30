import React, {useState} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
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
    return(
        <React.Fragment>
            <SignUpWrap>
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
                    onChange={onChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="비밀번호를 한번 더 입력해주세요"
                ></InputSignUP>
            </InputWrap>
            <SignUpButton 
                onClick={submitSignUp}>회원가입 완료</SignUpButton>
            </SignUpWrap>
        </React.Fragment>
    )
} 

export default SignUp;

const SignUpWrap = styled.div`
    width: 360px;
    height: 640px;
    background-color: #FFFFFF;
`;

const InputWrap = styled.div`
    text-align: center;
    width: 360px;
    padding-top: 40px;
`;

const InputSignUP = styled.input`
    width: 320px;
    height: 50px;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #FFD074;
    font-size: 15px;
    outline: none;
`;

const SignUpButton = styled.button`
    width: 111px;
    height: 40px;
    float: right;
    font-weight: bold;
    margin-right: 30px;
    margin-top: 80px;
    border: 2px solid #FFB521;
    background-color: transparent;
    border-radius: 10px;
    color: #FFB521;
`;