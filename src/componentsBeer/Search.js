import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSearchWord } from "../redux/async/beer";
import { getSearchList } from "../redux/reducer/beerSlice";
const Search = (props) => {
    const { setSearch_Beer,
            search_beer,
            beers, 
            setIs_Search
            } = props;
    const check_eng = /[a-zA-Z]/; // 영어체크
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    const [word, setWord] = useState(""); //실시간으로 입력하는 단어담김
    const words = useSelector(getSearchList);
    const [show_recent_words, setShow_Recent_Words] = useState(false);//최근 검색어 보여줄지, 실시간 자동완성 검색어 보여줄지
    const [recent_words, setRecent_Words] = useState(localStorage.getItem("recent_words"));//검색한 글자 최근 검색 리스트에 추가
    const dispatch = useDispatch();
    useEffect(()=>{
        if(recent_words === null){
            setRecent_Words("");
        }
    }, [recent_words]);
    const onChange = (e) =>{
        if(e.target.value === ''){//검색어 지웠을 때 검색목록 사라지도록 함
            setWord(null);
            setShow_Recent_Words(true);
        }else{
            setWord(e.target.value);
            setShow_Recent_Words(false);
        }    
    }
    const searchWord = () =>{//실시간으로 자동완성 된 값 불러옴   
        dispatch(getSearchWord(word)); 
    }
    const EnterSubmit = (e) =>{
        if(e.key === "Enter"){
            findBeer();
        }
    }
    const findBeer = ()=>{//엔터 키를 누른 경우 해당 단어로 검색
        setSearch_Beer([]);
        if(check_eng.test(word) && show_recent_words === false){//영어로 검색           
            words.map((w)=>{
                setSearch_Beer(search_beer => [...search_beer,
                beers?.filter((p) => p.name_korean.includes(w))[0]]);
                setIs_Search(true);
            })
        }else if(check_kor.test(word) && show_recent_words === false){//한국어로 검색            
            words.map((w)=>{
                setSearch_Beer(search_beer => [...search_beer,
                beers?.filter((p) => p.name_korean.includes(w))[0]]);
                setIs_Search(true);
            })
        }else{
            window.alert("잘못 입력 하셨습니다.");
        }
        setRecent_Words(recent_words =>[...recent_words, word]);//최근 검색어 리스트에 저장
        localStorage.setItem("recent_words", recent_words.concat(word) );//최근 검색어 리스트에 저장
    }
    const findBeerbyClick = (name)=>{//특정 맥주명을 누른 경우 해당 맥주 명으로 검색
        setSearch_Beer([]);
        if(check_eng.test(word)){//영어로 검색            
            setSearch_Beer(search_beer => [...search_beer, 
            beers?.filter((p) => p.name_korean.includes(name))[0]]);
        }else if(check_kor.test(word)){ //한국어로 검색           
            setSearch_Beer(search_beer => [...search_beer, 
            beers?.filter((p) => p.name_korean.includes(name))[0]]);
        }
        setIs_Search(true);
        localStorage.setItem("recent_words", recent_words.concat(search_beer[0]?.name_korean));//최근 검색어 리스트에 저장
        //최근 검색어 리스트에 저장
        //모달 close
    }
/*
    const showRecentWords = () => {
        console.log("word.lenght",words.length);
        console.log("recent_words",recent_words);
        if(words.length === 0){
            return (
                    <SearchModal>
                        {recent_words?.length > 0 ? recent_words?.map((item, idx) => {
                            return (
                            <p key={idx} onClick={()=>{
                                findBeerbyClick(item);
                                }}>{item}</p> 
                            )       
                        }):""}                                          
                    </SearchModal>
            )
        }
    }
 */   
    return (
        <React.Fragment>
            <SearchInput>
                <input
                    onClick={()=>{
                        console.log("onClick!")
                        //showRecentWords();
                    }} 
                    onChange={onChange}
                    onKeyUp={searchWord}
                    onKeyPress={EnterSubmit}
                    placeholder="검색어를 입력하세요."
                ></input>
            </SearchInput>
            { words.length !== 0 ?
                    <SearchModal>
                    {words?.length > 0 ? words.map((item, idx) => {
                        return (
                        <p key={idx} onClick={()=>{
                            findBeerbyClick(item);
                            }}>{item}</p> 
                        )       
                    }):""}                                          
                    </SearchModal>
            : null }
        </React.Fragment>
    )
}
export default React.memo(Search);
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
const SearchModal = styled.div`
    display: inline-block;
    padding-left: 26px;
    height: 100vh; 
    background-color: #FFFFFF;
    //글자 라인 수 제한하기
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    & > p {
        font-weight: 500;
        font-size: 14px;
        line-height: 20.51px;
    }
`
const CloseIcon = styled.div`
    position: absolute;
    right: 24px;
    top: 22px;
    width: 16px;
    height: 16px;
    border: 1px solid black;
`;