import React from "react";
import styled from "styled-components";

const BackgroundCateImage = (props) => {
    return(
        <React.Fragment>
            <BackgroundImage>
                <TextWrap> 
                    <p>당신을 위한 오늘의 맥주는,</p>
                    <h1>‘IPA’</h1>
                </TextWrap>
                <ShareButton></ShareButton>
            </BackgroundImage>
        </React.Fragment>
    )
}

export default BackgroundCateImage;

const BackgroundImage = styled.div`
    width: 100%;
    height: 270px;
    background-color: gray;
`;

const TextWrap = styled.div`
    display: inline-block;
    width: 125px;
    margin: 68px 0 0 26px;
    & > p {
        margin: 0;
        font-size: 20px;
        color: #FFFFFF;
    }
    & > h1 {
        margin-top: 9px;
        font-size: 35px;
        color: #FFFFFF;
    }
`;

const ShareButton = styled.div`
    position: absolute;
    width: 24px;
    height: 24px;
    border: 1px solid #FFFFFF;
    right: 12px;
    top: 63px;
`;