import React,{useState, useEffect} from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import {history} from "../redux/configureStore";
import { getReview } from "../redux/async/review";
import { getOneBeer } from "../redux/async/beer";
import { userInfo } from "../redux/async/user";
import { getReviewList } from "../redux/reducer/reviewSlice";
import { oneBeer } from "../redux/reducer/beerSlice";
import { User } from "../redux/reducer/userSlice";
import {EachReview,ReviewWriteModal} from "../componentsBeerDetail/BeerDetailIndex";

const ReviewList = (props)=>{
    const [modalOpen, setModalOpen] = useState(false);
    const beerOne = useSelector(oneBeer); 
    const userId = useSelector(User); 
    const beer_infos = useSelector(getReviewList); //해당 맥주 리뷰 목록을 불러옴
    const is_comment = beer_infos.find((p) => p.userId._id === userId);
    const is_iphone = navigator.userAgent.toLowerCase();
    const dispatch = useDispatch();
    
    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
            dispatch(getReview(props.match.params.beerId));
            dispatch(getOneBeer(props.match.params.beerId)); 
            dispatch(userInfo());
    }, []);

    const loginConfirm = ()=>{
        if(userId){
            if(is_comment){
                alert("이미 멋진 리뷰를 작성하셨습니다!")
            }else{
            openModal();
        }
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login")
                return;
            }
        }
    }
    return (
        <React.Fragment>
            <Container style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "40px"} : {marginTop: "0px"}}>
                <Wrap>
                <MoveBoxWrap
                        onClick={() => {
                            loginConfirm();
                        }}>
                        <span>맥주도감 작성하기</span>
                </MoveBoxWrap>
                </Wrap>
                <Grid>
                    {beer_infos?.length > 0 ? beer_infos?.map((item, idx) => {
                        return(
                            <EachReview key={idx} item={item} userId={userId}/>       
                        )
                        }):""}            
                </Grid>

                <ReviewWriteModal
                    open={modalOpen}
                    close={closeModal}
                    beerOne={beerOne}
                    is_edit={false}
                ></ReviewWriteModal>              
            </Container>

        </React.Fragment>
    )
}

export default React.memo(ReviewList);

const Container = styled.div`
    display: flex;
    background-color: #FFFFFF;
    flex-direction: column;
`;
const Grid = styled.div`
    width: 360px;
    margin: 0 auto;
    padding: 45px 0 0 0;
`
const Wrap = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    bottom: 0;
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
    cursor: pointer;
`;
