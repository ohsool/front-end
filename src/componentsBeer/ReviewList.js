import React,{useState, useEffect} from "react";
import styled from "styled-components";

import EachReview from "../componentsBeer/EachReview";
import { useSelector, useDispatch } from "react-redux";
import {history} from "../redux/configureStore";

import ReviewWriteModal from "../componentsBeer/ReviewWriteModal";
import Header from "../Header";
import { useLocation } from "react-router-dom";

const ReviewList = (props)=>{
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const session = sessionStorage.getItem("token"); //로그인 여부 확인용
    //const currentUser = useSelector((state) => state.user.currentUser);

    const location = useLocation(); 
    const beer_detail = location.state?.beer;

    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };
    //


    const loginConfirm = ()=>{
        if(session){
            openModal();
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login")
                return
            }
        }
    }

    const reviews = [
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
    ];
    return (
        <React.Fragment>
            <Container>
                <Wrap>
                <MoveBoxWrap
                        onClick={() => {
                            loginConfirm();
                        }}>
                        <span>후기 작성하기</span>
                </MoveBoxWrap>
                </Wrap>
                <Grid>
                    {reviews.length > 0 ? reviews.map((item, idx) => (
                        <EachReview key={idx} {...item}/> 
                    )):""}            
                </Grid>

                <ReviewWriteModal
                    open={modalOpen}
                    close={closeModal}
                    beer={beer_detail}
                    
                ></ReviewWriteModal>               
            </Container>

        </React.Fragment>
    )
}

export default ReviewList;

const Container = styled.div`
    display: flex;
    background-color: #FFFFFF;
    flex-direction: column;
`;
const Grid = styled.div`
    width: 360px;
    margin: 0 auto;
`
const Wrap = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    bottom: 0;
    z-index: 99;
`;

const MoveBoxWrap = styled.div`
    width: 360px;
    height: 40px;
    background-color: #F6F6F6;
    border-radius: 10px 10px 0 0;
    & > span{
        line-height: 40px;
        margin-left: 24px;
        font-size: 12px;
        font-weight: bold;
    }
`;