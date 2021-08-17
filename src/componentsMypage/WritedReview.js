import React,{useEffect} from "react";
import styled from "styled-components";
import {history} from "../redux/configureStore";

const WritedReview = ({item}) =>   {  

    return(
        <React.Fragment>
            <WritedBeerInfo 
                onClick={()=>{
                    history.push(`/review/${item._id}`, item)
                }}
            >
                <BeerImage>
                    <img src={item?.beerId?.image}></img>
                </BeerImage>
                <BeerTextWrap>
                    <p>{item?.userId?.nickname}</p>
                    <span>{item?.review}</span>
                </BeerTextWrap>
            </WritedBeerInfo>
        </React.Fragment>
    )
}

export default WritedReview;

const WritedBeerInfo = styled.div`
    width: 312px;
    height: 100px;
    display: flex;
    background-color: #F6F6F6;
    border-radius: 10px;
    margin: 5px auto;
    cursor: pointer;
`;

const BeerImage = styled.div`
    margin: 10px;
    border-radius: 10px;
    width: 80px;
    height: 80px;
    background-color: #FFFFFF;
    & > img{
        width: 80px;
        height: 80px;
    }
`;

const BeerTextWrap = styled.div`
    margin: 14px 0 0 6px;
    width: 194px;
    & > p {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        font-height: 20px;
    }
    & > span{
        font-size: 12px;
        font-weight: 300;
        font-height: 46px;
    }
`;