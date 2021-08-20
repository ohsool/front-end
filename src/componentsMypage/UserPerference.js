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
                <PreferenceWrap
                style={{backgroundImage: `url(${userInfos.image})`}}
                >
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