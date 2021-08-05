import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { testResult } from "../redux/async/beer"
import { userInfo } from "../redux/async/user";

import { CSSTransitionGroup } from 'react-transition-group';
import { TestQuestion, TestButton } from "../componentsTest/TestIndex";
import "../share/style/testStyle.css";
import Header from "../Header";
import {question} from "../componentsTest/Question";

const Test = (props) => {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [pageAnimation, setPageAnimation] = useState(false);
    const [index, setIndex] = useState(0);
    
    useEffect(()=> {
        async function getData(){
            await dispatch(userInfo());
        }
        return getData();
    }, [])

    useEffect(() => {
        setPageAnimation(true);
    }, []);
    
    const goToNext = (choice) => {
        if(choice){
            setIndex(question.findIndex((p) => p.question_id === choice));
        }
        if(choice === "AmericanLager"){
            dispatch(testResult({
                userId: user.userId,
                result: "American Lager",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Pilsner"){
            dispatch(testResult({
                userId: user.userId,
                result: "Pilsner",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "PaleAle"){
            dispatch(testResult({
                userId: user.userId,
                result: "Pale Ale",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "IPA"){
            dispatch(testResult({
                userId: user.userId,
                result: "IPA",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Weizen"){
            dispatch(testResult({
                userId: user.userId,
                result: "Weizen",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Dunkel"){
            dispatch(testResult({
                userId: user.userId,
                result: "Dunkel",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Stout"){
            dispatch(testResult({
                userId: user.userId,
                result: "Stout",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Bock"){
            dispatch(testResult({
                userId: user.userId,
                result: "Bock",
            }));
            history.push(`/result/${choice}`);
            return;
        }
    }
    return (
        <CSSTransitionGroup
            transitionName="worksTransition"
            transitionAppear={pageAnimation} 
            key={index}
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