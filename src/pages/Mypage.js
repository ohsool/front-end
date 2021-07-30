import React from 'react';
import styled from 'styled-components';
import {Route,Switch} from "react-router-dom";
import MyBeer from "../componentsMypage/MyBeer";
import MyReview from "../componentsMypage/MyReview";

const Mypage = () => {
    return (
        <>
            <Route path="/mypage/mybeer" component={MyBeer}></Route>
            <Route path="/mypage/myreview" component={MyReview}></Route>

        </>
    )

}

export default Mypage;

const Grid = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
`;

const TestWrap = styled.div`
    width: 360px;
    margin: 0 auto;
    margin-top: 105px;
`;