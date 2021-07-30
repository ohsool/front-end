import React from "react";
import styled from "styled-components";

const TestButton = ({ goToNext, question }) => {
    return (
        <React.Fragment>
            <ButtonWrap>
                <QuestionButton onClick={() => {}}>{question.answer[0]}</QuestionButton>
                <ClickedQuestionButton onClick={goToNext}>{question.answer[1]}</ClickedQuestionButton>
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