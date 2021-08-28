import React, {useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import "../share/style/loginButton.css";
import Header from "../Header";
import { checkNickname } from "../redux/async/user";
import { is_Nickname} from "../redux/reducer/userSlice";
import { pwdReg } from "../share/checkReg";
import CustomizedSwitches from "../componentsMypage/CustomizedSwitches";

const Setting = ({}) =>{
    const is_nickname = useSelector(is_Nickname); // 닉네임 중복체크 서버에서 응답
    const [nickname_check_text, setNickname_Check_Text] = useState("");
    const [nickname_double, setNickName_Double] = useState("");
    //const [is_change,setIs_Change] = useState(false);

    const [nickname, setNickname] = useState(""); //회원정보 입력 
    const [before_password, setBefore_Password] = useState(""); //회원정보 입력 
    const [after_password, setAfter_Password] = useState(""); //회원정보 입력 
    const [nick_change, setNick_Change] = useState(false); //닉네임 변경 버튼 클릭시 true로 바뀜
    const [password_change,setPassword_Change] = useState(false) //비밀번호 변경 버튼 클릭시 true로 바뀜
    const dispatch = useDispatch();

    useEffect(() => {  //닉네임 중복체크
            if(nickname === ""){
                setNickname_Check_Text("");
                return;
            }
            if(is_nickname?.message === "fail" && is_nickname?.error === "exist nickname"){
                setNickName_Double(false);
                setNickname_Check_Text("사용중인 닉네임입니다.");
            }
            else if(is_nickname?.message === "fail" && is_nickname?.error === "wrong nickname"){
                setNickName_Double(false);
                setNickname_Check_Text("사용할 수 없는 닉네임입니다.");
            }else if(nickname.length >= 8 ){
                setNickname_Check_Text("닉네임 글자 수는 8자 미만이어야합니다.");
            }else{
                setNickName_Double(true);
                setNickname_Check_Text("사용 가능한 닉네임입니다.");
            }   
    }, [nickname, is_nickname]);

    const clickNickConfirm=()=>{//변경된 정보 사항으로 디스패치

        if(nickname === ""){
            setNickname("");
            alert("닉네임을 다시 확인 해주세요!")
            return;
        } //공란 체크
        if(is_nickname?.message === "fail" && is_nickname?.error === "exist nickname"){
            setNickName_Double(false);
            setNickname("");
            alert("사용중인 닉네임입니다.");
            return;
        }
        else if(is_nickname?.message === "fail" && is_nickname?.error === "wrong nickname"){
            setNickName_Double(false);
            setNickname("");
            alert("사용할 수 없는 닉네임입니다.");
            return;
        }else if(nickname.length >= 8 ){
            setNickname("");
            alert("닉네임 글자 수는 8자 미만이어야합니다.");
            return;
        }else{
            setNickName_Double(true);
            if(window.confirm("닉네임을 변경하습니까?")){
                //dispatch(); 닉네임을 변경하는 api & 그 slice에서 변경되었습니다 띄우기!!
            }
            setNick_Change(false);
            return;
        }
    }
    const clickAfterPasswordConfirm=()=>{//변경된 정보 사항으로 디스패치

        if(after_password === ""  ){
            alert("비밀번호를 다시 확인 해주세요!")
            return;
        } //공란 체크
    
        if(!pwdReg(after_password)){
            alert("비밀번호를 4자 이상 입력해주세요!");
            return;
        } //비밀번호 형식체크
        setPassword_Change(false);

    }
/*
    const clickSubmitChange = () => {//저장하기 버튼 클릭
        //dispatch(change(nickname, password)); //회원가입 회원정보 디스패치
        setNickname("");
        setBefore_Password("");
        setAfter_Password("");

    }
*/  
    const clickBeforePasswordConfirm = ()=>{

    }

    const doubleCheckNickname = useCallback(() => {
        dispatch(checkNickname(nickname));
    }, [nickname]); //닉네임 중복체크 디스패치

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    }

    const onChangePassword = (e) => {
        setAfter_Password(e.target.value);
    }

    return (
        <>
        {/*userId로 아이디 / 비밀번호 넘겨받는 api 필요 */}
        <Container>
            <Header/>
            <PageWrap>
                <InfoWrap>
                    <span>{"jjy306105@gmail.com"}</span>{/*user/me 에서 이멜 가지오곰 */}
                </InfoWrap>
                {nick_change ? 
                <>
                <div style={{margin: "0 auto"}}>
                <InfoWrap><input
                        type="text"
                        // maxLength="7"
                        onChange={onChangeNickname}
                        onKeyUp={doubleCheckNickname}
                        name="nickname"
                        value={nickname}
                        placeholder="닉네임을 입력해주세요 (8자미만)"
                    ></input>                
                    <ChangeButton
                        style={{marginBottom: "-2px"}}
                        onClick={()=>{
                            clickNickConfirm()
                            setNick_Change(true)
                        }}
                    >확인</ChangeButton>
                </InfoWrap>
                <p className={nickname_double === true ? "inputCheckDoubleNicknameGreen" : "inputCheckDoubleNicknameRed"}
                >{nickname_check_text}</p>
                </div>
                </>
                
                : <>
                    <InfoWrap>
                    <JustifyAlign>
                    <span>{'닉네임자리'}</span>
                    <ChangeButton
                        onClick={()=>{
                            setNick_Change(true)
                        }}
                    >변경</ChangeButton>
                    </JustifyAlign>
                    </InfoWrap>
                  </>
                }
                    {password_change ? 
                    <>
                    <InfoWrap>
                    <input
                        type="password"
                        name="beforePassword"
                        value={before_password}
                        placeholder="기존 비밀번호를 입력해주세요"
                    ></input>
                    <ChangeButton 
                    onClick={()=>{
                        clickBeforePasswordConfirm()
                        setPassword_Change(true)
                    }}style={{marginBottom: "-2px"}}>확인</ChangeButton>
                </InfoWrap>
                <InfoWrap>
                    <input
                     type="password"
                     onChange={onChangePassword}
                     name="afterpassword"
                     value={after_password}
                     placeholder="비밀번호를 입력해주세요 (4자 이상)"
                    ></input>
                    <ChangeButton 
                    onClick={()=>{
                        clickAfterPasswordConfirm()
                        setPassword_Change(true)
                    }}style={{marginBottom: "-2px"}}>확인</ChangeButton>
                    </InfoWrap>
                    </>
                    :
                    <>
                    <InfoWrap>
                    <JustifyAlign>
                    <span>{"비밀번호"}</span>
                    <ChangeButton
                        onClick={()=>{
                            setPassword_Change(true)
                        }}
                    >변경</ChangeButton>
                    </JustifyAlign>
                    </InfoWrap>
                    </>
                    }
                <InfoWrap>
                    <JustifyAlign>
                        <span>{"맥주 도감 공유 허용하기"}</span>
                        <CustomizedSwitches/>
                    </JustifyAlign>
                </InfoWrap>

{/*
                <div
                    className = {is_change ? "yellowButton" : "whiteButton"}
                    onClick={clickSubmitChange}
                    >
                    저장하기
                </div>
*/}
            </PageWrap>
        </Container>

        </>
    );

}

export default Setting;

const Container = styled.div`
    width: 100%;
`;


const PageWrap = styled.div`
    width: 360px;
    display: flex;
    flex-direction: column;
    test-align: center;
    margin: 0 auto;
    margin-top: 110px;
`;


const InfoWrap = styled.div`
    display: inline-block;
    margin: 0 auto;
    width: 312px;
    height: 40px;
    border-bottom: 0.5px solid #C4C4C4;
    margin-bottom: 16px;
    & > span{
        line-height: 40px;
        margin-left: 24px;
        font-size: 14px;
        font-weight: bold;
    }
    & > input{
        width: 227px;
        height: 32px;
        border:none;
        outline: none;
        margin-left: 20px;
    }
`;

const ChangeButton = styled.div`
    display: inline-block;
    padding-top: 6px;
    margin-bottom: 7px;
    width: 42px;
    height: 26px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #333333;
    cursor: pointer;
`
const JustifyAlign = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 290px;
    & > span{
        line-height: 40px;
        margin-left: 24px;
        font-size: 14px;
        font-weight: bold;
    }
`