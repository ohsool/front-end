import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../redux/reducer/categorySlice";
import { getBeerList } from "../redux/reducer/beerSlice"
import { getHashtagList } from "../redux/reducer/beerSlice";
import BeerListAll from "./BeerListAll";
import {Slider,Search,EachBeer} from "./BeerIndex";
import Loader from "../share/Loader.js";
import { getCategory } from "../redux/async/category";
import { 
    getAllBeer,
    getBeerCategoryList
} from "../redux/async/beer";
import { getSearchList } from "../redux/reducer/beerSlice";
import { userInfo } from "../redux/async/user";


const BeerList = (props) =>{
    const get_category_id = props.match.params.beerCategoryId;
    const items = useSelector(categories);
    const beers = useSelector(getBeerList);
    const hashtag_beers = useSelector(getHashtagList);
    const words = useSelector(getSearchList);
    const category_beers = beers?.filter((p) => p.categoryId === get_category_id); //전체 맥주 리스트에서 동일 카테고리 맥주 필터링
    const [is_Loading, setIs_Loading] = useState(false); //로딩 여부 판별
    const [is_search, setIs_Search] = useState(false);
    const [search_beer, setSearch_Beer] = useState([]); //검색한 맥주 정보
    const [hashtag, setHashtag] = useState(hashtag_beers);
    const dispatch = useDispatch();
    const [openModal, setOpen_Modal] = useState(false);
    const is_iphone = navigator.userAgent.toLowerCase();

    useEffect(() => {
        //dispatch(getBeerCategoryList(get_category_id));
        dispatch(getAllBeer("all"));
        dispatch(getCategory());
        dispatch(userInfo());
        setIs_Loading(true);
        setHashtag([]);
    }, []);
    
    useEffect(()=>{
        setHashtag(hashtag_beers);
        searchBeerList();
    },[hashtag_beers])

    useEffect(()=>{
        searchBeerList();
    },[words])

    const searchBeerList = () => {
        if(hashtag.length > 0){
            return (
                <>
                <p style={{float:"right", marginRight: "30px"}}>총 {hashtag.length}건 검색</p>
                <List>                    
                    {hashtag?.length > 0 ? hashtag?.map((item, idx) => (
                        <EachBeer key={idx} item={item} />
                    )):""}
                </List>
                </>
            );
        }else{
            return(
            <List>    
            {search_beer?.length > 0 ? search_beer?.map((item, idx) => (
                <EachBeer key={idx} item={item}/>
            )):""}
            </List>
            );
        }

    }

    const allBeerList = () => {     
        if(get_category_id === "all"){
            if(hashtag.length > 0){
                return (
                    <>
                    <p style={{float:"right", marginRight: "30px"}}>총 {hashtag_beers.length}건 검색</p>
                    <List>    
                        {hashtag_beers?.length > 0 ? hashtag_beers?.map((item, idx) => (
                            <EachBeer key={idx} item={item} />
                        )):""}
                    </List>
                    </>
                );
            }else{
                return (
                    <>
                    <List>
                        <BeerListAll></BeerListAll>
                    </List>
                </>
                );
            }            
        }else{
            if(hashtag.length > 0){
                return (
                    <>
                    <p style={{float:"right", marginRight: "30px"}}>총 {hashtag_beers.length}건 검색</p>
                    <List>    
                        {hashtag_beers?.length > 0 ? hashtag_beers?.map((item, idx) => (
                            <EachBeer key={idx} item={item} />
                        )):""}
                    </List>
                    </>
                );
            }else{
                return(
                    <List>
                    {category_beers?.map((item, idx) => (
                        <EachBeer key={idx} item={item} />
                    ))}
                    </List>
                );
            }
        }
    }

    return(
        <React.Fragment>
            {is_Loading ? (
                <>
                    <Container style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "40px"} : {marginTop: "0px"}}>
                        <Grid>
                            <TopNav>
                            <Slider
                                setOpen_Modal={setOpen_Modal}
                                setIs_Search={setIs_Search}
                                setHashtag={setHashtag}
                                items={items}/>
                            </TopNav>
                            <Search //맥주 검색 부분
                                setSearch_Beer = {setSearch_Beer}
                                //beers={beers}
                                words={words}
                                setIs_Search={setIs_Search}
                                setHashtag={setHashtag}
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