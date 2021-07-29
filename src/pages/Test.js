import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from "../redux/configureStore";

import { CSSTransitionGroup } from 'react-transition-group';
import { TestQuestion, TestButton} from "../componentsTest/TestIndex";
import "./testStyle.css";
import Header from "../Header";

const Test = (props) => {
    const [pageAnimation, setPageAnimation] = useState(false);
    const question = [{
        question_id: 1,
        questionNum: "Q1",
        question: "맥주를 주로 누구랑 마시나요?",
        answer: ["인생은 혼자지! 혼자 마셔요!", "코로나만 아니라면 친구들과 함께!"]
    },
    {   
        question_id: 2,
        questionNum: "Q2",
        question: "맥주를 주로 누구랑 마시나요?",
        answer: ["인생은 혼자지! 혼자 마셔요!", "코로나만 아니라면 친구들과 함께!"]
    },
    {   
        question_id: 3,
        questionNum: "Q3",
        question: "맥주를 주로 누구랑 마시나요?",
        answer: ["인생은 혼자지! 혼자 마셔요!", "코로나만 아니라면 친구들과 함께!"]
    }];
    useEffect(() => {
        setPageAnimation(true);
    }, []);
    
    const index = parseInt(props.match.params.question_id);

    const goToNext = () => {
        if(index == (question.length - 1)){
            history.push("/result")
        }
        if(index < (question.length - 1)){
        history.push(`/test/${index + 1}`)
        }
    }
    return (
        <CSSTransitionGroup
        transitionName="worksTransition"
        transitionAppear={pageAnimation} 
        key={props.location.pathname}
        transitionAppearTimeout={500}>
            <Header/>
            <Grid>
                <TestWrap>
                    <TestQuestion question={question[index]}/>
                    <TestButton goToNext={goToNext} question={question[index]}/>
                </TestWrap>
            </Grid>
        </CSSTransitionGroup>
    )
};

export default Test;

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