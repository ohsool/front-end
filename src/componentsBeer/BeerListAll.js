import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getBeerInfinity } from "../redux/async/beer";
import { useDispatch, useSelector } from "react-redux";
import { InfinityBeer } from "../redux/reducer/beerSlice";
import EachBeer from "./EachBeer";
import _ from "lodash";

const InfinityChildren = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0);
    const beersIF = useSelector(InfinityBeer);

    const getInfinityList = useCallback (() => {
        async function getData(){
            setLoading(true);
        await dispatch(getBeerInfinity(paging));
        setLoading(false);
        }
        if(paging >= 6){
            return;
        }
        return getData();
    }, [paging, beersIF.length]);

    const _handleScroll = _.throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight + 40 >= scrollHeight && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
          setPaging(paging + 1);
          getInfinityList();
        }
    }, 700);
    
    useEffect(() => {
        if(paging === 0 && beersIF.length === 0){
            dispatch(getBeerInfinity(paging));
            setPaging(paging+1);
        }
        if(beersIF.length !== 0 ){
        setPaging(beersIF.length/8)
        }
    }, []);

    useEffect(() => {
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [paging]);

    return(
        <React.Fragment>
            {beersIF?.map((item, idx) => (
                <EachBeer key={idx} item={item}/>
            ))}
            {loading ? <h1>Loading....</h1> : ""}
        </React.Fragment>
    )
}

export default InfinityChildren;

const Div = styled.div`
    display: inline-block;
    margin: 15px;
    width: 200px;
    height: 250px;
    border: 1px solid black;
`;