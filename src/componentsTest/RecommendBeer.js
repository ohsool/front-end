import React from "react";
import styled from "styled-components";

const RecommendBeer = ({ item }) => {
    const tag_name = ["달달", "과일향", "상큼함"];
    return(
        <React.Fragment>
            <RecommendBeerWrap>
                <BeerImage>
                    <img src={item.image}></img>
                </BeerImage>
                <BeerInfoWrap>
                    <BeerTitle>{item.name_korean}</BeerTitle>
                    <HeartImage src="https://image.flaticon.com/icons/png/512/833/833300.png"></HeartImage>
                    <p>{item.name_english}</p>
                    {item.hashtag.map((p, idx) => (
                        <TasteTag>#{p.split("_")[0]}</TasteTag>
                    ))}
                </BeerInfoWrap>
            </RecommendBeerWrap>
        </React.Fragment>
    )
}

export default RecommendBeer;

const RecommendBeerWrap = styled.div`
    width: 148px;
`;

const BeerImage = styled.div`
    width: 148px;
    height: 148px;
    border-radius: 13px;
    background-color: #F7F7F7;
    & > img{
        width: 148px;
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

const HeartImage = styled.img`
    width: 16px;
    height: 16px;
    float: right;
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