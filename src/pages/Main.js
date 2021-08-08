import React, { useEffect } from 'react';
import styled from 'styled-components';

import MainLogo from "../componentsMain/MainLogo";
import MainInput from '../componentsMain/MainInput';
import mainbeer from "../share/image/mainbeer.jpeg";
const Main = (props) => {

    return (
        <React.Fragment>
            <Grid>
                <GridStyle> 
                    <MainLogo/>
                    <MainInput/>
                </GridStyle>
            </Grid>
        </React.Fragment>
    )
};

export default Main;

const Grid = styled.div`
    text-align: center; 
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #C4C4C4;
    background-image: url(${mainbeer});
    background-size: cover;
    flex-direction: column;
`;

//배경어둡게 처리
const GridStyle = styled.div` 
    position: absolute;
    width: 100%;
    min-height: 100vh;
    background: rgba(12, 12, 12, 0.2);
`;