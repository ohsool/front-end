import React from "react";
import styled from "styled-components";

const WritedMyBeer = (props) => {
    return(
        <React.Fragment>
            <WritedBeerInfo>
                <BeerImage>
                </BeerImage>
                <BeerTextWrap>
                    <p>Nickname</p>
                    <span>UserReview -------------------------------</span>
                </BeerTextWrap>
            </WritedBeerInfo>
        </React.Fragment>
    )
}

export default WritedMyBeer;

const WritedBeerInfo = styled.div`
    width: 312px;
    height: 100px;
    display: flex;
    background-color: #F6F6F6;
    border-radius: 10px;
    margin: 0 auto;
`;

const BeerImage = styled.div`
    margin: 10px;
    border-radius: 10px;
    width: 80px;
    height: 80px;
    background-color: #FFFFFF;
`;

const BeerTextWrap = styled.div`
    margin: 14px 0 0 6px;
    width: 194px;
    & > p {
        margin: 0;
        font-size: 14px;
    }
    & > span{
        font-size: 12px;
        font-weight: 300;
        height: 46px;
    }
`;