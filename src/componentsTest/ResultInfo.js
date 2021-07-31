import React from "react";
import styled from "styled-components";

const ResultInfo = (props) => {
    
    return(
        <React.Fragment>
            <BackgroundCateInfo>
                <p>더운 여름날엔 열대향 가득 IPA!</p>
                <span>IPA는 이러이러 저러저러해 <br/>산미와 기분좋은 쌉싸한 맛이 특징인 맥주에요!</span>
                
            </BackgroundCateInfo>
            <RecommendCategory>오늘의 추천 IPA</RecommendCategory>
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