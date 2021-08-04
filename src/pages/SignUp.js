import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";

import {useDispatch, useSelector} from "react-redux";
import { signUp, checkEmail, checkNickname } from "../redux/async/user";
import { emailCheck, pwdReg} from "../share/checkReg";
import "../share/style/loginButton.css";

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [is_typed, setIs_Typed] = useState(false);
    const is_email = useSelector(state => state.user.checkEmail);
    const is_nickname = useSelector(state => state.user.checkNickname);
    const [email_check_text, setEamil_Check_Text] = useState("");
    const [nickname_check_text, setNickname_Check_Text] = useState("");
    const [email_double, setEmail_Double] = useState("");
    const [nickname_double, setNickName_Double] = useState("");
    const [signup_info, setSignUp_Info] = useState({
        email: "",
        nickname: "",
        password: "",
        confirmPassword: ""
    });

    const {email, nickname, password, confirmPassword} = signup_info;

    useEffect(() => {   //아이디 중복체크
        if(email === ""){
            setEamil_Check_Text("");
            return;
        }
        if(!emailCheck(email)){
            setEmail_Double(false);
            setEamil_Check_Text("올바른 이메일 형식이 아닙니다.");
        }
        if(is_email === true){
            setEmail_Double(true);
            setEamil_Check_Text("사용 가능한 이메일입니다.")
        }
    }, [email]);

    useEffect(() => {  //닉네임 중복체크
        if(nickname === ""){
            setNickname_Check_Text("");
            return;
        }
        if(is_nickname === "fail"){
            setNickName_Double(false);
            setNickname_Check_Text("이미 사용중인 닉네임입니다.");
        }else{
            setNickName_Double(true);
            setNickname_Check_Text("사용 가능한 닉네임입니다.");
        }
        setNickname_Check_Text("이미 사용중인 닉네임입니다.");
    }, [is_nickname]);

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }
    const submitSignUp = () => {
        if(email === "" && nickname === "" && password === "" && confirmPassword === "" ){
            window.alert("아이디, 닉네임, 비밀번호를 입력하세요!")
            return;
        }

        if(!pwdReg(password)){
            window.alert("비밀번호를 4자 이상 입력해주세요!");
            return;
        }
        
        if(password !== confirmPassword){
            window.alert("비밀번호 및 비밀번호확인이 다릅니다!");
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
    const doubleCheckEmail = () => {
        dispatch(checkEmail(email));
    } //이메일 중복체크 디스패치

    const doubleCheckNickname = () => {
        dispatch(checkNickname(nickname));
    } //닉네임 중복체크 디스패치

    const onKeyUp = () => {    //비밀번호 및 이메일 양식 맞을 때 버튼색 변화
        if(emailCheck(email) && pwdReg(password) && pwdReg(confirmPassword) ){
            setIs_Typed(true);
        }else{
            setIs_Typed(false);
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
                        <InputSignUpWrap>
                            <InputSignUP
                                onChange={onChange}
                                onKeyUp={doubleCheckEmail}
                                name="email"
                                value={email}
                                placeholder="아이디를 입력해주세요"
                            ></InputSignUP>
                            <p
                            className={email_double === true ? "inputCheckDoubleEmailGreen" : "inputCheckDoubleEmailRed"}
                            >{email_check_text}</p>
                        </InputSignUpWrap>
                        <InputSignUpWrap>
                            <InputSignUP 
                                onChange={onChange}
                                onKeyUp={doubleCheckNickname}
                                name="nickname"
                                value={nickname}
                                placeholder="닉네임을 입력해주세요"
                            ></InputSignUP>
                            <p
                            className={nickname_double === true ? "inputCheckDoubleNicknameGreen" : "inputCheckDoubleNicknameRed"}
                            >{nickname_check_text}</p>
                        </InputSignUpWrap>
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
                            onKeyUp={onKeyUp}
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="비밀번호를 한번 더 입력해주세요"
                        ></InputSignUP>
                        <button 
                            style={{marginTop: "100px"}}
                            className={is_typed ? "yellowButton" : "whiteButton"}
                            onClick={submitSignUp}>
                            가입하기
                        </button>
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
    margin-top: 45px;
`;

const InputSignUpWrap = styled.div`
    width: 312px;
    height: 52px;
    margin: 9px auto;
`;

const InputSignUP = styled.input`
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