import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header";
import { getMyReview } from "../redux/async/mybeer";
import { myReviewList } from "../redux/reducer/mybeerSlice";

import TasteGraph from '../componentsBeer/TasteGraph';

const MyReview = (props) =>{

    console.log("item",props);
    const reviewId = props.match.params.beerId;
    const myReview = useSelector(myReviewList); //사용자가 단 리뷰리스트
    
    const dispatch = useDispatch();
    console.log("reviewId",reviewId)
    console.log("myReview",myReview);

    useEffect(() => {
        dispatch(getMyReview());
    }, []);

    // 별점, 그래프, 리뷰 정보
    return(
        <React.Fragment>
            <Header/>
            <Container>
                <Grid>
                    <hr/>
                    <p>
                        테스트
                    </p>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>그래프</span>                      
                    </Wrap>
                    <Graph>
                       {/*<TasteGraph beers={item?.mybeers.myFeatures}/>*/}
                    </Graph>
                    <hr/>

                    
                </Grid>
            </Container>
        </React.Fragment>
    )
}
export default (MyReview, TasteGraph);

const Container = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
    & > span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: auto;
        text-align:left;
    }
`;
const Grid = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 40px;
`;

const BeerImage = styled.div`
    width: 100%;
    height: 380px;
    text-align: center;
    background-color: #F6F6F6;
    & > img{ 
        width: 315px;
        height: 315px;
        margin: 23px auto;
    }
    @media (img: img) {
        & > img { 
            width: 315px;
            height: 315px;
            margin: 22px auto;
         }
    }
`;
const Wrap = styled.div`
    width: 320px;
    margin: 20px auto;
`;

const Graph = styled.div`
    margin: 14px auto;
    display: flex;
    width: 313px;
    height: 313px;
    border: 2px solid #FFC44F;
    border-radius: 10px;
`;


const TasteTag = styled.div`
    display: inline-block;
    margin-right: 3px;
    padding: 0 6px;
    height: 16px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #333333;
`;
