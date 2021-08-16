import React from "react";
import styled from "styled-components";

const ResultInfo = ({ category }) => {
    
    return(
        <React.Fragment>
            <BackgroundCateInfo>
                <p>{category?.title}</p>
                <span>{category?.description}</span>
                
            </BackgroundCateInfo>
            <RecommendCategory>오늘의 추천 {category?.name}</RecommendCategory>
        </React.Fragment>
    )
}

export default ResultInfo;

const BackgroundCateInfo = styled.div`
    width: 308px;
    margin: 20px;
    & > p {
        font-size: 14px;
        font-weight: bold;
    }
    & > span{
        margin-top: 14px;
        font-size: 14px;
        line-height: 146.5%;
        color: #555555;
    }
`;

const RecommendCategory = styled.p`
    font-size: 14px;
    font-weight: bold;
    margin: 20px 0 0 20px;
`;