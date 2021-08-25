import React from "react";
import styled from "styled-components";
import myPage from "./share/image/myPage.png";
import beer from "./share/image/beer.png";
import myBeer from "./share/image/mybeer.png";
import { history } from "./redux/configureStore";
import "./share/style/TestHeader.css";
import { useSelector } from "react-redux";

const NavigationBar = (props) => {
    const userInfo = useSelector(state => state.user.currentUser);

    const comfirm_login = (page)=>{
        if(page==='myBeer'){
            if(userInfo.message === "success"){
                history.push("/mybeer");
            }else{
                if(window.confirm("로그인 후 이용 가능한 서비스입니다. \n로그인하고 나만의 맥주 리스트를 관리해보세요!🍻")){
                    history.push("/login");
                    return;
                }
            }
        }else if(page==='myPage'){
            if(userInfo.message === "success"){
                history.push("/myPage");
            }else{
                if(window.confirm("로그인 후 이용 가능한 서비스입니다. \n로그인 하시겠습니까?")){
                    history.push("/login");
                    return;
                }
            }

        }

    }

    return (
        <React.Fragment>
            <NavBox>
                <Wrap 
                onClick={()=>{ 
                    comfirm_login('myBeer');
                    //history.push("/mybeer");
                }}>
                    <ImageWrapMybeer style={{backgroundImage: `url(${myBeer})`}}/>
                    <Text ㄴ쇼ㅣㄷ><span>MY BEER</span></Text>
                </Wrap>
                <Wrap
                onClick={() => {
                    history.push("/beer/list/all")
                }}>
                    <ImageWrap style={{backgroundImage: `url(${beer})`}}/>
                    <Text><span>BEER LIST</span></Text>
                </Wrap>                    
                <Wrap
                onClick={()=>{ 
                    comfirm_login('myPage');
                    //history.push("/mypage");
               }}
                >
                    <ImageWrap style={{backgroundImage: `url(${myPage})`}}/>
                    <Text><span>MY PAGE</span></Text></Wrap>

            </NavBox>
        </React.Fragment>
    )
}

export default NavigationBar;

const NavBox = styled.div`
    max-width: 400px;
    height: 71px;
    z-index: 10;
    background-color: white;
    font-family: "GmarketSansM";
    display: flex;
    position:fixed; 
    border-top: 0.2px solid #F7F7F7; 
    justify-content: space-around;
    bottom:0;
    margin: 0 auto;
    left: 0;
    right: 0;
`;

const Wrap = styled.div`
    text-align: center;
    width:120px;
    cursor: pointer;
`;


const Text = styled.div`
    margin: 9px auto;
    & > span{
        font-size: 8px;
    }
`
const ImageWrap = styled.div`
    margin: 13px 58px 0 48px;
    width: 22px;
    height: 22px;
    background-size: cover;
`;

const ImageWrapMybeer = styled.div`
    margin: 12px 55px 0 48px;
    width: 24px;
    height: 22px;
    background-size: cover;
`;
