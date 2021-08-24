import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { Route } from "react-router-dom";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import "./App.css"
import { Main, Test, Beer, Mypage, TestResult, SignUp, MyBeer, Login , MyReview, NotFoundPage} from "./pages/indexPage";
import Token from "./share/Token";
import PlaceBeer from "./componentsBeerDetail/PlaceBeer";
import { ReceiveNotificationsToken, ReceiveNotifications } from "./share/firebase";

function App(props) {
  const Kakao = window.Kakao;
  
useEffect(() => { // 만약 공유 기능이 2개이상으로 바뀌면 kakao.link.createdefaultbutton 사용하기 (그때는 내용에 container가 포함 되어있아야한다)
    Kakao.init("");
    ReceiveNotificationsToken();
}, []);
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main}/>
        <Route path="/test" component={Test}/>
        <Route path="/result/:category" component={TestResult}/>
        <Route path="/beer" component={Beer}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/mypage" component={Mypage}/>
        <Route path="/mybeer" component={MyBeer}/>
        <Route path="/dlfwh=:tokens" component={Token}/>
        <Route path="/review/:reviewId" component={MyReview}/>
        <Route path="/place" component={PlaceBeer}/>
      </ConnectedRouter>
      <GlobalStyle/>
    </React.Fragment>   
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    // ::-webkit-scrollbar{
    //   display: none;
    // }
  }
`;
