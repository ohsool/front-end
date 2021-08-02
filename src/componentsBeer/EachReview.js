//DrinkDetail에 들어갈 내용
import React,{useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";

const EachReview=(props)=> {
    const is_user = true;//본인 게시글이면 (magazine-result플젝의 PostList 참고))
    const { nickname, date, rate, review, idx} = props; 
    const dispatch = useDispatch();
    return (
        <>
        <Container>
            <Grid>
                <GridHorizon>
                    <Div>
                    <NicknameText>
                        <span style={{ fontWeight: "700", fontSize: "14px", lineHeight: "20.27px"}}>
                            {nickname}</span>
                    </NicknameText>
                    <DateText>
                        <span style={{ fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                            {date}5분 전
                        </span>
                    </DateText>
                    </Div>

                    <Div>
                        <StarImg/>
                        <RateText>
                            <span style={{fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                                ({rate})</span>
                        </RateText>
                            {is_user? 
                                <>
                                <EditButton onClick={()=>dispatch()}/>
                                <DeleteButton onClick = {()=>dispatch()}/>
                                </>
                            : null}
                    </Div>

                </GridHorizon>
                <ReviewText>
                    <span style={{ display: "block", width: "280px",fontWeight: "300", fontSize: "12px", lineHeight: "17.38px"}}>
                    
                        {review}

                    </span>               
                </ReviewText>
            </Grid>
        </Container>   
        </>
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