import React from "react";
import {createGlobalStyle} from "styled-components";
import {Route} from "react-router-dom";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <ConnectedRouter history={history}>

      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    font-family: "Noto Sans KR", sans-serif;
    background-color: #F2F3F7;
  }
`;