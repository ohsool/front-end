import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { emailCheck, pwdReg } from "../share/checkReg";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/async/user";
import "../share/style/loginButton.css";

const Login = (props) => {
    const dispatch = useDispatch();
    const session = sessionStorage.getItem("token");
    const [is_typed, setIs_Typed] = useState(false);
    const [login_info, setLogin_Info] = useState({
        email: "",
        password: "",
    });
    const {email, password} = login_info;

    useEffect(() => {
        if(session){
            history.push("/")
        }
    }, []);

    const onChange = (e) => {
        setLogin_Info({...login_info, [e.target.name]: e.target.value});
    }

    const submitLogin = () => {
        if(email === "" && password === ""){
            window.alert("아이디 혹은 비밀번호를 입력하세요.");
            return;
        }
        dispatch(logIn(login_info))
        setLogin_Info({
            email: "",
            password: ""
        });
    }

    const submitEnterLogin = (e) => {
        if(e.key === "Enter"){
            submitLogin();
        }
    }

    const onKeyUp = () => {
        if(emailCheck(email) === true && pwdReg(password) === true ){
            setIs_Typed(true);
        }else{
            setIs_Typed(false);
        }
    }

    return(
        <React.Fragment>
            <LoginWrap>
                <Container>
                    <Wrap>
                        <WelcomeWrap>
                            <p>Hello.</p>
                            <span>어서오세요,</span><br/>
                            <span>오늘의술 입니다.</span>
                        </WelcomeWrap>
                    </Wrap>
                    <InputWrap>
                        <InputLogin
                            onChange={onChange}
                            name="email"
                            value={email}
                            placeholder="아이디(이메일)"
                        ></InputLogin>
                        <InputLogin 
                            type="password"
                            onChange={onChange}
                            onKeyUp={onKeyUp}
                            name="password"
                            value={password}
                            placeholder="비밀번호"
                        ></InputLogin>
                        <button 
                            className = {is_typed ? "yellowButton" : "whiteButton"}
                            onClick={submitLogin}
                            onKeyPress={submitEnterLogin}
                            >
                            로그인하기
                        </button>
                        <div>
                            <SocialLoginButton>
                                카카오톡으로 로그인하기
                            </SocialLoginButton>
                            <SocialLoginButton>
                                구글로 로그인하기
                            </SocialLoginButton>
                        </div>
                    </InputWrap>
            </Container>
            </LoginWrap>
        </React.Fragment>
    )
}

export default Login;

const LoginWrap = styled.div`
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
    margin-top: 40px;
    & > div { 
        margin-top: 60px;
    }
`;

const InputLogin = styled.input`
    width: 312px;
    height: 35px;
    padding-top: 15px;
    margin-bottom: 15px;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 0.5px solid #C4C4C4;
    outline: none;
    ::placeholder,
    ::-webkit-input-placeholder {
        position: absolute;
        bottom: 9px;
        font-size: 14px;
        color: #C4C4C4;
    }
`;

// const LoginButton = styled.button`
//     margin-top: 25px;
//     width: 312px;
//     height: 45px;
//     font-weight: bold;
//     bottom: 81px;
//     border: 1px solid #FFB521;
//     background-color: transparent;
//     border-radius: 24px;
//     color: #FFB521;
// `;

const SocialLoginButton = styled.button`
    margin-bottom: 10px;
    width: 312px;
    height: 45px;
    font-weight: bold;
    bottom: 81px;
    border: 1px solid #555555;
    background-color: transparent;
    border-radius: 24px;
    color: #555555;
`;