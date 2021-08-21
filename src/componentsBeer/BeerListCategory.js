import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getBeerCategoryList} from "../redux/async/beer";
import { beerCategory } from "../redux/reducer/beerSlice";
import EachBeer from "./EachBeer";

const BeerListCategory = ({get_category_id}) => {
    const category_beers = useSelector(beerCategory);
    const [beers, setBeers] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [paging, setPaging] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBeerCategoryList(get_category_id));
    }, [get_category_id]);

    useEffect(() => {
        setBeers([...beers, ...category_beers]);
    }, [category_beers]);

    // const getInfinityList = useCallback (() => {
    //     async function getData(){
    //         setLoading(true);
    //     await dispatch(getBeerCategoryList(paging));
    //     setLoading(false);
    //     }

    //     return getData();
    // }, [paging, category_beers.length]);


    // const _handleScroll = _.debounce(() => {
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const scrollTop = document.documentElement.scrollTop;
    //     const clientHeight = document.documentElement.clientHeight;
    //     if (scrollTop + clientHeight + 100 >= scrollHeight && loading === false) {
    //       // 페이지 끝에 도달하면 추가 데이터를 받아온다
    //       setPaging(paging + 1);
    //       getInfinityList();
    //     }
    // }, 400);
    
    // useEffect(() => {
    //     if(paging === 0 && category_beers.length === 0){
    //         dispatch(getBeerCategoryList(paging));
    //         setPaging(paging+1);
    //     }
    //     if(category_beers.length !== 0 ){
    //     setPaging(category_beers.length/8)
    //     }
    // }, []);

    // useEffect(() => {
    //     if(loading){
    //         return;
    //     }
    //     window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
    //     return () => {
    //         window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
    //     };
    // }, [paging]);

    return(
        <React.Fragment>
            <List>
            {category_beers?.map((item, idx) => (
                <EachBeer key={idx} item={item} />
            ))}
            </List>
        </React.Fragment>
    )
}

export default React.memo(BeerListCategory);

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;