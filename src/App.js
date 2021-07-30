import React from "react";
import {createGlobalStyle} from "styled-components";
import {Route} from "react-router-dom";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

import { Main, Test, Beer, Mypage, TestResult, SignUp, MyBeer } from "./pages/indexPage";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main}/>
        <Route path="/test/:question_id" component={Test}/>
        <Route path="/result" component={TestResult}/>
        <Route path="/beer"  component={Beer}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/mypage" component={Mypage}/>
        <Route path="/mybeer" component={MyBeer}/>

      </ConnectedRouter>
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