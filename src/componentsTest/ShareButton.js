import React from "react";
import styled from "styled-components";
import kakaoshareButton from "../share/image/share.png"

const ShareButton = ({category}) => {
    const Kakao = window.Kakao;
  
    const shareKakao = () => {
        Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
              title: ("오늘의 맥주는 "+category.name+"!🍺"),
              description: category.description.substr(0,45)+"..🥂",
              imageUrl: category.image,
              imageWidth: 160,
              imageHeight: 120,
              link: {
                webUrl: window.location.href,
                mobileWebUrl: window.location.href,
              },
            },
            buttons: [
                {
                  title: '자세히 보기',
                  link: {
                    webUrl: window.location.href ,
                    mobileWebUrl: window.location.href ,
                  },
                },
                {
                  title: '테스트하러 가기',
                  link: {
                    webUrl: 'http://ohsool.com',
                    mobileWebUrl: 'http://ohsool.com',
                  },
                },
            ],
        });
      }
    return(
    <React.Fragment>
        <ShareButtonkakao
            id="kakao-link-btn"
            style={{backgroundImage: `url(${kakaoshareButton})`}}
            onClick={shareKakao}
        ></ShareButtonkakao>
    </React.Fragment>
    )
};

export default ShareButton;

const ShareButtonkakao = styled.div`
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 63px 12px 0 0;
    float: right;
    cursor: pointer;
`;