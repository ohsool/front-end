const {Kakao, } = window;

export const shareKakao = (category) => {
  const sharedUrl = window.location.href;
  
  

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: "타이틀",
      description: "내용",
      imageUrl: 'https://picsum.photos/250/250',
      link: {
        webUrl: sharedUrl,
        //mobileWebUrl: sharedUrl,
      },
    },
    buttons: [
      {
        title: '나도 테스트하기',
        link: {
          webUrl: sharedUrl,
          //mobileWebUrl: sharedUrl,
        },
      },
    ],
  });
};