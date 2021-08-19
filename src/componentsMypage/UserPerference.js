import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userInfo } from "../redux/async/user";

const UserPreference = (props) => {
    const is_iphone = navigator.userAgent.toLowerCase();
    const userInfos = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userInfo());
    }, []);
    return(
        <React.Fragment>
            <Container style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "133px"} : {marginTop: "93px"}}>
                <PreferenceWrap>
                    <Perference
                        style={{backgroundImage: `url(${userInfos.image})`}}
                    ></Perference>
                </PreferenceWrap>
                <UserInfoWrap>
                    <span>안녕하세요 <strong>{userInfos.nickname}</strong>님!</span><br/>
                    <span>오늘의술은 <strong>{userInfos.preference}</strong>입니다.</span>
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

const PreferenceWrap = styled.div`
    display: flex;
    justify-content: center;
    width: 65px;
    height: 65px;
    background-color: #F7F7F7;
    border-radius: 65px;
`;

const Perference = styled.div`
    margin-top: 10px;
    width: 21px;
    height: 45px;
    background-size: cover;
`;

const UserInfoWrap = styled.div`
    padding-top: 16px;
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