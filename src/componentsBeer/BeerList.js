import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";


import Slider from './Slider';
import EachBeer from "./EachBeer";
import Loader from "../share/Loader.js";
import { getCategory } from "../redux/async/category";
import { getAllBeer, getSearchWord } from "../redux/async/beer";
import { userInfo } from "../redux/async/user";

const BeerList = (props) =>{
    const [is_Loading, setIs_Loading] = useState(false);
    const get_category_id = props.match.params.beerCategoryId;
    const is_all = get_category_id ? false : true;
    const beers = useSelector(state => state.beer.beerList.beers);
    const items = useSelector(state => state.category.categoryList);
    const category_beers = beers?.filter((p) => p.categoryId === get_category_id);
    const words = useSelector(state => state.beer.searchList.words);


    console.log("get words result: ",words)
    const [word, setWord] = useState("");//실시간으로 입력하는 단어담김

    const dispatch = useDispatch();
    
    useEffect(() => {
        async function getData() {
            await dispatch(getAllBeer());
            await dispatch(getCategory());
            await dispatch(userInfo());
            setIs_Loading(true);
        }
        return getData();
    }, []);

    useEffect(()=>{
        async function getData() {
            await dispatch(getSearchWord(word));
            setWord(word);
        }
        return getData();
    },[])
    
    const onChange = (e) =>{
        setWord(e.target.value);
    }

    const searchWord = () =>{
        console.log("dispatch word", word);
        dispatch(getSearchWord(word));

    }

    const EnterSubmit = (e) =>{
        if(e.key === "Enter"){
            //setWord();
            //해당 단어관련 맥주를 list로 만들어 맵돌려서 EachBeer 보여준다.
            //
        }
    }


    return(
        <React.Fragment>
            {is_Loading ? (
                <>
                    <Container>
                        <Grid>
                            <TopNav>
                            <Slider items={items}/>
                            </TopNav>
                            <Search>
                                <input 
                                    onChange={onChange}
                                    onKeyUp={searchWord}
                                    onKeyPress={EnterSubmit}
                                    placeholder="검색어를 입력하세요."
                                ></input>
                            </Search>
                            {is_all? (
                                <List>
                                    {beers?.length > 0 ? beers.map((item, idx) => (
                                        <EachBeer key={idx} item={item}/>
                                    )):""}
                                </List>
                            ): ( 
                                <List>
                                    {category_beers?.length > 0 ? category_beers.map((item, idx) => (
                                        <EachBeer key={idx} item={item}/>
                                    )):""}
                                </List>
                            )}
                        </Grid>
                    </Container>
                </>
            ):(
                <Loader/>
            )}
        </React.Fragment>
    )


}
export default BeerList;


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

const Search = styled.div`
    width: 360px;
    & > input{
        width: 292px;
        height: 30px;
        border:none;
        margin: 10px 24px;
        background: #F6F6F6;
        border-radius: 18px;
        outline: none;
        padding-left: 20px;
    }
`
const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

