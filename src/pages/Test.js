import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { testResult } from "../redux/async/beer"
import { userInfo } from "../redux/async/user";
import { User } from "../redux/reducer/userSlice";

import { CSSTransitionGroup } from 'react-transition-group';
import { TestQuestion, TestButton } from "../componentsTest/TestIndex";
import "../share/style/testStyle.css";
import Header from "../Header";
import {question} from "../componentsTest/Question";

const Test = (props) => {
    const userId = useSelector(User);
    const dispatch = useDispatch();
    const [pageAnimation, setPageAnimation] = useState(false); //테스트 페이지 애니메이션 상태
    const [index, setIndex] = useState(0);

    useEffect(()=> {
        dispatch(userInfo());
    }, []);

    useEffect(() => {
        setPageAnimation(true);
    }, []);
    
    // choice = 버튼 눌렀을때 value받아오는 부분
    const goToNext = (choice) => {
        if(choice){ //question_id하고 choice가 같은 데이터 불러와서 index번호 찾기
            setIndex(question.findIndex((p) => p.question_id === choice));
        }
        //각 맥주종류들이 결과값으로나오면 그 카테고리의 결과페이지로 이동
        if(choice === "AmericanLager"){
            dispatch(testResult({
                userId: userId,
                result: "American Lager",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Pilsner"){
            dispatch(testResult({
                userId: userId,
                result: "Pilsner",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "PaleAle"){
            dispatch(testResult({
                userId: userId,
                result: "Pale Ale",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "IPA"){
            dispatch(testResult({
                userId: userId,
                result: "IPA",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Weizen"){
            dispatch(testResult({
                userId: userId,
                result: "Weizen",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Dunkel"){
            dispatch(testResult({
                userId: userId,
                result: "Dunkel",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Stout"){
            dispatch(testResult({
                userId: userId,
                result: "Stout",
            }));
            history.push(`/result/${choice}`);
            return;
        }
        if(choice === "Bock"){
            dispatch(testResult({
                userId: userId,
                result: "Bock",
            }));
            history.push(`/result/${choice}`);
            return;
        }
    }
    return (
        <CSSTransitionGroup //페이지 이동 애니메이션
            transitionName="worksTransition"
            transitionAppear={pageAnimation} 
            key={index} //index가 바뀔때마다 애니메이션
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

export default React.memo(Test);

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