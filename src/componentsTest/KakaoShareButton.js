import React, {useEffect} from 'react';

const KakaoShareButton = ({category})=>{
    useEffect(() => {
        createKakaoButton()
        console.log("최초 랜더링 window.Kakao",window.Kakao)
    }, [])

    const createKakaoButton = () => {
    // window.Kakao로 접근가능
    if (window.Kakao) {
        const kakao = window.Kakao
        console.log("버튼 클릭시 window.kakao",kakao)
        // 중복 initialization 방지
        if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(String(process.env.REACT_APP_KAKAO_KEY))
        }
        kakao.Link.sendDefault({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
            title: '타이틀',
            description: '#리액트 #카카오 #공유버튼',
            imageUrl: 'https://picsum.photos/250/250', 
            link: {
            webUrl: window.location.href,
            },
        },
        buttons: [
            {
            title: '웹으로 보기',
            link: {
                webUrl: window.location.href,
            },
            },
        ],
        })
    }
  }
  return (
      <>
      <button id="kakao-link-btn">
        <img src="/icons/kakao.png" alt="kakao-share-icon" />
      </button>
      </>
  )
}

export default KakaoShareButton;