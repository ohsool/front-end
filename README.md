# 맥주계의 왓챠! 오늘의 술 (ohsool)🍺


## 프로젝트 요약
🚩 [사이트 링크](https://ohsool.com/)
🎬 [YouTube 시연영상(반영 예정)]
📁 [백엔드 Repository 링크](https://ohsool.com/)https://github.com/hyemigwak/dongmulmarket/edit/master/README.md

요약 설명 ,,,,

## 팀 소개
- React, Node.js 기반
- 개발인원: 7명

   1) Front-end: 원동환, 장정윤

   2) Back-end: 이정원, 윤송, 문진영

   3) Designer: 문지혜, 이근호

- [팀 노션](https://www.notion.so/6d5c61254bf541c0bb5931de59a8d5ca)
- [디자인 작업물 ?????](https://www.figma.com/file/c2M6Yjvm5IjSAnsrQ41XLv/%ED%95%AD%ED%95%B499_WireFrame?node-id=0%3A1)

## 프로젝트 설명
- 개발기간: 2021년 7월 23일 ~ 2021년 8월 31일
- 개발언어: JavaScript
- 개발 라이브러리:
    - React.js(^17.0.2)
    - Node(^14.17.3) 
    - Yarn(^1.22.10)
    - npm(^6.14.13)
    - npx(^6.14.13)
    - 미들웨어:history(^4.10.1)
    - 배포(예정): AWS S3
    - 통신(서버간): axios(^0.21.1)
    - 라이브러리: react-slick(^0.28.1), react-chartjs-2"(^3.0.4), chart.js(^3.5.0), lodash(^4.17.21), react-slick(^0.28.1), moment(^2.29.1),react-step-progress-bar(^1.0.3)
    - 스타일: styled-components(^5.3.0)
    - 상태관리: redux-toolkit(^1.6.1)
    
- 협업 툴: git / notion / figma / slack
- 프로젝트 취지: 다양한 맥주 정보를 한눈에 비교하고, 자신만의 맥주 도감을 만들어 소통하는 맥주 정보 공유 플랫폼을 만들고자 함
## 기능 소개
      1)테스트를 통한 사용자 맥주 타입 및 맥주 2종 추천 기능
      
      2)맥주별 맛, 판매처, 후기 정보 한곳에서 비교하기 기능
      
      3)마셔본 맥주의 후기를 작성하여 다른사람과 공유하는 기능
      
      4)전체 맥주의 후기를 실시간 피드로 확인하는 기능
      
      5)마이비어에서 자신이 작성한 도감 및 좋아요한 맥주 목록 모아보기 기능
      
      6)맥주 및 관리자에게 건의하기 기능

## 기술 소개
1)무한 스크롤 기능
- 설명

2)PWA을 활용한 앱 버전 제공
- 설명

3) kakao map / link api 활용
- kakao map api를 이용한 장소 제보하기 기능
- kakao share api를 이용한 소셜 공유 기능

4)https 배포
- AWS S3 배포 후, CloudFront에서 인증서 발급 후 https 배포 

5)ExtraReducer를 활용한 효율적 상태관리 


## 트러블 슈팅

### 카테고리별 무한스크롤
- 카테고리별 무한스크롤 적용할때 해당카테고리가 다음페이지 없을 시 다른카테고리페이지로 넘어갔을때 이전ID값의 상태가 남아있는 문제 발생

그래서 첫렌더링 이후 부터 categoryId가 바뀔때마다 해당카테고리의 첫번째 페이지를 불러오기 위해 함수를 구현
~~~javascript
import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func(); //두번째부터 didMout.current가 ture이므로 func 실행
		else didMount.current = true; //첫실행시에 didMount.current 를 true로 바꿈
	}, deps);
};

export default useDidMountEffect;
~~~
useDidMountEffect를 이용해서 beerCategoryId가 바뀔때마다 실행되도록 함수를 구현
~~~javascript
useDidMountEffect(() => {
        setPaging(0);
        setBeers([]);
        dispatch(getBeerCategoryList({
            categoryId: beerCategoryId,
            pageNo: 0,
        }));
        setPaging(1)
        setLoading(false);
    }, [beerCategoryId]);
