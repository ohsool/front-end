import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";

const TestButton = (props) => {
    return (
        <React.Fragment>
            <ButtonWrap>
                <QuestionButton onClick={() => {
                    history.push("/result")
                }}>인생은 혼자지! 혼자마셔요!</QuestionButton>
                <ClickedQuestionButton>코로나만 아니라면, 친구들과 함께</ClickedQuestionButton>
            </ButtonWrap>
        </React.Fragment>
    )
}

export default TestButton;

const ButtonWrap = styled.div`
    width: 312px;
    margin: 0 auto;
    margin-top: 120px;
`;

const QuestionButton = styled.button`
    width: 312px;
    height: 82px;
    border: none;
    margin-bottom: 16px;
    border-radius: 18px;
    background-color: #F6F6F6;
    color: #555555;
    font-size: 16px;
`;

const ClickedQuestionButton = styled.button`
    width: 312px;
    height: 82px;
    border: none;
    border-radius: 18px;
    background-color: #FFC44F;
    color: #151515;
    font-size: 16px;
`;