import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import { categories } from "../redux/reducer/categorySlice";
import { getHashtagList } from "../redux/reducer/beerSlice";
import {
    Slider,
    Search,
    EachBeer,
    BeerListAll,
    BeerListCategory,
    HashTagList,
    NoSearchResult} from "./BeerIndex";
import Loader from "../share/Loader.js";
import { getCategory } from "../redux/async/category";
import _ from "lodash";
import { getSearchList } from "../redux/reducer/beerSlice";
import { userInfo } from "../redux/async/user";
import useDidMountEffect from "./useDidMountEffect.js";

const upButton = "/images/upArrow.png"

const BeerList = (props) =>{
    const get_category_id = useParams().beerCategoryId;
    const items = useSelector(categories);
    const hashtag_beers = useSelector(getHashtagList);
    const words = useSelector(getSearchList);
    const [is_Loading, setIs_Loading] = useState(false); //로딩 여부 판별
    const [is_search, setIs_Search] = useState(false);
    const [search_beer, setSearch_Beer] = useState([]); //검색한 맥주 정보
    const [hashtag, setHashtag] = useState([]);
    const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);
    const dispatch = useDispatch();
    const [openModal, setOpen_Modal] = useState(false);
    const is_iphone = navigator.userAgent.toLowerCase();
    const [hashtagName, setHashtagName] = useState("");
    const [pagingCate, setPagingCate] = useState(0);
    const [is_recent, setIs_Recent] = useState(false);

    useEffect(() => {
        dispatch(getCategory());
        dispatch(userInfo());
    }, []);

    const showTopButton = () => {
        if(scrollHeightInfo > 2000){
        return (<TopButton
                    onClick={ScrollToTop}>
                </TopButton>)
        }else{
            return null;
        }
    }
    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const _scrollPosition = _.throttle(() => {
        const scrollHeight = document.documentElement.scrollTop;
        SetScrollHeightInfo(scrollHeight);
    }, 300)

    useEffect(() => {
        window.addEventListener("scroll", _scrollPosition); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _scrollPosition); // scroll event listener 해제
        };
    }, [scrollHeightInfo]);

    useEffect(() => {
        if(items){
            setIs_Loading(true);
        }
    }, [items])

    useDidMountEffect(() => {;
        setHashtag(hashtag_beers);
    }, [hashtag_beers]);

    useEffect(()=>{
        BeerLists();
        setOpen_Modal(false);
    },[words])
    
    const BeerLists = () => {
        if(is_search){
            return(
                <React.Fragment>
                    { words.length === 0 && openModal===false? <NoSearchResult/> : 
                    <List>
                    {search_beer?.map((item, idx) => (
                        <EachBeer 
                        key={idx} item={item} page={"beerList"}/>
                    ))}
                    </List>
                    }
                </React.Fragment>
            )
        }else{
            if(get_category_id === "all"){
                return (
                    <BeerListAll setHashtagName={setHashtagName}></BeerListAll>
                );          
            }else{
                return(
                    <BeerListCategory
                        pagingCate={pagingCate}
                        setPagingCate={setPagingCate}
                        setHashtagName={setHashtagName}
                        get_category_id={get_category_id}
                        >    
                    </BeerListCategory>
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
                                setPagingCate={setPagingCate}
                                get_category_id={get_category_id}
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
                                setIs_Recent={setIs_Recent}
                            ></Search>
                            {hashtag.length > 0 ?
                            <HashTagList 
                            setHashtagName={setHashtagName}
                            hashtagName={hashtagName}
                            hashtag={hashtag}
                            setHashtag={setHashtag}
                            hashtagName={hashtagName}
                            ></HashTagList> // 해시태그리스트 출력
                            : BeerLists() //검색 or 타입별 맥주 출력
                        }
                        {showTopButton()}
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
    padding-bottom: 120px;
`
const TopNav = styled.div`
    margin-top: 60px;
    background-color: white;
    max-width: 400px;
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

const TopButton = styled.div`
    position: fixed;
    bottom: 74px;
    left: 50%;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    background-image: url(${upButton});
    background-size: cover;
    cursor: pointer;
`;