~~~
페이징 및 로딩까지 다음페이지를 불러올수 있게 만들어봤는데 여전히 첫번째페이지가 이전카테고리의 Id값으로 고정되 있었음.
그래서 함수마다 상태를 하나하나 확인해보니 스크롤이벤트를 등록하고 클린업하는 useEffect에서 바뀌지 않는 것을 발견
~~~javascript
useEffect(() => {
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [pagingCate, loading, beerCategoryId]); //deps가 바뀔때마다 클린업
~~~
그래서 beerCategoryId가 바뀔때마다 클린업을 진행해주니 원하는대로 해당카테고리의 Id값을가지고 정상적으로 작동

### 렌더링 문제 
- beerList페이지나 BeerDetail페이지를 들어갈때마다 데이터를 불러왔다가 다시 초기화가 되고 리렌더링이 되는 문제가 발생

 그래서 각종 방법들을 써서 줄여볼려했으나 문제가 없어지지는 않았음. 그래서 코드를 하나하나 상세하게 뜯어보다가 보니
 현재 프로젝트에서는 reducer를 redux-toolkit라이브러리를 이용해서 extraReducer를 가지고 상태반영을 하고 있었는데 여기서 pending상태일때 값을 초기화하는부분이 문제
 ~~~javascript
extraReducers: (builder) =>
    builder
        .addCase(getOneBeer.pending, (state, action) => {
            state.beerOne = null;
        })
        .addCase(getOneBeer.fulfilled, (state, action) => {
            state.beerOne = action.payload.beer;
        })
 ~~~
 여기서 pending으로 넘어갈때마다 상태가 초기화가 되서 리렌더링이 계속 되는 문제가 발생
 ~~~javascript
useEffect(() => { //맥주 정보, 사용자정보 및 리뷰정보 불러오기
        dispatch(getOneBeer(props.match.params.beerId)); //맥주데이터 api요청
            return () => {
                //맥주 데이터 cleanup함수 다른페이지 갔다가 다른 맥주 클릭했을 시
                //잠시 그전 데이터가 보이는 것 방지
                dispatch(beerOneCleanUp());
            }
    }, [props.match.params.beerId]); //deps에 beerId넣어서 beerId바뀔때마다 위 요청들 실행
 ~~~
 초기화가 필요한 스토어의 데이터들은 위와 같은 방식으로 useEffect의 클린업을 이용해서 초기화를 해주는 방식으로 진행했다. 그 결과 데이터가 받아온 이후로 리렌더링 되는 부분도 없어지고 대부분의 컴포넌트들이 마운트될 때 렌더링횟수도 6~7회에서 3회이하로 개선됨.
 
 ### PWA 및 ServiceWorker
- 페이지가 업데이트 될때마다 이전 캐시스토리지를 초기화 해줘야되는 문제들이 발생. workbox-precache를 이용해서 파일들을 캐싱하는 방법으로 진행하고 있었는데 이렇게 되니까 이전의 파일들을 지우는게 똑바로 진행이 안되서 서비스워커 파일을 직접 구현
~~~html
<script>
  if ('serviceWorker' in navigator) { //서비스워커 불러오는 파트
      window.addEventListener('load', function() {
          navigator.serviceWorker.register('./worker.js')
          .then(function(registration) {
            // console.log(registration);
          }, function(err) {
              // console.log('Worker registration failed', err);
          }).catch(function(err) {
              // console.log(err);
          });
      });
  }
</script>
~~~
이렇게 index.html파일에서 실행을 시키고 worker.js파일을 구현. 그래서 캐싱할 파일을 지정하고 오프라인일때 나오는 페이지도 캐싱목록에 넣어서 지정했다.
~~~javascript
let CACHE_NAME = 'ohsool version-1.4'; 
//Cache Storage에 들어갈 캐시저장소 이름 추후에 .env파일의 버전코드로 맞춰서 빌드마다 업데이터 되게 만들예정
let urlsToCache = [
    '/index.html', //캐싱할 파일들
    '/offline.html' //오프라인일때 보여줄 페이지 (네트워크가 아예 끊어졌을때 새로고침하면 나오는 페이지)
];

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache); //캐싱할파일들 전부 저장소에 저장
        })
    );
});
~~~
이렇게 캐시스토리지네임을 지정을 하고 
~~~javascript
self.addEventListener('activate', event => { //업데이트용
    let cacheWhitelist = [];   //여기에 들어간 캐시파일들이 업데이트 되는파일들
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); //화이트리스트에 들어가지않은 캐싱된 파일들은 전부 삭제
                    }
                })
            );
        })
    );
});
~~~
새로 업데이트를 할때마다 현재 캐시스토리지를 제외한 나머지 캐싱된 파일들을 다 지우도록 구현
그 결과 업데이트 된 캐시 스토리지만 남아 있고 이전 캐싱 파일들이 삭제되면서 정상적으로 작동.

### Amazon S3 & Cloudfront
아마존 S3버킷 및 cloundfront를 이용해 배포를 진행했는데 버킷의 객체들을 업데이트 했는데도 웹에서 이전의 버전이 계속 나타나는 문제가 발생해서 찾아보니 cloundfront는 이전배포한 데이터들을 24시간 동안 캐싱해서 보여주기때문에 새로 업데이트를 하고 싶으면 이전 캐싱된 데이터들을 무효화를 시켜줘야 된다고 한다. 그래서 이전 객체들을 무효화 시키고 진행하니 새로운 배포가 정상적으로 진행.
