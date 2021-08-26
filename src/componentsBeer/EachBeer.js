import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {history} from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { likeBeer, unLikeBeer} from "../redux/async/beer";
import { User } from "../redux/reducer/userSlice";
import { getHashtagWord} from "../redux/async/beer";

import HeartButton from "./HeartButton";
import { unLikeBeerDogam } from "../redux/async/mybeer";

const EachBeer = (props) => {
    const dispatch = useDispatch();
    const { item, setHashtagName } = props;
    const userId = useSelector(User);
    const [toggle, setToggle] = useState(false);

    useEffect(() => { //좋아요 눌렀는지 아닌지 판별
        if(item.like_array.includes(userId)){
            setToggle(true);
        }else{
            setToggle(false);
        }
    }, [item, userId]);
   
    const clickLike = () => { //좋아요 토글 함수
        if(userId){
            if(toggle === true){
                if(window.confirm(`좋아요를 취소하시겠어요?`)){
                    dispatch(unLikeBeer(item._id));
                    dispatch(unLikeBeerDogam(item._id));
                    setToggle(false)
                    return;
                }
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

    const searchHashtagWord = (p) => {
        dispatch(getHashtagWord(p));
        setHashtagName(p);
    }

    return(
        <React.Fragment>
            <RecommendBeerWrap 
            onClick={() => {
                history.push(`/beer/detail/${item._id}`, item.like_array);
            }}
           >
                <BeerImage>
                    <img src={item.image} alt="beer_image">
                    </img>
                </BeerImage>
                <BeerInfoWrap>
                    <JustifyAlign>
                    <BeerName>{item.name_korean}</BeerName>
                    <HeartButton
                        _onClick={(e) => {
                            clickLike();
                            e.preventDefault();
                            e.stopPropagation();              
                        }}
                        is_like={toggle}
                    />
                    </JustifyAlign>
                        
                    <p>{item.name_english}</p>
                </BeerInfoWrap>
                {item.hashtag.map((p, idx) => (
                idx === 3 ||idx === 4? //해시태그 2개만 정렬
                    <TasteTag 
                    onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation(); 
                        searchHashtagWord(p);
                    }}
                    key={idx}>#{p}
                    </TasteTag>:""
                ))}
           
            </RecommendBeerWrap>
        </React.Fragment>
    )
}

export default React.memo(EachBeer);

const RecommendBeerWrap = styled.div`
    width: 148px;
    margin-bottom: 20px;
    margin-right: 16px;
    //z-index: 1px;
`;

const BeerImage = styled.div`
    width: 148px;
    height: 148px;
    border-radius: 13px;
    background-color: #F7F7F7;
    background-size: cover;
    cursor: pointer;
    & > img{
        width:130px;
        height: 130px;
        margin: 9px;
    }
    @media (img: img) {
        & > img { 
            width:130px;
            height: 130px;
            margin: 9px;
         }
    }
    @media (img: img) {
        & > img { 
            width:148px;
            height: 148px;
         }
    }
`;

const BeerInfoWrap = styled.div`
    width: 134px;
    margin: 10px 5px 0 5px;
    & p {
        margin: 0;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis
    }
`;


const BeerName = styled.p`
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis
`;

const TasteTag = styled.div`
    display: inline-block;
    margin-top: 2px; 
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
    cursor: pointer;
`;

const JustifyAlign = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`