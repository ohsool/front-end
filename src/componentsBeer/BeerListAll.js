import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getBeerInfinity } from "../redux/async/beer";
import { useDispatch, useSelector } from "react-redux";
import { InfinityBeer } from "../redux/reducer/beerSlice";
import EachBeer from "./EachBeer";
import InfinityScrollLoader from "./InfinityScrollLoader";
import _ from "lodash";

const InfinityChildren = ({setHashtagName}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0);
    const beersIF = useSelector(InfinityBeer);

    const getInfinityList = useCallback (() => {
        async function getData(){
        await dispatch(getBeerInfinity(paging));
            setLoading(false);
        }
        return getData();
    }, [paging, beersIF]);
    
    const _handleScroll = _.throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
            setPaging(paging + 1);
            getInfinityList();
            if(paging >= 13){
                return;
            }
            setLoading(true);
        }
    }, 500);
    
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
    }, [paging, loading]);

    return(
        <React.Fragment>
            <List>
            {beersIF?.map((item, idx) => (
                <EachBeer 
                setHashtagName={setHashtagName}
                key={idx} item={item}/>
            ))}
            </List>
            {loading ? <InfinityScrollLoader/>: 
            ""}
        </React.Fragment>
    )
}

export default React.memo(InfinityChildren);

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;