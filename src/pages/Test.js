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

    useEffect(()=> { //유저 정보(아이디, 닉네임 등) 불러오기위한 디스패치
        dispatch(userInfo());
    }, []);

    useEffect(() => { //테스트마다 페이지 이동 애니메이션 적용
        setPageAnimation(true);
    }, []);
    
    // choice = 버튼 눌렀을때 value받아오는 부분
    const goToNext = (choice) => {
        if(choice){ //question_id하고 choice가 같은 데이터 불러와서 index번호 찾기
            setIndex(question.findIndex((p) => p.question_id === choice));
        }
        //각 맥주종류들이 결과값으로나오면 그 카테고리의 결과페이지로 이동
        if(choice === "Lager" 
        || choice === "Pilsner"
        || choice === "Pale Ale"
        || choice === "IPA" 
        || choice === "Weizen"
        || choice === "Dunkel" 
        || choice === "Stout" 
        || choice === "Bock"){
        dispatch(testResult({
            userId: userId,
            result: choice,
        }));
        history.push(`/result/${choice}`);
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
                    <TestButton goToNext={goToNext} question={question[index].answer}/>
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