import React,{useEffect} from "react";
import { createGlobalStyle } from "styled-components";
import { Route } from "react-router-dom";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import ReactHelmet from "./share/ReactHelmet";

import { Main, Test, Beer, Mypage, TestResult, SignUp, MyBeer, Login , MyReview} from "./pages/indexPage";
import Token from "./share/Token";

function App() {

  const Kakao = window.Kakao;

useEffect(() => {// 만약 공유 기능이 2개이상으로 바뀌면 kakao.link.createdefaultbutton 사용하기 (그때는 내용에 container가 포함 되어있아야한다)
    Kakao.init("05e106dead8f4edabc80bafcaef225ce");
}, []);

  return (
    <React.Fragment>
      <ReactHelmet 
                keywords="맥주 추천, 맥주, 추천" 
                description="안녕하세요. 맥주 추천사이트 오늘의 술, 오술입니다. 오술에서 다양한 종류의 맥주를 비교해보세요." 
                title="ohsool" 
                favicon="./share/image/favicon.png"
      />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main}/>
        <Route path="/test" component={Test}/>
        <Route path="/result/:category" component={TestResult}/>
        <Route path="/beer" component={Beer}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/mypage" component={Mypage}/>
        <Route path="/mybeer" component={MyBeer}/>
        <Route path="/token=:token" component={Token}/>
        <Route path="/review/:reviewId" component={MyReview}/>
      </ConnectedRouter>
      <GlobalStyle/>
    </React.Fragment>   
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: "Noto Sans KR", sans-serif;
    //background-color: #F2F3F7;
  }
`;
