import React from "react";
import styled from "styled-components";
import shareButton from "../share/image/share.png"

const BackgroundCateImage = ({ category }) => {
    return(
        <React.Fragment>
            <BackgroundImage style={{backgroundImage: `url(${category?.image})`}}>
                <BackgroundImageStyle> {/*이미지 블러처리*/}
                <Wrap>
                    <TextWrap> 
                        <p>당신을 위한 <br/>오늘의 맥주는,</p>
                        <h1>‘{category?.name}’</h1>
                    </TextWrap>
                    <ShareButton
                        style={{backgroundImage: `url(${shareButton})`}}
                    ></ShareButton>
                </Wrap>
                </BackgroundImageStyle>
            </BackgroundImage>
        </React.Fragment>
    )
}

export default React.memo(BackgroundCateImage);

const BackgroundImage = styled.div`
    width: 100%;
    height: 270px;
    background-size: cover;
    text-aligin: center;
    display: flex;
    justify-content: center;
`;

const BackgroundImageStyle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 270px;
    opacity: 0.8;
    background: radial-gradient(66.94% 68.52% at 66.94% 53.82%, 
        rgba(12, 12, 12, 0) 50.82%, 
        rgba(12, 12, 12, 0.3) 100%);
`;

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 360px;
`;

const TextWrap = styled.div`
    display: inline-block;
    margin: 68px 0 0 16px;
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
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 63px 12px 0 0;
    float: right;
    cursor: pointer;
`;