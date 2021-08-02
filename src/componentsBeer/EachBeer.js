import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "./HeartButton";
import {history} from "../redux/configureStore";

const EachBeer = (props) => {
    const [toggle, setToggle] = useState(false);
    
    const { _onClick ,name_korean, name_english, hashtag, image, _id, item} = props;
    return(
        <React.Fragment>
            <RecommendBeerWrap onClick={() => {
                history.push(`/beer/detail/${_id}`)
            }}>
                <BeerImage>
                    <img src={image}>
                    </img>
                </BeerImage>
                <BeerInfoWrap>
                    <BeerTitle>{name_korean}</BeerTitle>
                    <HeartButton
                        _onClick={(e) => {
                        toggle ? setToggle(false) : setToggle(true);
                        e.preventDefault();
                        e.stopPropagation();              
                    }}
                    is_like={toggle}
                    />
                    <p>{name_english}</p>
                    {hashtag.map((p, idx) => (
                        <TasteTag>#{hashtag[idx]}</TasteTag>
                    ))}
                </BeerInfoWrap>
            </RecommendBeerWrap>
        </React.Fragment>
    )
}

export default EachBeer;

const RecommendBeerWrap = styled.div`
    width: 148px;
    margin-bottom: 20px;
    margin-right: 16px;
`;

const BeerImage = styled.div`
    width: 148px;
    height: 148px;
    border-radius: 13px;
    background-color: #F7F7F7;
    background-size: cover;
    & > img{
        width:148px;
        height: 148px;
    }
`;

const BeerInfoWrap = styled.div`
    margin: 10px 5px 0 5px;
    & p {
        margin: 0;
        font-size: 12px;
    }
`;

const BeerTitle = styled.p`
    margin: 0;
    display: inline;
    font-size: 14px;
    font-weight: bold;
`;

const TasteTag = styled.div`
    display: inline-block;
    margin-right: 3px;
    padding: 0 6px;
    height: 16px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #333333;
`;