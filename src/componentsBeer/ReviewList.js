import React,{useState, useEffect} from "react";
import styled from "styled-components";


import EachReview from "../componentsBeer/EachReview";
import { useSelector, useDispatch } from "react-redux";
import {history} from "../redux/configureStore";
import { getOneBeer } from "../redux/async/beer";
import { getReview } from "../redux/async/review";

import ReviewWriteModal from "../componentsBeer/ReviewWriteModal";
import Header from "../Header";

const ReviewList = (props)=>{
    const [modalOpen, setModalOpen] = useState(false);
    const session = sessionStorage.getItem("token"); //임시 로그인 여부 확인용
    const beerOne = useSelector(state => state.beer.beerOne);
    const userId = useSelector(state => state.user.currentUser.userId);
    const beer_infos = useSelector(state => state.review.reviewList.myBeers);
    const dispatch = useDispatch();

    console.log("beer_reviews:",beer_infos);

    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(getOneBeer(props.match.params.beerId));
        dispatch(getReview({beer: beerOne?.name_korean}));
    }, []);

    const loginConfirm = ()=>{
        if(session){
            openModal();
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/")
                return
            }
        }
    }
{/*
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
*/}
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
                    {beer_infos?.length > 0 ? beer_infos?.map((item, idx) => {
                        if( item.userId === userId){
                            return (
                                <EachReview key={idx} item = {item} is_me beerOne/> 
                            )    
                        }else{
                            return (
                                <EachReview key={idx} item = {item}/> 
                            )
                        }
                    
                
                    }):""}            
                </Grid>

                <ReviewWriteModal
                    open={modalOpen}
                    close={closeModal}
                    beer={beerOne}
                    is_edit={false}                   
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