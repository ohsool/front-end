import React from "react";
import styled from "styled-components";
import BackgroundCateImage from "../componentsTest/BackgroundCateImage";

import RecommendBeer from "../componentsTest/RecommendBeer";
import ResultInfo from "../componentsTest/ResultInfo";
import Header from "../Header";
const TestResult = (props) => {
    const a = [1, 2];
    return (
        <React.Fragment>
            <Header/>
            <Grid>  
                    <BackgroundCateImage/>
                    <ResultInfo/>
                    <RecommendBeerWrap>
                        {a.map((p, idx) => (
                            <RecommendBeer></RecommendBeer>
                        ))}
                    </RecommendBeerWrap>
                    <ReButton>
                        다시 하기
                            <img src="https://image.flaticon.com/icons/png/512/724/724863.png"></img>
                    </ReButton>
            </Grid>
        </React.Fragment>
    )
}

export default TestResult;

const Grid = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const RecommendBeerWrap = styled.div`
    margin: 14px 0 0 24px;
    width: 312px;
    display: flex;
    justify-content: space-between;
`;

const ReButton = styled.div`
    text-align: center;
    color: #FFC44F;
    font-size: 14px;
    font-weight: bold;
    line-height: 45px;
    width: 308px;
    height: 45px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: transparent;
    border: 1px solid #FFC44F;
    border-radius: 22.5px;
    & > img{
        margin-left: 4px;
        width: 11px;
        height: 11px;
    }
`;
