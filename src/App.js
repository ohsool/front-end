import React from "react";
import {createGlobalStyle} from "styled-components";
import {Route} from "react-router-dom";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

import { Main, Test, Beers, Mypage, TestResult } from "./pages/indexPage";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main}/>
        <Route path="/test/:question_id" component={Test}/>
        <Route path="/result" component={TestResult}/>
        <Route path="/beers"  component={Beers}/>
        <Route path="/mypage" component={Mypage}/>
      </ConnectedRouter>
    </React.Fragment>   
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    font-family: "Noto Sans KR", sans-serif;
    margin: 0;
    //background-color: #F2F3F7;
  }
`;