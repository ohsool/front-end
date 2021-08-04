//DrinkDetail에 들어갈 내용
import React,{useState} from 'react';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';

import {useDispatch} from "react-redux";
import {deleteReview} from "../redux/async/review";

import ReviewWriteModal from "../componentsBeer/ReviewWriteModal";

const EachReview=(props)=> {
    //item에 해당 맥주 리뷰 정보 담김, 해당 리뷰 작성자가 본인이면 is_me 전달, beerOne에 해당 맥주 정보 담김
    const { item, is_me, beerOne} = props; 
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };
    const date = moment(item?.date)


    return (
        <React.Fragment>
        <Container>
            <Grid>
                <GridHorizon>
                    <Div>
                    <NicknameText>
                        <span style={{ fontWeight: "700", fontSize: "14px", lineHeight: "20.27px"}}>
                            {item.nickname}</span>
                    </NicknameText>
                    <DateText>
                        <span style={{ fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                        {moment(date).fromNow()}
                        </span>
                    </DateText>
                    </Div>

                    <Div>
                        <StarImg/>
                        <RateText>
                            <span style={{fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                                ({item.rate})</span>
                        </RateText>
                            {is_me && (
                                <>
                                <EditButton onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    openModal();
                                }}/>
                                
                                <DeleteButton onClick = {(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if(window.confirm("정말로 삭제하시나요?")){
                                        dispatch(deleteReview(item.beerid));
                                        return
                                    }
                                }}/>
                                </>
                            )}
                    </Div>

                </GridHorizon>
                <ReviewText>
                    <span style={{ display: "block", width: "280px",fontWeight: "300", fontSize: "12px", lineHeight: "17.38px"}}>
                        {item.review}

                    </span>               
                </ReviewText>
            </Grid>
        </Container> 

        <ReviewWriteModal
            open={modalOpen}
            close={closeModal}
            beer={beerOne}
            item={item}
            is_edit={true}
        ></ReviewWriteModal> 

        </React.Fragment>
    )
}

export default EachReview;

const Container = styled.div`
    width: 312px;
    height: 100px;
    background-color: #FDF9F0;
    border-radius: 5px;
    margin: 5px auto;

`

const Grid = styled.div`
    position: absolute;
    margin: 16px 14px;

`

const GridHorizon = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`

const Div = styled.div`
    display: flex;
    padding: 0 2px;

`
const NicknameText =styled.div`
    padding: 2px;
    span{
        font-weight: 700;
        font-style: normal;
        font-sixe: 14px;
    }

`

const DateText =styled.div`
    padding: 2px;
    span{
        font-weight: 500;
        font-style: normal;
        font-sixe: 8px;
    }

`
const RateText = styled.div`
    padding: 2px; 
    span{
        font-weight: 500;
        font-style: light;
        font-sixe: 8px;
    }
`


const StarImg =styled.div`
    img{

    }

`

const EditButton =styled.button`
    padding: 2px;

`

const DeleteButton =styled.button`
    padding: 2px;


`

const ReviewText = styled.div`
    
    margin: 5px;
    max-height: 51px;
    line-height: 17px;
    font-size: 12px;

`