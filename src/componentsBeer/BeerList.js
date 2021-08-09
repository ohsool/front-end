import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBeerList, getSearchList } from "../redux/reducer/beerSlice";
import { categories } from "../redux/reducer/categorySlice";

import Slider from "./Slider";
import Search from "./Search";
import EachBeer from "./EachBeer";
import Loader from "../share/Loader.js";
import { getCategory } from "../redux/async/category";
import { getAllBeer, getSearchWord } from "../redux/async/beer";
import { userInfo } from "../redux/async/user";

const BeerList = (props) =>{
    const get_category_id = props.match.params.beerCategoryId;
    const is_all = get_category_id ? false : true;
    const beers = useSelector(getBeerList);
    const items = useSelector(categories);
    const category_beers = beers?.filter((p) => p.categoryId === get_category_id);
    const [is_Loading, setIs_Loading] = useState(false);
    const [is_search, setIs_Search] = useState(false)
    const [search_beer, setSearch_Beer] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBeer());
        dispatch(getCategory());
        dispatch(userInfo());
        setIs_Loading(true);
    }, [get_category_id]);
 
    const beerListFilter = () => {
        if(is_search){
            return (
                <List>
                    {search_beer?.length > 0 ? search_beer.map((item, idx) => (
                        <EachBeer key={idx} item={item}/>
                    )):""}
                </List>
            );
        }else{
            if(is_all){
                return (
                <List>
                    {beers?.length > 0 ? beers.map((item, idx) => (
                        <EachBeer key={idx} item={item}/>
                    )):""}
                </List>
                );
            }else{
                return(
                    <List>
                    {category_beers?.length > 0 ? category_beers.map((item, idx) => (
                        <EachBeer key={idx} item={item}/>
                    )):""}
                    </List>
                );
            }
        }
    };


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
                            <Search
                                setSearch_Beer = {setSearch_Beer}
                                beers={beers}
                                setIs_Search={setIs_Search}
                                search_beer = {search_beer}
                            >
                            </Search>
                            {beerListFilter()}
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