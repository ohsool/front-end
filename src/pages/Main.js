import React from 'react';
import styled from 'styled-components';
import {Route,Switch} from "react-router-dom";

import MainLogo from "../componentsMain/MainLogo";
import MainInput from '../componentsMain/MainInput';
const Main = (props) => {

    return (
        <React.Fragment>
            <Grid>
                <MainLogo/>
                <MainInput/>
            </Grid>
        </React.Fragment>
    )
};

export default Main;

const Grid = styled.div`
    text-align: center; 
    align-items: center;
    width: 100%;
    height: 754px;
    background-color: #C4C4C4;
    flex-direction: column;
`;