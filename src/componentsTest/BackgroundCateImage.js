import React , {useEffect} from "react";
import styled from "styled-components";
import shareButton from "../share/image/share.png"
import KakaoShareButton from "./KakaoShareButton";
import { Helmet } from 'react-helmet';

const BackgroundCateImage = ({ category }) => {

    return(
        <React.Fragment>
            <BackgroundImage style={{backgroundImage: `url(${category?.image})`}}>
                <BackgroundImageStyle> </BackgroundImageStyle>
                <Wrap>
                    <TextWrap> 
                        <p>당신을 위한 <br/>오늘의 맥주는,</p>
                        <h1>‘{category?.name}’</h1>
                    </TextWrap>
                    <ShareButton className="share"
                        style={{backgroundImage: `url(${shareButton})`}}
                        
                    >
                        <Helmet>
                            <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
                        </Helmet>                      
                        <KakaoShareButton/>                        
                    </ShareButton>
                </Wrap>
            </BackgroundImage>
        </React.Fragment>
    )
}
export default BackgroundCateImage;
//https://ellismin.com/2020/09/share-kakao/
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
`;