import React,{useEffect,useState} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSearchWord } from "../redux/async/beer";
import { getSearchList } from "../redux/reducer/beerSlice";


const Search = (props) => {
    const { setSearch_Beer,beers,setIs_Search,search_beer } = props;

    const [word, setWord] = useState(""); //실시간으로 입력하는 단어담김
    const words = useSelector(getSearchList); //["버드와이저","오번"]

    const dispatch = useDispatch();

    const onChange = (e) =>{
        setWord(e.target.value);
    }

    const searchWord = () =>{
        dispatch(getSearchWord(word));
    }

    const EnterSubmit = (e) =>{
        if(e.key === "Enter"){
            findBeer();
        }
        setWord(e.target.value); //동일 단어 검색시, 검색결과 더해짐 방지
    }

    const findBeer = ()=>{
        const check_eng = /[a-zA-Z]/; // 영어체크
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
        let arr = [];
        setSearch_Beer([]);

        if(check_eng.test(word)){
            //영어로 검색
            words.map((w)=>{
                arr = beers?.filter((p) => p.name_english.includes(w))[0];
                setSearch_Beer(search_beer => [...search_beer, arr]);
                setIs_Search(true);
            })

        }else if(check_kor.test(word)){
            //한국어로 검색
            words.map((w)=>{
                arr =  beers?.filter((p) => p.name_korean.includes(w))[0]//{...}
                console.log("arr",arr)
                setSearch_Beer(search_beer => [...search_beer, arr]);
                console.log("searchBeer", search_beer)
                setIs_Search(true);
                 
            })

        }else{
            window.alert("잘못 입력 하셨습니다.");
    
        }
    }
    
    
    return (
        <React.Fragment>
            <SearchInput>
                <input 
                    onChange={onChange}
                    onKeyUp={searchWord}
                    onKeyPress={EnterSubmit}
                    placeholder="검색어를 입력하세요."
                    result={search_beer}
                ></input>
            </SearchInput>


        </React.Fragment>
    )



}
export default Search;

const SearchInput = styled.div`
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

