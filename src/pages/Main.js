import React from 'react';
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
    display: flex;
    text-align: center; 
    align-items: center;
<<<<<<< HEAD
    margin: 0 auto;
    max-width: 400px;
    height: 100vh;
=======
    width: 100%;
    min-height: 100vh;
>>>>>>> 93aff6da5f923d7a5cbe3669f51ef9a5804e90ae
    background-color: #C4C4C4;
    background-image: url(${mainbeer});
    background-size: cover;
    flex-direction: column;
`;

//배경어둡게 처리
const GridStyle = styled.div` 
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(12, 12, 12, 0.2);
`;