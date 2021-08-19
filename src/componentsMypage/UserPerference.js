import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const UserPreference = (props) => {
    const is_iphone = navigator.userAgent.toLowerCase();
    const userInfo = useSelector(state => state.user.currentUser);
    return(
        <React.Fragment>
            <Container style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "133px"} : {marginTop: "93px"}}>
                <Perference></Perference>
                <UserInfoWrap>
                    <span>안녕하세요 <strong>{userInfo.nickname}</strong>님!</span><br/>
                    <span>오늘의술은 <strong>{userInfo.preference}</strong>입니다.</span>
                </UserInfoWrap>
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

const Perference = styled.div`
    width: 65px;
    height: 65px;
    border: 0.3px solid black;
    border-radius: 65px;
`;

const UserInfoWrap = styled.div`
    margin: 12px 0px 0px 16px;
    width: 200px;
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