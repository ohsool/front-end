import React,{ useState,useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSearchWord } from "../redux/async/beer";
// import { getSearchList } from "../redux/reducer/beerSlice";
import { getBeerList } from "../redux/reducer/beerSlice";
import _ from 'lodash';
import remove from "../share/image/remove_gray.png";
import search from "../share/image/search_gray.png";

const Search = (props) => {
    const { setSearch_Beer,
            setIs_Search,
            setOpen_Modal,
            openModal,
            setHashtag,
            words
            } = props;
    const check_eng = /[a-zA-Z]/; // 영어체크
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    const [word, setWord] = useState(""); //실시간으로 입력하는 단어담김
    const [input, setInput] = useState(true);
    // const words = useSelector(getSearchList);
    const beers = useSelector(getBeerList);
    //const [show_recent_words, setShow_Recent_Words] = useState(false);//최근 검색어 보여줄지, 실시간 자동완성 검색어 보여줄지
    const dispatch = useDispatch();
    useEffect(()=>{
        if(word === null || word === "" || words.length===0){//검색창에 아무것도 입력 하지 않은 상태면 검색 모달 닫기 
            setOpen_Modal(false);
        }
    },[word, words])
 
    const onChange = (e) =>{     
        if(e.target.value === ''){//검색어 지웠을 때 검색목록 사라지도록 함
            setWord(null);
        }else{
            setWord(e.target.value);
        }    
    }

    const searchWord = () =>{//실시간으로 자동완성 된 값 불러옴   
        dispatch(getSearchWord(word)); 
    }
    const searchDebounce = _.debounce(() => {
        searchWord();
    }, 300)

    const EnterSubmit = (e) =>{
        if(e.key === "Enter"){
            findBeer();
            setOpen_Modal(false);
            setInput(false);
        }
    }
    const clickSearch = () =>{
        findBeer();
        setOpen_Modal(false);
        setInput(false);
    }

    const findBeer = ()=>{//엔터 키를 누른 경우 해당 단어로 검색
        setSearch_Beer([]);
        if(check_eng.test(word)){//영어로 검색           
            words.map((w)=>{
                setSearch_Beer(search_beer => [...search_beer,
                beers?.filter((p) => p.name_english.includes(w))[0]]);
                setIs_Search(true);
            })
        }else if(check_kor.test(word)){//한국어로 검색            
            words.map((w)=>{
                setSearch_Beer(search_beer => [...search_beer,
                beers?.filter((p) => p.name_korean.includes(w))[0]]);
                setIs_Search(true);
            })
        }else{
            window.alert("잘못 입력 하셨습니다.");
        }
    }
    const findBeerbyClick = (name)=>{//특정 맥주명을 누른 경우 해당 맥주 명으로 검색
        setSearch_Beer([]);
        setHashtag([]);
        if(check_eng.test(word)){//영어로 검색            
            setSearch_Beer(search_beer => [...search_beer, 
            beers?.filter((p) => p.name_english.includes(name))[0]]);
        }else if(check_kor.test(word)){ //한국어로 검색           
            setSearch_Beer(search_beer => [...search_beer, 
            beers?.filter((p) => p.name_korean.includes(name))[0]]);
            
        }
        setIs_Search(true);
        setOpen_Modal(false);
        //localStorage.setItem("recent_words", recent_words.concat(search_beer[0]?.name_korean));//최근 검색어 리스트에 저장
    }
    return (
        <React.Fragment>
            <SearchInput>
                {input ? 
                <input
                    onClick={()=>{
                        setOpen_Modal(true)
                    }} 
                    onChange={onChange}
                    onKeyUp={() => {
                        setInput(true);
                        searchWord();
                        searchDebounce();
                        if(word !== null){//아무것도 입력 안한상태면 모달 닫기
                            setOpen_Modal(true);
                        }
                    }}
                    onKeyPress={EnterSubmit}
                    placeholder="검색어를 입력하세요."
                ></input>
                :  <input //x버튼 클릭시 input value 글씨 지워짐
                    value={""}
                    onClick={()=>{
                        setInput(true);
                    }}
                    placeholder="검색어를 입력하세요."
                ></input>
                
            }

                <ButtonWrap>
                    
                    <ImageWrap style={{backgroundImage: `url(${remove})`}}
                        onClick={()=>{ 
                            setWord(null);
                            setInput(false);
                         }}
                    />
                    <ImageWrap style={{backgroundImage: `url(${search})`}}
                        onClick={()=>{
                            clickSearch();
                        }}
                    
                    />
                </ButtonWrap>
            </SearchInput>
            { openModal ? 
                <SearchModal>
                {words?.length > 0 ? words.map((item, idx) => (
                    idx > 4 ? "":
                    <p key={idx} onClick={()=>{
                        findBeerbyClick(item);
                        }}>{item}</p> 
            )):""}                                          
                </SearchModal>
            :null}
        </React.Fragment>
    )
}
export default React.memo(Search);

const SearchInput = styled.div`
    width: 312px;
    margin: 10px 24px;
    background: #F6F6F6;
    border-radius: 18px;
    outline: none;

    & > input{
        width: 220px;
        height: 30px;
        border:none;
        background: #F6F6F6;
        margin-left: 20px;
    }
`
const ButtonWrap = styled.div`
    display: flex;
    float: right;
    margin-right: 8px;

`
const ImageWrap = styled.div`
    margin: 8px ;
    width: 16px;
    height: 16px;
    background-size: cover;
`;

const SearchModal = styled.div`
    display: inline-block;
    position: absolute;
    z-index: 5;
    padding-left: 26px;
    width: 360px;
    background-color: #FFFFFF;
    border-bottom: 2px solid #F7F7F7;
    //글자 라인 수 제한하기
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    & > p {
        margin-left: 20px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20.51px;
    }
`