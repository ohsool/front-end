import React from 'react';
import styled from 'styled-components';
import {Route,Switch} from "react-router-dom";

import Header from "../Header";
import TestQuestion from "../componentsTest/TestQuestion";
import TestButton from "../componentsTest/TestButton";

const Test = (props) => {
    return (
        <React.Fragment>
            <Header/>
            <Grid>
                <TestWrap>
                    <TestQuestion/>
                    <TestButton/>
                </TestWrap>
            </Grid>
        </React.Fragment>
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