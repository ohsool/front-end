import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userInfo } from "../redux/async/user";
import {history} from "../redux/configureStore";

const UserPreference = (props) => {
    const is_iphone = navigator.userAgent.toLowerCase();
    const userInfos = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(userInfo());
        if(userInfos.preference === 'Unknown'){//사용자의 맥주 타입이 unknown 상테면 테스트 페이지로 이동유도
            if(window.confirm("아직 테스트를 하지 않으셨네요!🧒 \n테스트를 통해 맥주 타입을 알아보시겠습니까?")){
                history.push("/test")
            }
        }
    }, []);
    return(
        <React.Fragment>
            <Container style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "133px"} : {marginTop: "93px"}}>
                {userInfos.message !== "success" ? 
                <>
                    <PreferenceWrap
                    style={{backgroundImage: `url(${userInfos.image})`}}
                    >
                    </PreferenceWrap>
                    <UserInfoWrap>
                        <span>안녕하세요!</span><br/>
                        <span>오늘의술입니다.</span>
                    </UserInfoWrap>
                </> :
                <>
                    <PreferenceWrap
                    style={{backgroundImage: `url(${userInfos.image})`}}
                    >
                    </PreferenceWrap>
                    <UserInfoWrap>
                        <span>안녕하세요 <strong>{userInfos.nickname}</strong>님!</span><br/>
                        {userInfos?.preference === 'Unknown' ? 
                            <>
                            <Typetext><strong>테스트 진행 후</strong> 이곳에 <br/>고객님의 <strong>맥주 타입</strong>이 보여집니다.</Typetext>
                            <TestButton
                                onClick={()=>{
                                    history.push("/test");
                                }}
                            >테스트 하기</TestButton>
                            </>
                            : <span>오늘의술은 <strong>{userInfos.preference}</strong>입니다.</span>
                        }
                        
                    </UserInfoWrap>
                </>
                }
            </Container>
        </React.Fragment>
    )
}

export default UserPreference;

const Container = styled.div`
    display: flex;
    margin-top: 93px;
    width: 300px;
    height: 65px;
    margin: 0 auto;
`;

const PreferenceWrap = styled.div`
    display: flex;
    justify-content: center;
    width: 65px;
    height: 65px;
    background-size: cover;
    border-radius: 65px;
`;

const UserInfoWrap = styled.div`
    margin: 12px 0 0 16px;
    width: 223px;
    height: 46px;
    & > span {
        font-size: 16px;
        line-height: 146.5%;
    }
    & > span > strong{
        font-color: #151515;
        font-weight: bold;
    }
`;
const Typetext = styled.div`
    font-size: 12px;
    padding-top: 4px;

`
const TestButton = styled.div`
    float: right;    
    cursor: pointer;
    color: #FFC44F;
    font-size: 12px;
    margin-right: 37px;
    border-bottom: 1px solid #FFC44F;

`