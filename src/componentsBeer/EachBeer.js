import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {history} from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import {likeBeer, unLikeBeer} from "../redux/async/beer";


import HeartButton from "./HeartButton";

const EachBeer = (props) => {
    const dispatch = useDispatch();
    const { _onClick ,item } = props;
    const userId = useSelector(state => state.user.currentUser.userId);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if(item.like_array?.includes(userId)){
            setToggle(true);
        }
    })

   
    const clickLike = () => {
        if(userId){
            if(toggle === true){
                dispatch(unLikeBeer(item._id));
                setToggle(false)
            }else{
                dispatch(likeBeer(item._id));
                setToggle(true);
            }
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login");
                return
            }
        }
    }
    return(
        <React.Fragment>
            <RecommendBeerWrap onClick={() => {
                history.push(`/beer/detail/${item._id}`)
            }}>
                <BeerImage>
                    <img src={item.image} alt="beer_image">
                    </img>
                </BeerImage>
                <BeerInfoWrap>
                    <BeerName>{item.name_korean}</BeerName>
                    <HeartButton
                        _onClick={(e) => {
                            clickLike();
                            e.preventDefault();
                            e.stopPropagation();              
                    }}
                    is_like={toggle}
                    />
                    <p>{item.name_english}</p>
                    {item.hashtag.map((p, idx) => (
                        <TasteTag>#{p}</TasteTag>
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

const BeerName = styled.p`
    margin: 0;
    display: inline;
    font-size: 14px;
    font-weight: bold;
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    display:block;
    text-overflow:ellipsis

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