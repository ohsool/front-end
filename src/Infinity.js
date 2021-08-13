import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getBeerInfinity } from "./redux/async/beer";
import { InfinityBeer } from "./redux/reducer/beerSlice";

const Infinity = () => {
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0)
    const [beerLength, setBeerLength] = useState(0);
    const beers = useSelector(InfinityBeer);
    const dispatch = useDispatch();

    const getInfinityList = () => {
        if(paging >= 6){
            return;
        }
        dispatch(getBeerInfinity(paging))
    };

    const _handleScroll = _.throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
          setPaging(paging+1);
          getInfinityList();
        }
       }, 300);
    useEffect(() => {
        if(paging === 0){
            dispatch(getBeerInfinity(paging));
            setPaging(paging+1);
        }
    }, []);

    useEffect(() => {
        setBeerLength(beers.length);
        if(beerLength % 8 !== 0){
            return;
        }
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [paging]);

    return (
        <React.Fragment>    
            {beers?.map((item, idx) => (
                <Div>{item.name_korean}</Div>
            ))}
        </React.Fragment>
    )
}

export default Infinity;

const Div = styled.div`
    display: inline-block;
    margin: 15px;
    width: 200px;
    height: 250px;
    border: 1px solid black;
`;