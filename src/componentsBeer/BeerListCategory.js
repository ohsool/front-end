import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getBeerCategoryList} from "../redux/async/beer";
import { beerCategory } from "../redux/reducer/beerSlice";
import EachBeer from "./EachBeer";
import _, { set } from "lodash";

const BeerListCategory = ({get_category_id}) => {
    const category_beers = useSelector(beerCategory);
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0);
    const dispatch = useDispatch();

    const dispatchData = {
        categoryId: get_category_id,
        pageNo: paging,
    }

    useEffect(() => {
        setBeers([...beers, ...category_beers]);
    }, [category_beers]);

    const getCategoryBeerList = useCallback (() => {
        async function getData(){
            setLoading(true);
        await dispatch(getBeerCategoryList(dispatchData));
        setLoading(false);
        }
        return getData();
    }, [paging, category_beers]);


    const _handleScroll = _.debounce(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight + 100 >= scrollHeight && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
          setPaging(paging + 1);
          if (paging >= 4){
            return;
        }
          getCategoryBeerList();
        }
    }, 700);
    
    useEffect(() => {
        if(paging === 0){
            dispatch(getBeerCategoryList(dispatchData));
            setPaging(paging+1);
        }
    }, []);

    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
        useEffect(()=>{
            if(didMount.current){
                setPaging(0);
                setBeers([]);
                dispatch(getBeerCategoryList({
                    categoryId: get_category_id,
                    pageNo: 0,
                }));
                setPaging(1);
                setLoading(false);
            } else{
                didMount.current = true;
            }
        },[deps, get_category_id]);
    }

    useDidMountEffect(() => {
    })

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
            <List>
            {beers?.map((item, idx) => (
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