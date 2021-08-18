//DrinkDetail에 들어갈 내용
import React,{useState} from 'react';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';
import star from "../share/image/star.png";
import edit from "../share/image/edit.png";
import remove from "../share/image/remove.png";

import {useDispatch} from "react-redux";
import {deleteReview} from "../redux/async/review";

import ReviewWriteModal from "../componentsBeerDetail/ReviewWriteModal";

const EachReview=(props)=> {
    const { item, beerOne, userId } = props; 
    const [modalOpen, setModalOpen] = useState(false); //수정 버튼 클릭시 리뷰 수정 모달 띄우기
    const dispatch = useDispatch();

    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };
    //console.log("item.date",item.date);
    //const date = moment(item.date);//아이폰 시간 형식 변환
    const date = item.date
    //console.log("date",date);

    const displayDate = (createdAt) => {
        const milliSeconds = new Date() - moment(createdAt);
        const seconds = milliSeconds / 1000

        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        //const years = days / 365
        return createdAt.split(' ')[0]
      }

    return (
        <React.Fragment>
        <Container>
            <Grid>
                <GridHorizon>
                    <Div>
                        <NicknameText>
                            <span style={{ fontWeight: "700", fontSize: "14px", lineHeight: "20.27px"}}>
                                {item.userId.nickname}</span>
                        </NicknameText>
                        <DateText>
                            <span style={{ fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                            {/*{moment(date).fromNow()}*/}
                            {displayDate(date)}
                            </span>
                        </DateText>
                    </Div>

                    <Div>
                        <StarImg style={{backgroundImage: `url(${star})`}}/>
                        <RateText>
                            <span style={{fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                                ({item.rate})</span>
                        </RateText>
                            { item.userId._id === userId ? ( //작성자와 user가 동일한 경우 수정/삭제 버튼 활성화
                                <>
                                <EditButton 
                                    style={{backgroundImage: `url(${edit})`}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openModal();
                                }}></EditButton>
                                
                                <DeleteButton
                                    style={{backgroundImage: `url(${remove})`}} 
                                    onClick = {(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if(window.confirm("정말로 삭제하시나요?")){
                                        dispatch(deleteReview(item._id));
                                        return;
                                    }
                                }}></DeleteButton>
                                </>
                            ): null}
                            
                    </Div>

                </GridHorizon>
                <ReviewText>
                    <span style={{ display: "block", width: "280px",fontWeight: "300", fontSize: "12px", lineHeight: "17.38px"}}>
                        {item?.review}

                    </span>               
                </ReviewText>
            </Grid>
        </Container> 

        <ReviewWriteModal
            open={modalOpen}
            close={closeModal}
            beerOne={beerOne}
            item={item}
            is_edit={true}
            mybeerId={item._id}
        ></ReviewWriteModal> 

        </React.Fragment>
    )
}

export default React.memo(EachReview);

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
    align-items: center

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
    margin: 0 7px 0 1px; 
    span{
        font-weight: 500;
        font-style: light;
        font-sixe: 8px;
    }
`

const StarImg =styled.div`
    width: 16px;
    height: 16px;
    float: left;
    cursor: pointer;
`;

const EditButton =styled.div`
    margin: 2px;
    width: 16px;
    height: 16px;
    float: left;
    cursor: pointer;

`

const DeleteButton =styled.div`
    margin: 2px;
    width: 16px;
    height: 16px;
    cursor: pointer;


`

const ReviewText = styled.div`
    margin: 5px;
    max-height: 51px;
    line-height: 17px;
    font-size: 12px;

`