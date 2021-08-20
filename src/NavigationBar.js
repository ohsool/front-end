import React from "react";
import styled from "styled-components";
import myPage from "./share/image/myPage.png";
import beer from "./share/image/beer.png";
import search from "./share/image/search.png";
import { history } from "./redux/configureStore";
import "./share/style/TestHeader.css";
import { useSelector } from "react-redux";

const NavigationBar = (props) => {
    const userInfo = useSelector(state => state.user.currentUser);

    const comfirm_login = ()=>{
        if(userInfo.message === "success"){
            history.push("/mypage");
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login");
                return;
            }
        }
    }
    return (
        <React.Fragment>
            <NavBox>
                <SearchWrap 
                onClick={()=>{ 
                    console.log("Search Click!")
                }}>
                    <ImageWrap style={{backgroundImage: `url(${search})`}}/>
                    <Text><span>SEARCH</span></Text>
                </SearchWrap>
                <BeerListWrap
                onClick={() => {
                    history.push("/beer/list/all")
                }}>
                    <ImageWrap style={{backgroundImage: `url(${beer})`}}/>
                    <Text><span>BEER LIST</span></Text>
                </BeerListWrap>                    
                <MyPageWrap
                onClick={() => {
                    comfirm_login();
                }}>
                    <ImageWrap style={{backgroundImage: `url(${myPage})`}}/>
                    <Text><span>MY PAGE</span></Text></MyPageWrap>

            </NavBox>
        </React.Fragment>
    )
}

export default NavigationBar;

const NavBox = styled.div`
    width: 360px;
    height: 62px;
    z-index: 10;
    background-color: white;
    font-family: "GmarketSansM";
    display: flex;
    position:fixed; 
    bottom:0;
    margin: 0 auto;
    left: 0;
    right: 0;
    border: 0.5px solid #888888;
    border-style: solid none none none;
`;

const SearchWrap = styled.div`
    display: inline-block;
    text-align: center;
    width:120px;
    float:left;
    background-size: cover;
    cursor: pointer;
`;

const BeerListWrap = styled.div`
    width:120px;
    text-align: center;
    float:center;
    cursor: pointer;
`;

const MyPageWrap = styled.div`
    width:120px;
    text-align: center;
    float:right;
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


