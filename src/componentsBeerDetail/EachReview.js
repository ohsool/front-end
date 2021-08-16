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
    const date = moment(item.date)

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
                            {moment(date).fromNow()}
                            </span>
                        </DateText>
                    </Div>

                    <Div>
                        <StarImg style={{backgroundImage: `url(${star})`}}/>
                        <RateText>
                            <span style={{fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                                ({item.rate.toFixed(1)})</span>
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