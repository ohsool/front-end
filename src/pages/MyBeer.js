import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { userInfo } from "../redux/async/user";
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import "../share/style/myBeer.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    MyLikeBeerList,
    MyReviewList,
    UserPerference,
    MyDogamButton,
    MyStatusComment
    } from "../componentsMypage/MyBeerIndex";

const MyBeer = (props)=>{
    const [is_Dogam, setIs_Dogam] = useState(true); //맥주리스트인지 리뷰리스트인지
    const userInfos = useSelector(state => state.user.currentUser);
    const is_iphone = navigator.userAgent.toLowerCase();
    const { userId } = useParams();
    const [is_me, setIs_Me] = useState(true);
    const { dogam } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userInfo());//현재 로그인한사용자 정보 (새로고침시 상태 날라가는 것 방지)
        window.scrollTo({
            top: 0,
        })
    }, []);
    useEffect(() => {
        if(userId === undefined || userId === userInfos.userId){
            setIs_Me(true);
        }else{
            setIs_Me(false);
        }
    }, [userInfos]);

    useEffect(() => { //사용자정보 및 리뷰정보 불러오기
        dispatch(userInfo());
    }, []);
    
    useEffect(()=> {
        if(dogam === "dogam"){
            setIs_Dogam(true);
        }else{
            setIs_Dogam(false);
        }
    }, [dogam, is_Dogam]);


    return (
        <React.Fragment>
            <Header/>
            <UserPerference userInfos={userInfos} is_me={is_me}></UserPerference>
            <MyStatusComment userInfos={userInfos} is_me={is_me}></MyStatusComment>
            <Grid style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "40px"} : {marginTop: "0px"}}>
                <Wrap>  
                <MyDogamButton is_Dogam={is_Dogam}/>
                {is_Dogam === true ? 
                    <MyReviewList is_me={is_me}/>
                : 
                    <MyLikeBeerList is_me={is_me}/>
                }
                </Wrap>
            </Grid>
            <NavigationBar props={props}/>

        </React.Fragment>
    )
}

export default React.memo(MyBeer);

const Grid = styled.div`
    display: flex;
    background-color: #FFFFFF;
    flex-direction: column;
`;

const Wrap = styled.div`
    width: 400px;
    margin: 0 auto;
    padding-top: 16px;
    border-top: 0.5px solid #C4C4C4; 
`;