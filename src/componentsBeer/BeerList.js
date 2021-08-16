import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBeerList } from "../redux/reducer/beerSlice";
import { categories } from "../redux/reducer/categorySlice";
import _ from "lodash";
import { getBeerInfinity } from "../redux/async/beer";
import { InfinityBeer } from "../redux/reducer/beerSlice";

import {Slider,Search,EachBeer} from "./BeerIndex";
import Loader from "../share/Loader.js";
import { getCategory } from "../redux/async/category";
import { getAllBeer } from "../redux/async/beer";
import { userInfo } from "../redux/async/user";

const BeerList = (props) =>{
    const get_category_id = props.match.params.beerCategoryId;
    const beers = useSelector(getBeerList);
    const items = useSelector(categories);
    const beersIF = useSelector(InfinityBeer);
    const category_beers = beers?.filter((p) => p.categoryId === get_category_id); //전체 맥주 리스트에서 동일 카테고리 맥주 필터링
    const [is_Loading, setIs_Loading] = useState(false); //로딩 여부 판별
    const [is_search, setIs_Search] = useState(false) 
    const [search_beer, setSearch_Beer] = useState([]); //검색한 맥주 정보
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0)
    const [openModal, setOpen_Modal] = useState(false);


    useEffect(() => {
        dispatch(getAllBeer("all"));
        dispatch(getCategory());
        dispatch(userInfo());
        setIs_Loading(true);
    }, []);

    useEffect(()=>{
        if(!is_search){
            setOpen_Modal(false);
        }
    },[is_search]);

    useEffect(() => {
        if(paging === 0){
            dispatch(getBeerInfinity(paging));
            setPaging(paging+1);
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [paging]);

    const getInfinityList = async () => {
        if(paging >= 6){
            return;
        }
        setLoading(true);
        await dispatch(getBeerInfinity(paging));
        setLoading(false);
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
       }, 1000);

    const searchBeerList = () => {
        
        return(
            <List>
                {search_beer?.length > 0 ? search_beer?.map((item, idx) => (
                    <EachBeer key={idx} item={item}/>
                )):""}
            </List>
        );
    }

    const allBeerList = () => {
        if(get_category_id === "all"){
            return (
                <>
                <List>
                    {beersIF?.map((item, idx) => (
                        <EachBeer key={idx} item={item}/>
                    ))}
                </List>
            {loading ? <h1>맥주목록을 불러오는 중입니다.</h1> : ""}
            </>
            );
        }else{
            return(
                <List>
                {category_beers?.map((item, idx) => (
                    <EachBeer key={idx} item={item} categoryId={get_category_id}/>
                ))}
                </List>
            );
        }
    }

    return(
        <React.Fragment>
            {is_Loading ? (
                <>
                    <Container>
                        <Grid>
                            <TopNav>
                            <Slider
                                setIs_Search={setIs_Search}
                                items={items}/>
                            </TopNav>
                            <Search //맥주 검색 부분
                                setSearch_Beer = {setSearch_Beer}
                                beers={beers}
                                setIs_Search={setIs_Search}
                                search_beer={search_beer}
                                openModal={openModal}
                                setOpen_Modal={setOpen_Modal}
                            ></Search>
                            {is_search ? searchBeerList() //검색된 맥주 리스트 출력
                            : allBeerList() //타입별 맥주 리스트 출력
                        }
                        </Grid>
                    </Container>
                </>
            ):(
                <Loader/>
            )}
        </React.Fragment>
    )
}
export default React.memo(BeerList);


const Container = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
`;
const Grid = styled.div`
    width: 360px;
    margin: 0 auto;
`
const TopNav = styled.div`
    margin-top: 60px;
    color: #483834;
    ul {
        display: flex;
        list-style:none;
        li {
            font-weight: 500;
            font-size: 14px;
        }
    }
`


const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;