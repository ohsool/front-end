import React from "react";
import styled from "styled-components";
import share_white from "../share/image/share.png"
import share_yellow from "../share/image/share_yellow.png"

const ShareButton = ({name,description,image,page}) => { //a=category.name, b=category.description, c=category.image
    const Kakao = window.Kakao;
  
    const shareKakao = () => {
        Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
              title: ("오늘의 맥주는 "+name+"!🍺"),
              description: description.substr(0,45)+"..🥂",
              imageUrl: image,
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
                  title: '오술 바로가기',
                  link: {
                    webUrl: 'https://ohsool.com',
                    mobileWebUrl: 'https://ohsool.com',
                  },
                },
            ],
        });
      }
    return(
    <React.Fragment>
      {page==='testResult'?
        <ShareButtonkakao
          style={{backgroundImage: `url(${share_white})`}}
          id="kakao-link-btn"
          onClick={shareKakao}
        ></ShareButtonkakao>
        :<ShareButtonkakao
          style={{backgroundImage: `url(${share_yellow})`}}
          id="kakao-link-btn"
          onClick={shareKakao}
        ></ShareButtonkakao>
    
    }
        
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
    background-size: cover;
`;