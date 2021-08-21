//DrinkDetail에 들어갈 내용
import React,{useState} from 'react';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';
import star from "../share/image/star.png";
//import edit from "../share/image/edit.png";
//import remove from "../share/image/remove.png";
import {StarRate} from "./BeerDetailIndex";

import {useDispatch} from "react-redux";
import {deleteReview} from "../redux/async/review";
import { history } from '../redux/configureStore';

import ReviewWriteModal from "../componentsBeerDetail/ReviewWriteModal";

const EachReview=(props)=> {
    const { item, beerOne, userId } = props; 
    const [modalOpen, setModalOpen] = useState(false); //수정 버튼 클릭시 리뷰 수정 모달 띄우기
    const dispatch = useDispatch();
    const is_my = true;
    const is_starsmall = true;

    const openModal = () => {
        setModalOpen(true);
      };
    
    const closeModal = () => {
        setModalOpen(false);
    };
    const date = item.date.replace(/-/g,'/');

    return (
        <React.Fragment>
        <Container
        onClick={()=>{
            history.push(`/review/${item._id}`, item, userId)
        }}
        >
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
                        <StarRate init_star={item.rate} is_my={is_my} is_starsmall={is_starsmall}/>
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
    border-radius: 5px;
    margin: 5px auto;
    border:1.7px solid #c4c4c4;
    border-radius: 10px;
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
const StarWrap = styled.div`
    width: 100px;


`
const ReviewText = styled.div`
    margin: 5px;
    max-height: 51px;
    line-height: 17px;
    font-size: 12px;

`