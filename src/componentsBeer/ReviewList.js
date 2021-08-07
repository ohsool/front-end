import React,{useState, useEffect} from "react";
import styled from "styled-components";


import EachReview from "../componentsBeer/EachReview";
import { useSelector, useDispatch } from "react-redux";
import {history} from "../redux/configureStore";
import { getOneBeer } from "../redux/async/beer";
import { getReview } from "../redux/async/review";
import { userInfo } from "../redux/async/user";

import ReviewWriteModal from "../componentsBeer/ReviewWriteModal";

const ReviewList = (props)=>{
    const [modalOpen, setModalOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const beerOne = useSelector(state => state.beer.beerOne);
    const userId = useSelector(state => state.user.currentUser.userId); 
    const beer_infos = useSelector(state => state.review.reviewList);
    const dispatch = useDispatch();
    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        async function getData() {
            await dispatch(getOneBeer(props.match.params.beerId));
            await dispatch(userInfo());
            await dispatch(getReview(props.match.params.beerId));
        }
        return getData();
    }, [reload]);

    const loginConfirm = ()=>{
        if(userId){
            openModal();
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login")
                return
            }
        }
    }
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
                        return (
                            <EachReview key={idx} item = {item} userId={userId}/> 
                        )       
                    }):""}            
                </Grid>

                <ReviewWriteModal
                    open={modalOpen}
                    close={closeModal}
                    beerOne={beerOne}
                    is_edit={false} 
                    setReload={setReload}
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
    padding: 45px 0 0 0;
`
const Wrap = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    bottom: 0;
<<<<<<< HEAD
=======
    //z-index: 99;
>>>>>>> 4dc95b488a02bb7d20fa4249efa265ea00001998
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