import React from "react";
import styled from "styled-components";

const TestQuestion = (props) => {
    return(
        <React.Fragment>
            <QuestionWrap>
                <p>Q1</p>
                <span>맥주를 주로 <br/>누구랑 마시나요?</span>
            </QuestionWrap>
        </React.Fragment>
    )
}

export default TestQuestion;

const QuestionWrap = styled.div`
    width: 192px;
    margin: 0 0 0 26px;
    & > p {
        font-size: 35px;
        color: #FFC44F;
        margin: 0 0 20px 0;
    }
    & > span {
        font-size: 25px;
        font-weight: normal;
    }
`;