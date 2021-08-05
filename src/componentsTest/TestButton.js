import React,{ useState } from "react";
import styled from "styled-components";

const TestButton = ({ goToNext, question }) => {

    return (
        <React.Fragment>
            <ButtonWrap>
                <QuestionButton 
                    onClick={() => {
                        let choice = Object.keys(question.answer[0]).join()
                        goToNext(choice);
                    }}>
                    {Object.values(question.answer[0])}
                </QuestionButton>
                <ClickedQuestionButton
                    onClick={() => {
                        let choice = Object.keys(question.answer[1]).join()
                        goToNext(choice);
                    }}>
                    {Object.values(question.answer[1])}
                </ClickedQuestionButton>
                {question.answer[2] ? 
                <QuestionButton 
                    onClick={() => {
                        let choice = Object.keys(question.answer[2]).join()
                        goToNext(choice);
                    }}>
                    {Object.values(question.answer[2])}
                </QuestionButton> : ""}
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
    margin-bottom: 16px;
`;