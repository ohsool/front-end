import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBeerList } from "../redux/reducer/beerSlice";
import { categories } from "../redux/reducer/categorySlice";

import Slider from './Slider';
import EachBeer from "./EachBeer";
import Loader from "../share/Loader.js";
import { getCategory } from "../redux/async/category";
import { getAllBeer, getSearchWord } from "../redux/async/beer";
import { userInfo } from "../redux/async/user";

const BeerList = (props) =>{
    const [is_Loading, setIs_Loading] = useState(false);
    const get_category_id = props.match.params.beerCategoryId;
    const [is_all,SetIs_All] = useState(get_category_id ? false : true);
    const beers = useSelector(getBeerList);
    const items = useSelector(categories);
    const category_beers = beers?.filter((p) => p.categoryId === get_category_id);
    const words = useSelector(state => state.beer.searchList.words);//["버드와이저","오번"]
    const [is_search,setIs_Search] = useState(false)
    const [word, setWord] = useState([]);//실시간으로 입력하는 단어담김
    const [search_beers, setSearch_Beers] = useState([]);

    console.log("search_beer",search_beers);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getAllBeer());
            dispatch(getCategory());
            dispatch(userInfo());
            setIs_Loading(true);
            
    }, []);

    useEffect(()=>{
        if(is_search){
            SetIs_All()
        }
        setIs_Search(false);
    },[is_search])
 

    
    const onChange = (e) =>{
        setWord(e.target.value);
    }

    const searchWord = () =>{
        dispatch(getSearchWord(word));
        console.log("dispatch word", word);
    }
    const findBeer = ()=>{
        const check_eng = /[a-zA-Z]/; // 영어체크
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
        let beer = [];
        if(check_eng.test(word)){
            //영어로 검색
            words?.map((w)=>{
                beer =  beers?.filter((p) => p.name_english.includes(w))[0]//{...}
                console.log("beer",beer)
                setSearch_Beers(search_beer=>[...search_beer,beer]);
                setIs_Search(true);//검색 결과 보여준다음에는 false로 바꿈   );
                SetIs_All(false);
            })

        }else if(check_kor.test(word)){
            console.log("words",words);
            //한국어로 검색
            words?.map((w)=>{
                beer =  beers?.filter((p) => p.name_korean.includes(w))[0]//{...}
                console.log("beer",beer)
                setSearch_Beers(search_beer=>[...search_beer,beer]);
                setIs_Search(true);//검색 결과 보여준다음에는 false로 바꿈 
                SetIs_All(false);
                   
            })
            
        }else{
            window.alert("잘못 입력 하셨습니다.");
        }

        
    }

    const EnterSubmit = (e) =>{
        if(e.key === "Enter"){
            findBeer();
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

                            {is_search? (
                                <List>
                                    {search_beers?.length > 0 ? search_beers.map((item, idx) => (
                                        <EachBeer key={idx} item={item}/>
                                    )):""}
                                </List>
                            ): (
                                <>
                                    { is_all ? (
                                        <List>
                                        {beers?.length > 0 ? beers.map((item, idx) => (
                                            <EachBeer key={idx} item={item}/>
                                        )):""}
                                        </List>
                                    ):(
                                        <List>
                                        {category_beers?.length > 0 ? category_beers.map((item, idx) => (
                                            <EachBeer key={idx} item={item}/>
                                        )):""}
                                        </List>
                                    )} 
                                
                                </>
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

