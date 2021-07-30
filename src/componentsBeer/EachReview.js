//DrinkDetail에 들어갈 내용
import React,{useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";

const EachReview=(props)=> {
    const is_user = true;//본인 게시글이면 (magazine-result플젝의 PostList 참고))
    const { nickname, date, rate, review} = props; 

    const dispatch = useDispatch();
    return (
        <>
        <Container>
            <NicknameText>{nickname}</NicknameText>
            <DateText>{date}</DateText>
            
            <StarImg/>
            <EngNameText>({rate})</EngNameText>
            {is_user? 
                <>
                <EditButton onClick={()=>dispatch()}/>
                <DeleteButton onClick = {()=>dispatch()}/>
                </>
            : null}
        </Container>   
        </>
    )
}

export default EachReview

EachReview.detaultProps = {
    _onClick: ()=>{}
}


const Container = styled.div`
    margin: 10px;
    padding: 0 8px;
    
    text-align:left;
    span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin: 0 6px;
          
    }
`
const NicknameText =styled.div`

`

const DateText =styled.div`

`

const StarImg =styled.div`

`
const EngNameText =styled.div`

`

const EditButton =styled.div`

`

const DeleteButton =styled.div`

`