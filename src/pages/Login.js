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
    }); //로그인 정보
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
        if(email === "" && password === ""){  //공란 체크
            window.alert("아이디 혹은 비밀번호를 입력하세요.");
            return;
        }
        dispatch(logIn(login_info)) //로그인 정보 디스패치
        setLogin_Info({  //로그인인풋 초기화
            email: "",
            password: ""
        });
    }

    const submitEnterLogin = (e) => {
        if(e.key === "Enter"){
            submitLogin();
        }
    }

    const onKeyUp = () => { //이메일 비밀번호 입력시 버튼 색 변화
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
                            name="password"
                            value={password}
                            onKeyUp={onKeyUp}
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
                            <SocialLoginButton
                                onClick={() => {
                                    window.location.href = "https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252F%25EC%2598%25A4%25EB%258A%2598%25EC%259D%2598%25EC%2588%25A0.shop%252Fapi%252Fuser%252Fkakao%252Fcallback%26client_id%3De37e7e15c49d382837d031d60c753b43"
                                }}>
                                카카오톡으로 로그인하기
                            </SocialLoginButton>
                            <SocialLoginButton
                                onClick={() => {
                                    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=https%3A%2F%2FXN--WH1BO80AC4CI9A.shop%2Fapi%2Fuser%2Fgoogle%2Fcallback&scope=email%20profile&client_id=191938571707-m8nhi8j2inb8dn0c0pq99f3gc1hd9sfd.apps.googleusercontent.com&flowName=GeneralOAuthFlow"
                                }}>
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
`;

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